import { createEnv } from '@t3-oss/env-nextjs'
import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { ZodError, z } from 'zod'

expand(config())

const stringBoolean = z
  .string()
  .refine((s) => s === 'true' || s === 'false')
  .transform((s) => s === 'true')
  .optional()

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']),
    DATABASE_URL: z.string().url(),
    REDIS_URL: z.string().url(),
    REDIS_TOKEN: z.string(),
    OAUTH_REDIRECT_URL_BASE: z.string().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    PAYSTACK_SECRET_KEY: z.string(),
    DB_MIGRATING: stringBoolean,
    DB_SEEDING: stringBoolean,
  },
  isServer: typeof window === 'undefined',
  emptyStringAsUndefined: false,
  experimental__runtimeEnv: process.env,

  onValidationError: (error: unknown) => {
    console.error(
      '❌ Invalid environment variables:',
      (error as ZodError).flatten().fieldErrors
    )

    process.exit(1)
  },
})
