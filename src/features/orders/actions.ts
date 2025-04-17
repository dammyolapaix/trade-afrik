'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { z } from 'zod'

import { retrieveStore } from '@/features/stores/services'
import { validatedActionControlledWithUser } from '@/lib/auth/middlewares'
import paystack from '@/lib/paystack'
import { getSubDomainName } from '@/lib/utils'

import { listProducts } from '../products/services'
import { createOrder } from './services'
import { CreateOrderSchema } from './types'
import { createOrderSchema } from './validations'

const subDomainNameSchema = z.string().min(1)

export const placeOrderAction = validatedActionControlledWithUser(
  createOrderSchema,
  ['buyer'],
  async (state: CreateOrderSchema, authUser) => {
    const headersList = await headers()

    const host = headersList.get('host')

    if (!host) {
      return {
        form: state,
        error: 'We are unable to process your order. Please try again',
      }
    }

    const storeSubDomainName = getSubDomainName(host)

    const subDomainName = subDomainNameSchema.parse(storeSubDomainName)

    if (!subDomainName) {
      return {
        form: state,
        error: 'We are unable to process your order. Please try again',
      }
    }

    // Get store details for Paystack subaccount
    const store = await retrieveStore({ slug: subDomainName })
    if (!store) {
      return {
        form: state,
        error: 'We are unable to process your order. Please try again',
      }
    }

    const productIds = state.items.map((item) => item.productId)

    const products = await listProducts({
      idInArray: productIds,
      with: false,
      storeId: store.id,
      isPublished: true,
    })

    let totalAmount = 0

    for (const item of state.items) {
      const product = products.find((product) => product.id === item.productId)

      if (!product)
        return {
          form: state,
          error: 'We are unable to process your order. Please try again',
        }

      if (item.quantity > product.quantity)
        return {
          form: state,
          error: 'Product quantity is not enough',
        }

      const price = product.salePrice ?? product.price
      totalAmount += price * item.quantity
    }

    // Initialize Paystack transaction
    const paystackResponse = await paystack.initializeTransaction({
      email: authUser.email,
      amount: String(totalAmount),
      currency: 'GHS',
      subaccount: store.paystackSubAccountId?.toString(),
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/verify`,
    })

    if (!paystackResponse.status) {
      return {
        form: state,
        error: paystackResponse.message,
      }
    }

    // Create order
    const order = await createOrder({
      ...state,
      storeId: store.id,
      userId: authUser.id,
      totalAmount,
      paymentLink: paystackResponse.data.authorization_url,
      paystackReference: paystackResponse.data.reference,
    })

    if (!order) {
      return {
        form: state,
        error: 'We are unable to process your order. Please try again',
      }
    }

    // Redirect to Paystack payment page
    redirect(paystackResponse.data.authorization_url)
  }
)
