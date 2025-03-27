import { z } from 'zod'

import { SessionUser } from '@/types'

import { UNAUTHENTICATED_ERROR_MESSAGE } from '../constants'
import { getFormData } from '../utils'
import { getUserFromSession } from './sessions'

type FormState<State> = {
  errors?: {
    [Key in keyof State]?: string[]
  }
  error?: string
  success?: string
  form?: State
}

type ValidatedActionFunction<State> = (
  state: State,
  formData: FormData
) => Promise<FormState<State>>

type ValidatedActionWithUserFunction<State> = (
  state: State,
  formData: FormData,
  user: SessionUser
) => Promise<FormState<State>>

type ValidatedActionControlledFunction<State> = (
  state: State
) => Promise<FormState<State>>

type ValidatedActionControlledWithUserFunction<State> = (
  state: State,
  user: SessionUser
) => Promise<FormState<State>>

// For uncontrolled forms (FormData)
export function validatedAction<Schema extends z.ZodType<State>, State>(
  schema: Schema,
  action: ValidatedActionFunction<State>
) {
  return async (
    prevState: FormState<State>,
    formData: FormData
  ): Promise<FormState<State>> => {
    const form = getFormData(formData) as State

    const result = schema.safeParse(form)

    if (!result.success) {
      return {
        form,
        errors: result.error.flatten()
          .fieldErrors as FormState<State>['errors'],
      }
    }

    return action(result.data, formData)
  }
}

// For controlled forms (direct state)
export function validatedActionControlled<
  Schema extends z.ZodType<State>,
  State,
>(schema: Schema, action: ValidatedActionControlledFunction<State>) {
  return async (state: State): Promise<FormState<State>> => {
    const result = schema.safeParse(state)

    if (!result.success) {
      return {
        form: state,
        errors: result.error.flatten()
          .fieldErrors as FormState<State>['errors'],
      }
    }

    return action(result.data)
  }
}

// For uncontrolled forms with user (FormData)
export function validatedActionWithUser<Schema extends z.ZodType<State>, State>(
  schema: Schema,
  action: ValidatedActionWithUserFunction<State>
) {
  return async (
    prevState: FormState<State>,
    formData: FormData
  ): Promise<FormState<State>> => {
    const authUser = await getUserFromSession()

    if (!authUser) throw new Error(UNAUTHENTICATED_ERROR_MESSAGE)

    const form = getFormData(formData) as State

    const result = schema.safeParse(form)

    if (!result.success) {
      return {
        form,
        errors: result.error.flatten()
          .fieldErrors as FormState<State>['errors'],
      }
    }

    return action(result.data, formData, authUser)
  }
}

// For controlled forms with user (direct state)
export function validatedActionControlledWithUser<
  Schema extends z.ZodType<State>,
  State,
>(schema: Schema, action: ValidatedActionControlledWithUserFunction<State>) {
  return async (state: State): Promise<FormState<State>> => {
    const authUser = await getUserFromSession()

    if (!authUser) throw new Error(UNAUTHENTICATED_ERROR_MESSAGE)

    const result = schema.safeParse(state)

    if (!result.success) {
      return {
        form: state,
        errors: result.error.flatten()
          .fieldErrors as FormState<State>['errors'],
      }
    }

    return action(result.data, authUser)
  }
}
