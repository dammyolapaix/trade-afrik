import { and, eq } from 'drizzle-orm'

import { db } from '@/db'
import { orderItems, orders } from '@/db/schema'
import { INTERNAL_SERVER_ERROR } from '@/lib/constants'

import { CreateOrder, InsertOrderItem } from './types'

export async function createOrder(orderData: CreateOrder) {
  const { items, ...rest } = orderData

  return await db.transaction(async (tx) => {
    // Create the order
    const [order] = await tx.insert(orders).values(rest).returning()

    // Create order items
    const orderItemsData: InsertOrderItem[] = items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
    }))

    const newOrderItems = await tx.insert(orderItems).values(orderItemsData)

    if (!order || !newOrderItems) {
      tx.rollback()
      throw new Error(INTERNAL_SERVER_ERROR)
    }

    return order
  })
}

export async function getOrder(orderId: string, userId: string) {
  return await db.query.orders.findFirst({
    where: and(eq(orders.id, orderId), eq(orders.userId, userId)),
    with: {
      items: {
        with: {
          product: true,
        },
      },
    },
  })
}
