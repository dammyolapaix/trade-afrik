import { pgEnum } from 'drizzle-orm/pg-core'

import { OAUTH_PROVIDERS, USER_ROLES } from '@/lib/constants'

export const oAuthProviderEnum = pgEnum('oauth_provider', OAUTH_PROVIDERS)

export const userRoleEnum = pgEnum('user_role', USER_ROLES)
