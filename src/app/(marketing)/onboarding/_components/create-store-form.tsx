'use client'

import { useActionState } from 'react'

import CustomFormInput from '@/components/custom-form-inputs'
import SubmitButton from '@/components/submit-button'
import SuccessErrorMessage from '@/components/success-error-message'
import { createStoreAction } from '@/features/stores/actions'

export default function CreateStoreForm() {
  const [state, formAction] = useActionState(createStoreAction, {})
  return (
    <div className="w-full text-center">
      <h1 className="text-2xl font-bold">Create Your Store</h1>
      <p className="text-muted-foreground text-sm text-balance">
        Enter your store name below to create your store
      </p>

      {state.error && (
        <SuccessErrorMessage message={state.error} messageType="error" />
      )}

      <form action={formAction}>
        <div className="my-5">
          <CustomFormInput
            formElement="input"
            inputType="text"
            name="name"
            label="Store Name"
            required
            errors={state?.errors?.name}
          />
        </div>
        <SubmitButton cta="Create Your Store" className="w-full" />
      </form>
    </div>
  )
}
