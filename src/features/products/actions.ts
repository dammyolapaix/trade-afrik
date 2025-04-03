'use server'

import { redirect } from 'next/navigation'

import { z } from 'zod'

import { validatedActionWithUser } from '@/lib/auth/middlewares'
import { DASHBOARD_PRODUCTS_ROUTE } from '@/lib/routes'

import {
  createProduct,
  deleteProduct,
  publishProduct,
  retrieveProduct,
  unpublishProduct,
  updateProduct,
} from './services'
import {
  productSchema,
  publishProductSchema,
  updateProductSchema,
} from './validations'

export const createProductAction = validatedActionWithUser(
  productSchema,
  ['seller'],
  async (state: z.infer<typeof productSchema>, formData, authUser) => {
    // Create the product
    const newProduct = await createProduct({
      ...state,
      storeId: authUser.storeId!,
      userId: authUser.id,
    })

    if (!newProduct) {
      return {
        form: state,
        error: 'Failed to create product',
      }
    }

    redirect(DASHBOARD_PRODUCTS_ROUTE)
  }
)

export const updateProductAction = validatedActionWithUser(
  updateProductSchema,
  ['seller'],
  async (state: z.infer<typeof updateProductSchema>, formData, authUser) => {
    const productId = formData.get('id') as string

    if (!productId) {
      return {
        form: state,
        error: 'Product ID is required',
      }
    }

    const product = await retrieveProduct({ id: productId })

    if (!product) {
      return {
        form: state,
        error: 'Product not found',
      }
    }

    if (product.userId !== authUser.id) {
      return {
        form: state,
        error: 'You do not have permission to update this product',
      }
    }

    const updatedProduct = await updateProduct(productId, {
      name: state.name,
      description: state.description,
    })

    if (!updatedProduct) {
      return {
        form: state,
        error: 'Failed to update product',
      }
    }

    redirect(DASHBOARD_PRODUCTS_ROUTE)
  }
)

export const deleteProductAction = validatedActionWithUser(
  z.object({ id: z.string() }),
  ['seller'],
  async (state: { id: string }, formData, authUser) => {
    const product = await retrieveProduct({ id: state.id })

    if (!product) {
      return {
        form: state,
        error: 'Product not found',
      }
    }

    if (product.userId !== authUser.id) {
      return {
        form: state,
        error: 'You do not have permission to delete this product',
      }
    }

    const deletedProduct = await deleteProduct(state.id)

    if (!deletedProduct) {
      return {
        form: state,
        error: 'Failed to delete product',
      }
    }

    redirect(DASHBOARD_PRODUCTS_ROUTE)
  }
)

export const publishProductAction = validatedActionWithUser(
  publishProductSchema,
  ['seller'],
  async (state: z.infer<typeof publishProductSchema>, formData, authUser) => {
    const product = await retrieveProduct({ id: state.id })

    if (!product) {
      return {
        form: state,
        error: 'Product not found',
      }
    }

    if (product.userId !== authUser.id) {
      return {
        form: state,
        error: 'You do not have permission to publish this product',
      }
    }

    const publishedProduct = await publishProduct(state.id)

    if (!publishedProduct) {
      return {
        form: state,
        error: 'Failed to publish product',
      }
    }

    redirect(DASHBOARD_PRODUCTS_ROUTE)
  }
)

export const unpublishProductAction = validatedActionWithUser(
  publishProductSchema,
  ['seller'],
  async (state: z.infer<typeof publishProductSchema>, formData, authUser) => {
    const product = await retrieveProduct({ id: state.id })

    if (!product) {
      return {
        form: state,
        error: 'Product not found',
      }
    }

    if (product.userId !== authUser.id) {
      return {
        form: state,
        error: 'You do not have permission to unpublish this product',
      }
    }

    const unpublishedProduct = await unpublishProduct(state.id)

    if (!unpublishedProduct) {
      return {
        form: state,
        error: 'Failed to unpublish product',
      }
    }

    redirect(DASHBOARD_PRODUCTS_ROUTE)
  }
)
