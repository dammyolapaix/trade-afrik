'use client'

import { useActionState } from 'react'

import CustomFormInput from '@/components/custom-form-inputs'
import SubmitButton from '@/components/submit-button'
import SuccessErrorMessage from '@/components/success-error-message'
import { createSubAccountAction } from '@/features/stores/actions'
import { ListBanks } from '@/lib/paystack/types'

type Props = {
  banks: ListBanks
}

export default function PaymentAccountForm({ banks }: Props) {
  const [state, formAction] = useActionState(createSubAccountAction, {})
  return (
    <div>
      {state.error && (
        <SuccessErrorMessage message={state.error} messageType="error" />
      )}

      <form action={formAction}>
        <CustomFormInput
          name="bank"
          label="Bank"
          formElement="combobox"
          items={banks.map((bank) => ({
            id: bank.code,
            name: `${bank.name} (${bank.currency})`,
          }))}
          query="bank_code"
          required
          errors={state?.errors?.bank_code}
        />

        <CustomFormInput
          formElement="input"
          inputType="text"
          name="account_number"
          label="Account Number"
          required
          errors={state?.errors?.account_number}
        />

        <SubmitButton cta="Create Payment Account" />
      </form>
    </div>
  )
}
