import { z } from 'zod'

import { USER_ROLES } from './lib/constants'

export const sessionSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(USER_ROLES),
})

export type SessionUser = z.infer<typeof sessionSchema>

export type AuthSeller = SessionUser & {
  storeId: string
}
