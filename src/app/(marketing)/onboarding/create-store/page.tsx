import { redirect } from 'next/navigation'

import { retrieveStore } from '@/features/stores/services'
import { getUserFromSession } from '@/lib/auth/sessions'
import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  ONBOARDING_PAYMENT_ACCOUNT_ROUTE,
} from '@/lib/routes'

import AuthOnboardingLayout from '../../_components/auth-onboarding-layout'
import CreateStoreForm from '../_components/create-store-form'

export default async function CreateStorePage() {
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
      <CreateStoreForm />
    </AuthOnboardingLayout>
  )
}
