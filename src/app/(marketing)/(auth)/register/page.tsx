import paystack from '@/lib/paystack'

import AuthOnboardingLayout from '../../_components/auth-onboarding-layout'
import { RegisterForm } from '../_components/register-form'

export default async function RegisterPage() {
  const subAccounts = await paystack.listSubAccounts()

  if (subAccounts.status) {
    console.log(subAccounts.data)
  }

  return (
    <AuthOnboardingLayout>
      <RegisterForm />
    </AuthOnboardingLayout>
  )
}
