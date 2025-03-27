import { z } from 'zod'

import { OAUTH_PROVIDERS } from '@/lib/constants'

const SIGNUP_USER_ROLES = ['buyer', 'seller'] as const

const authSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Email must be a valid email')
    .toLowerCase()
    .trim(),
  password: z
    .string({ message: 'Password is required' })
    .min(8, {
      message: `Password is required and must be at least 8 characters`,
    })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  role: z.enum(SIGNUP_USER_ROLES, {
    message: `You must sign up as a "buyer" or "seller"`,
  }),
})

export const loginSchema = authSchema.pick({ email: true, password: true })

const profileSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, 'The name must be at least 3 characters long'),
})

export const registerSchema = z.intersection(authSchema, profileSchema)

export const oauthSchema = z.intersection(
  z.object({
    provider: z.enum(OAUTH_PROVIDERS),
  }),
  authSchema.pick({ role: true }).optional()
)
