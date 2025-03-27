import { cookies } from 'next/headers'

import 'server-only'

import crypto from 'crypto'
import { z } from 'zod'

import { env } from '@/env/server'
import { OAuthProvider, UserRole } from '@/features/users/types'

import { createGoogleOAuthClient } from './google'

const STATE_COOKIE_KEY = 'oAuthState'
// const CODE_VERIFIER_COOKIE_KEY = 'oAuthCodeVerifier'
// Ten minutes in seconds
const COOKIE_EXPIRATION_SECONDS = 60 * 10

type StateData = {
  random: string
  role?: string
}

export class OAuthClient<T> {
  private readonly provider: OAuthProvider
  private readonly clientId: string
  private readonly clientSecret: string
  private readonly scopes: string[]
  private readonly urls: {
    auth: string
    token: string
    user: string
  }
  private readonly userInfo: {
    schema: z.ZodSchema<T>
    parser: (data: T) => { id: string; email: string; name: string }
  }
  private readonly tokenSchema = z.object({
    access_token: z.string(),
    token_type: z.string(),
  })

  constructor({
    provider,
    clientId,
    clientSecret,
    scopes,
    urls,
    userInfo,
  }: {
    provider: OAuthProvider
    clientId: string
    clientSecret: string
    scopes: string[]
    urls: {
      auth: string
      token: string
      user: string
    }
    userInfo: {
      schema: z.ZodSchema<T>
      parser: (data: T) => { id: string; email: string; name: string }
    }
  }) {
    this.provider = provider
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.scopes = scopes
    this.urls = urls
    this.userInfo = userInfo
  }

  private get redirectUrl() {
    return new URL(this.provider, env.OAUTH_REDIRECT_URL_BASE)
  }

  createAuthUrl = async (role?: Exclude<UserRole, 'admin'>) => {
    const state = await createState(role)

    const url = new URL(this.urls.auth)
    url.searchParams.set('client_id', this.clientId)
    url.searchParams.set('redirect_uri', this.redirectUrl.toString())
    url.searchParams.set('response_type', 'code')
    url.searchParams.set('scope', this.scopes.join(' '))
    url.searchParams.set('state', state)

    return url.toString()
  }

  fetchUser = async (code: string, state: string) => {
    const isValidState = await validateState(state)

    console.log('isValidState', isValidState)
    if (!isValidState) throw new InvalidStateError()

    // const codeVerifier = await getCodeVerifier()
    const { accessToken, tokenType } = await this.fetchToken(code)

    const res = await fetch(this.urls.user, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    })

    const user = await res.json()

    const { data, success, error } = this.userInfo.schema.safeParse(user)

    if (!success) throw new InvalidUserError(error)

    return this.userInfo.parser(data)
  }

  private fetchToken = async (code: string) => {
    const res = await fetch(this.urls.token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: new URLSearchParams({
        code,
        redirect_uri: this.redirectUrl.toString(),
        grant_type: 'authorization_code',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        // code_verifier: codeVerifier,
      }),
    })
    const rawData = await res.json()
    const { data, success, error } = this.tokenSchema.safeParse(rawData)
    if (!success) throw new InvalidTokenError(error)
    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
    }
  }
}

export const getOAuthClient = (provider: OAuthProvider) => {
  switch (provider) {
    case 'google':
      return createGoogleOAuthClient()
    default:
      throw new Error(`Invalid provider: ${provider satisfies never}`)
  }
}

class InvalidTokenError extends Error {
  constructor(zodError: z.ZodError) {
    super('Invalid Token')
    this.cause = zodError
  }
}

class InvalidUserError extends Error {
  constructor(zodError: z.ZodError) {
    super('Invalid User')
    this.cause = zodError
  }
}

class InvalidStateError extends Error {
  constructor() {
    super('Invalid State')
  }
}

//   class InvalidCodeVerifierError extends Error {
//   constructor() {
//     super('Invalid Code Verifier')
//   }
// }

const createState = async (role?: string) => {
  const cookieStore = await cookies()

  const stateData: StateData = {
    random: crypto.randomBytes(32).toString('hex'),
    role,
  }

  const state = Buffer.from(JSON.stringify(stateData)).toString('base64')
  cookieStore.set(STATE_COOKIE_KEY, state, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    expires: Date.now() + COOKIE_EXPIRATION_SECONDS * 1000,
  })
  return state
}

// async function createCodeVerifier() {
//   const cookieStore = await cookies()

//   const codeVerifier = crypto.randomBytes(64).toString('hex').normalize()

//   cookieStore.set(CODE_VERIFIER_COOKIE_KEY, codeVerifier, {
//     secure: true,
//     httpOnly: true,
//     sameSite: 'lax',
//     expires: Date.now() + COOKIE_EXPIRATION_SECONDS * 1000,
//   })

//   return codeVerifier
// }

export const validateState = async (state: string) => {
  const cookieStore = await cookies()

  const cookieState = cookieStore.get(STATE_COOKIE_KEY)?.value
  if (cookieState !== state) return null

  try {
    const stateData: StateData = JSON.parse(
      Buffer.from(state, 'base64').toString()
    )
    return stateData
  } catch {
    return null
  }
}

// const getCodeVerifier = async () => {
//   const cookieStore = await cookies()

//   const codeVerifier = cookieStore.get(CODE_VERIFIER_COOKIE_KEY)?.value
//   if (codeVerifier == null) throw new InvalidCodeVerifierError()
//   return codeVerifier
// }
