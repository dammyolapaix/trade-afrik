'use server'

import { redirect } from 'next/navigation'

import { z } from 'zod'

import { validatedAction } from '@/lib/auth/middlewares'
import { createUserSession } from '@/lib/auth/sessions'

import { registerUser, retrieveUser } from '../services'
import { getOAuthClient } from './oauth'
import { comparePasswords, generateSalt, hashPassword } from './utils'
import { loginSchema, oauthSchema, registerSchema } from './validations'

export const loginAction = validatedAction(
  loginSchema,
  async (state: z.infer<typeof loginSchema>) => {
    const { email, password } = state

    const foundUser = await retrieveUser({
      email,
      password: true, // Include user password
    })

    if (!foundUser || foundUser.password === null || foundUser.salt === null)
      return {
        form: state,
        error: 'Invalid credentials. Please try again.',
      }

    const isPasswordValid = await comparePasswords({
      hashedPassword: foundUser.password,
      password,
      salt: foundUser.salt,
    })

    if (!isPasswordValid)
      return {
        form: state,
        error: 'Invalid credentials. Please try again.',
      }

    // Set session
    if (foundUser)
      await createUserSession({
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role,
      })

    redirect('/')
  }
)

export const registerAction = validatedAction(
  registerSchema,
  async (state: z.infer<typeof registerSchema>) => {
    const { email, password } = state

    const foundUser = await retrieveUser({ email })

    if (foundUser)
      return {
        form: state,
        error: 'You already have an account, please login',
      }

    const salt = generateSalt()

    const passwordHash = await hashPassword(password, salt)

    const createdUser = await registerUser({
      ...state,
      password: passwordHash,
      salt,
    })

    // Set session
    await createUserSession(createdUser)

    redirect('/')
  }
)

export const oAuthAction = validatedAction(
  oauthSchema,
  async (state: z.infer<typeof oauthSchema>) => {
    const oAuthClient = getOAuthClient(state.provider)

    const redirectUrl = await oAuthClient.createAuthUrl({
      authType: state.authType,
      role: state.role,
    })

    redirect(redirectUrl)
  }
)
