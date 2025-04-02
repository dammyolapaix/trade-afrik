import AuthOnboardingLayout from '../../_components/auth-onboarding-layout'
import { RegisterForm } from '../_components/register-form'

type Props = {
  searchParams: Promise<{ oauthError?: string }>
}

export default async function RegisterPage({ searchParams }: Props) {
  const { oauthError } = await searchParams

  return (
    <AuthOnboardingLayout>
      <RegisterForm oauthError={oauthError} />
    </AuthOnboardingLayout>
  )
}
