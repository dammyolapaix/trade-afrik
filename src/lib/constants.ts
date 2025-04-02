export const OAUTH_PROVIDERS = ['google'] as const

export const USER_ROLES = ['buyer', 'seller', 'admin'] as const

export const UNAUTHENTICATED_ERROR_MESSAGE =
  'You must be logged in to perform this action' as const

export const INTERNAL_ERROR_MESSAGE =
  'Something went wrong from our end, please try again later. Report the issue if it persists' as const

export const PRODUCT_VARIANT_SIZES = ['S', 'M', 'L', 'XL', 'XXL'] as const

export const PRODUCT_VARIANT_COLORS = [
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Orange',
  'Purple',
  'Pink',
  'Brown',
  'Black',
  'White',
] as const
