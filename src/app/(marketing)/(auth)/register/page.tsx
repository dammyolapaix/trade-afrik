import { redirect } from 'next/navigation'

import { retrieveStore } from '@/features/stores/services'
import { getUserFromSession } from '@/lib/auth/sessions'
import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  ONBOARDING_PAYMENT_ACCOUNT_ROUTE,
} from '@/lib/routes'

import AuthOnboardingLayout from '../../_components/auth-onboarding-layout'
import { RegisterForm } from '../_components/register-form'

type Props = {
  searchParams: Promise<{ oauthError?: string }>
}

export default async function RegisterPage({ searchParams }: Props) {
  const { oauthError } = await searchParams

  const authUser = await getUserFromSession()

  if (!authUser) {
    redirect(LOGIN_ROUTE)
  }

  const authUserStore = await retrieveStore({ userId: authUser.id })

  // If the user already has a store and doesn't have a payment account, redirect to the payment account page
  if (authUserStore && !authUserStore.paystackSubAccountId) {
    redirect(ONBOARDING_PAYMENT_ACCOUNT_ROUTE)
  }

  // If the user already has a payment account, redirect to the dashboard
  if (authUserStore && authUserStore.paystackSubAccountId) {
    redirect(DASHBOARD_ROUTE)
  }

  return (
    <AuthOnboardingLayout>
      <RegisterForm oauthError={oauthError} />
    </AuthOnboardingLayout>
  )
}
