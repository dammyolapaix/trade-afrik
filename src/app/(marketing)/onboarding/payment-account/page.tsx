import { Suspense } from 'react'

import paystack from '@/lib/paystack'
import { ListBanks } from '@/lib/paystack/types'

import PaymentAccountForm from '../_components/payment-account-form'

export default async function PaymentAccountPage() {
  let banks: ListBanks | undefined = undefined

  const paystackResponse = await paystack.listBanks({ country: 'ghana' })

  if (paystackResponse.status) {
    banks = paystackResponse.data
  }

  return (
    <Suspense fallback={<>Loading...</>}>
      {banks && <PaymentAccountForm banks={banks} />}
    </Suspense>
  )
}
