import { z } from 'zod'

export const orderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
})

export const createOrderSchema = z.object({
  items: z
    .array(orderItemSchema)
    .min(1, 'Order must have at least one item')
    .refine(
      (items) => {
        const productIds = items.map((item) => item.productId)
        return new Set(productIds).size === productIds.length
      },
      { message: 'Duplicate products are not allowed' }
    ),
})
