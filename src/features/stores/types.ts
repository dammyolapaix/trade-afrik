import { stores } from '@/db/schema'

import { retrieveStore } from './services'

export type Store = typeof stores.$inferSelect

export type InsertStore = typeof stores.$inferInsert

export type RetrieveStoreQuery =
  | { id: InsertStore['id']; slug?: never; userId?: never }
  | { slug: InsertStore['slug']; id?: never; userId?: never }
  | { slug?: never; id?: never; userId: InsertStore['userId'] }

export type RetrieveStore = Awaited<ReturnType<typeof retrieveStore>>
