import { z } from 'zod'

import { PRODUCT_VARIANT_COLORS, PRODUCT_VARIANT_SIZES } from '@/lib/constants'

export const productSchema = z.object({
  name: z
    .string({ required_error: 'Product name is required' })
    .min(3, 'Product name must be at least 3 characters'),
  description: z.string().optional(),
  subCategoryId: z
    .string({ required_error: 'Sub category is required' })
    .uuid({ message: 'Invalid sub category' }),
})

export const productVariantSchema = z
  .object({
    productId: z
      .string({ required_error: 'Product is required' })
      .uuid('Invalid product'),
    sku: z
      .string({ required_error: 'SKU is required' })
      .min(3, 'SKU must be at least 3 characters'),
    quantity: z.coerce
      .number({ required_error: 'Quantity is required' })
      .int()
      .min(0, 'Quantity must be a positive number'),
    size: z.enum(PRODUCT_VARIANT_SIZES, {
      required_error: 'Size is required',
    }),
    color: z.enum(PRODUCT_VARIANT_COLORS, {
      required_error: 'Color is required',
    }),
    weight: z.coerce.number({
      message: 'The weight is required and it must be a number',
    }),
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
    images: z
      .array(z.instanceof(File))
      .refine((files) => files.length > 0, {
        message: 'At least one image is required',
      })
      .refine(
        (files) =>
          files.every((file) =>
            ['image/jpeg', 'image/png'].includes(file.type)
          ),
        { message: 'Only JPEG and PNG images are allowed' }
      )
      .refine((files) => files.every((file) => file.size < 5 * 1024 * 1024), {
        message: 'Each image must be smaller than 5MB',
      }),
  })
  .superRefine((data, ctx) => {
    if (data.price <= data.salePrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['salePrice'],
        message: 'Sale price must be lower than price',
      })
    }
  })

export const updateProductSchema = productSchema.partial()

export const updateProductVariantSchema = productVariantSchema

export const publishProductSchema = z.object({
  id: z.string().uuid(),
})
