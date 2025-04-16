import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { env } from 'process'

import db from '.'
import config from '../../drizzle.config'

if (!env.DB_MIGRATING)
  throw new Error('You must set DB_MIGRATING to "true" when running migrations')

await migrate(db, { migrationsFolder: config.out! })
await db.$client.end()
