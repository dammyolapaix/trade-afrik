import { stores } from '@/db/schema'

export type Store = typeof stores.$inferSelect

export type InsertStore = typeof stores.$inferInsert

export type RetrieveStore =
  | { id: InsertStore['id']; slug?: never; userId?: never }
  | { slug: InsertStore['slug']; id?: never; userId?: never }
  | { slug?: never; id?: never; userId: InsertStore['userId'] }
