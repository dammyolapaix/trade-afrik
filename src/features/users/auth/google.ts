import { z } from 'zod'

import { env } from '@/env/server'

import { OAuthClient } from './oauth'

export function createGoogleOAuthClient() {
  return new OAuthClient({
    provider: 'google',
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    scopes: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    urls: {
      auth: 'https://accounts.google.com/o/oauth2/v2/auth',
      token: 'https://oauth2.googleapis.com/token',
      user: 'https://www.googleapis.com/userinfo/v2/me',
    },
    userInfo: {
      schema: z.object({
        id: z.string(),
        email: z.string().email(),
        verified_email: z.boolean(),
        name: z.string().nullable(),
        given_name: z.string().nullable(),
        family_name: z.string().nullable(),
        picture: z.string().url().nullable(),
      }),
      parser: (user) => ({
        id: user.id.toString(),
        name: user.name ?? `${user.family_name} ${user.given_name}`,
        email: user.email,
        image: user.picture,
      }),
    },
  })
}
