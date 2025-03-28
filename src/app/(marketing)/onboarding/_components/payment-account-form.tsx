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
    <div className="w-full text-center">
      <h1 className="text-2xl font-bold">Create Your Payment Account</h1>
      <p className="text-muted-foreground text-sm text-balance">
        Enter your bank details below to create your payment account
      </p>

      {state.error && (
        <SuccessErrorMessage message={state.error} messageType="error" />
      )}

      <form action={formAction}>
        <div className="my-5">
          <div className="my-5">
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
          </div>

          <div className="my-5">
            <CustomFormInput
              formElement="input"
              inputType="text"
              name="account_number"
              label="Account Number"
              required
              errors={state?.errors?.account_number}
            />
          </div>
        </div>

        <SubmitButton cta="Create Payment Account" className="w-full" />
      </form>
    </div>
  )
}
