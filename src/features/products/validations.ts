import { File } from 'buffer'
import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string({ required_error: 'Product name is required' })
    .min(3, 'Product name must be at least 3 characters'),
  quantity: z.coerce
    .number({
      message: 'The quantity is required and it must be a number',
    })
    .int()
    .min(0, 'Quantity must be a positive number'),
  description: z.string().optional(),
  categoryId: z
    .string({ required_error: 'Category is required' })
    .uuid({ message: 'Invalid category' }),
  price: z.coerce
    .number({
      message: 'The price is required and it must be a number',
    })
    .transform((val) => val * 100),
  salePrice: z.coerce
    .number({
      message: 'The sale price is required and it must be a number',
    })
    .transform((val) => val * 100),
  'image[]': z
    .array(z.instanceof(File), {
      message: 'The image is required',
    })
    .refine((files) => files.length === 1, {
      message: 'Only one image is allowed',
    })
    .refine(
      (files) =>
        files.every((file) => ['image/jpeg', 'image/png'].includes(file.type)),
      { message: 'Only JPEG and PNG images are allowed' }
    )
    .refine((files) => files.every((file) => file.size < 1 * 1024 * 1024), {
      message: 'The image must be smaller than 1MB',
    }),
})

export const createProductSchema = productSchema.superRefine((data, ctx) => {
  if (data.price <= data.salePrice) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['salePrice'],
      message: 'Sale price must be lower than price',
    })
  }
})

export const updateProductSchema = productSchema
  .partial()
  .extend({
    id: z.string().uuid({ message: 'Valid product ID is required' }),
  })
  .superRefine((data, ctx) => {
    if (data.price && data.salePrice && data.price <= data.salePrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['salePrice'],
        message: 'Sale price must be lower than price',
      })
    }
  })

export const publishProductSchema = z.object({
  id: z.string().uuid(),
})
