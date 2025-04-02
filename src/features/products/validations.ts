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

export const productVariantSchema = z.object({
  sku: z
    .string({ required_error: 'SKU is required' })
    .min(3, 'SKU must be at least 3 characters'),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .int()
    .min(0, 'Quantity must be a positive number'),
  size: z.enum(PRODUCT_VARIANT_SIZES, {
    required_error: 'Size is required',
  }),
  color: z.enum(PRODUCT_VARIANT_COLORS, {
    required_error: 'Color is required',
  }),
  weight: z.number().int().min(0, 'Weight must be a positive number'),
  price: z.number().int().min(1, 'Price must be at least 1'),
  salePrice: z.number().int().min(0).optional(),
  images: z
    .array(
      z.object({
        imageUrl: z.string().url('Please provide a valid image URL'),
      })
    )
    .min(1, 'At least one image is required'),
})

export const updateProductSchema = productSchema.partial()

export const updateProductVariantSchema = productVariantSchema.partial()

export const publishProductSchema = z.object({
  id: z.string().uuid(),
})
