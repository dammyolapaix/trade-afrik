'use server'

import { redirect } from 'next/navigation'

import { z } from 'zod'

import { validatedActionWithUser } from '@/lib/auth/middlewares'
import paystack from '@/lib/paystack'
import { slugify } from '@/lib/utils'

import { createStore, retrieveStore, updateStore } from './services'
import { createSubAccountSchema, storeSchema } from './validations'

export const createStoreAction = validatedActionWithUser(
  storeSchema,
  async (state: z.infer<typeof storeSchema>, formData, authUser) => {
    const authUserStore = await retrieveStore({ userId: authUser.id })

    if (authUserStore) {
      return {
        form: state,
        error: `You already have a store created`,
      }
    }

    const createdStore = await createStore({
      ...state,
      slug: slugify(state.name),
      userId: authUser.id,
    })

    if (!createdStore)
      return {
        form: state,
        error: 'Something went wrong',
      }

    redirect('/')
  }
)

export const createSubAccountAction = validatedActionWithUser(
  createSubAccountSchema,
  async (state: z.infer<typeof createSubAccountSchema>, formData, authUser) => {
    const authUserStore = await retrieveStore({ userId: authUser.id })

    if (!authUserStore) {
      return {
        form: state,
        error: 'You must have a store to create a payment account',
      }
    }

    if (authUserStore.paystackSubAccountId) {
      return {
        form: state,
        error: 'You already have a payment account',
      }
    }

    const paystackSubAccountResponse = await paystack.createSubAccount({
      ...state,
      business_name: authUserStore.name,
      percentage_charge: 20,
    })

    if (!paystackSubAccountResponse.status) {
      return {
        form: state,
        error: paystackSubAccountResponse.message,
      }
    }

    const updatedStore = await updateStore(authUserStore.id, {
      paystackSubAccountId: paystackSubAccountResponse.data.id,
    })

    if (!updatedStore)
      return {
        form: state,
        error: 'Something went wrong',
      }

    redirect('/')
  }
)
