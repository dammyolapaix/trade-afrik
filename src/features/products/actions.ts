'use server'

import { redirect } from 'next/navigation'

import { z } from 'zod'

import { retrieveStore } from '@/features/stores/services'
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
  async (state: z.infer<typeof productSchema>, formData, authUser) => {
    const store = await retrieveStore({ userId: authUser.id })

    if (!store) {
      return {
        form: state,
        error: 'You must have a store to create products',
      }
    }

    // Create the product
    const newProduct = await createProduct({
      ...state,
      storeId: store.id,
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
