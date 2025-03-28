import { z } from 'zod'

export const storeSchema = z.object({
  name: z
    .string({ required_error: 'Store name is required' })
    .min(1, 'Store name is required'),
})

export const createSubAccountSchema = z.object({
  bank_code: z.string().min(1, 'Bank code is required'),
  account_number: z.string().length(10, 'Account number must be 10 digits'),
})
