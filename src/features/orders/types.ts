import { z } from 'zod'

import { orderItems, orders } from '@/db/schema'

import { createOrderSchema } from './validations'

export type Order = typeof orders.$inferSelect
export type InsertOrder = typeof orders.$inferInsert

export type OrderItem = typeof orderItems.$inferSelect
export type InsertOrderItem = typeof orderItems.$inferInsert

export type CreateOrderSchema = z.infer<typeof createOrderSchema>

export type CreateOrder = {
  storeId: string
  userId: string
  totalAmount: number
  paystackReference: string
  paymentLink: string
} & CreateOrderSchema
