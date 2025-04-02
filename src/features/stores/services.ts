import 'server-only'

import { eq, or } from 'drizzle-orm'

import { db } from '@/db'
import { stores } from '@/db/schema'

import { InsertStore, RetrieveStore, Store } from './types'

export const createStore = async (store: InsertStore) => {
  const [newStore] = await db.insert(stores).values(store).returning()

  return newStore
}

export const retrieveStore = async (query: RetrieveStore) =>
  await db.query.stores.findFirst({
    where: or(
      query.id ? eq(stores.id, query.id) : undefined,
      query.slug ? eq(stores.slug, query.slug) : undefined,
      query.userId ? eq(stores.userId, query.userId) : undefined
    ),
  })

export const updateStore = async (id: string, store: Partial<Store>) => {
  const [updatedStore] = await db
    .update(stores)
    .set(store)
    .where(eq(stores.id, id))
    .returning()

  return updatedStore
}
