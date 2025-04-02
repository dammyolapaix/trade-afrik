import { pgEnum } from 'drizzle-orm/pg-core'

import {
  OAUTH_PROVIDERS,
  PRODUCT_VARIANT_COLORS,
  PRODUCT_VARIANT_SIZES,
  USER_ROLES,
} from '@/lib/constants'

export const oAuthProviderEnum = pgEnum('oauth_provider', OAUTH_PROVIDERS)

export const userRoleEnum = pgEnum('user_role', USER_ROLES)

export const productVariantSizeEnum = pgEnum(
  'product_variant_size',
  PRODUCT_VARIANT_SIZES
)

export const productVariantColorEnum = pgEnum(
  'product_variant_color',
  PRODUCT_VARIANT_COLORS
)
