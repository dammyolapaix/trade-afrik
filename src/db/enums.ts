import { pgEnum } from 'drizzle-orm/pg-core'

import { OAUTH_PROVIDERS } from '@/lib/constants'

export const oAuthProviderEnum = pgEnum('oauth_provider', OAUTH_PROVIDERS)
