'use client'

import { useActionState } from 'react'

import CustomFormInput from '@/components/custom-form-inputs'
import SubmitButton from '@/components/submit-button'
import SuccessErrorMessage from '@/components/success-error-message'
import { createStoreAction } from '@/features/stores/actions'

export default function CreateStoreForm() {
  const [state, formAction] = useActionState(createStoreAction, {})
  return (
    <div>
      {state.error && (
        <SuccessErrorMessage message={state.error} messageType="error" />
      )}

      <form action={formAction}>
        <CustomFormInput
          formElement="input"
          inputType="text"
          name="name"
          label="Store Name"
          required
          errors={state?.errors?.name}
        />

        <SubmitButton cta="Create Your Store" />
      </form>
    </div>
  )
}
