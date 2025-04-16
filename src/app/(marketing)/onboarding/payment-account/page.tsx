import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { retrieveStore } from '@/features/stores/services'
import { getUserFromSession } from '@/lib/auth/sessions'
import paystack from '@/lib/paystack'
import { ListBanks } from '@/lib/paystack/types'
import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  ONBOARDING_CREATE_STORE_ROUTE,
} from '@/lib/routes'

import AuthOnboardingLayout from '../../_components/auth-onboarding-layout'
import PaymentAccountForm from '../_components/payment-account-form'

export default async function PaymentAccountPage() {
  const authUser = await getUserFromSession()

  if (!authUser) {
    redirect(LOGIN_ROUTE)
  }

  const authUserStore = await retrieveStore({ userId: authUser.id })

  // If the user doesn't have a store, redirect to the create store page
  if (!authUserStore) {
    redirect(ONBOARDING_CREATE_STORE_ROUTE)
  }

  // If the user already has a payment account, redirect to the dashboard
  if (authUserStore.paystackSubAccountId) {
    redirect(DASHBOARD_ROUTE)
  }

  let banks: ListBanks | undefined = undefined

  const paystackResponse = await paystack.listBanks({ country: 'ghana' })

  if (paystackResponse.status) {
    banks = paystackResponse.data
  }

  return (
    <Suspense fallback={<>Loading...</>}>
      <AuthOnboardingLayout>
        {banks && <PaymentAccountForm banks={banks} />}
      </AuthOnboardingLayout>
    </Suspense>
  )
}
