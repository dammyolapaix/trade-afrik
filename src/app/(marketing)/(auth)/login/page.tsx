import AuthOnboardingLayout from '../../_components/auth-onboarding-layout'
import { LoginForm } from '../_components/login-form'

type Props = {
  searchParams: Promise<{ oauthError?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { oauthError } = await searchParams

  return (
    <AuthOnboardingLayout>
      <LoginForm oauthError={oauthError} />
    </AuthOnboardingLayout>
  )
}
