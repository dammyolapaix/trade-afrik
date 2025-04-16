'use client'

import Link from 'next/link'
import { useActionState } from 'react'

import SubmitButton from '@/components/submit-button'
import SuccessErrorMessage from '@/components/success-error-message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { oAuthAction } from '@/features/users/auth/actions'
import { LOGIN_ROUTE } from '@/lib/routes'

type Props = {
  oauthError?: string
}

export function RegisterForm({ oauthError }: Props) {
  const [oAuthState, oAuthFormAction] = useActionState(oAuthAction, {})

  return (
    <>
      {oAuthState.error ||
        (oauthError && (
          <SuccessErrorMessage
            messageType="error"
            message={oAuthState.error || oauthError}
          />
        ))}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to register to your account
        </p>
      </div>
      <div className="grid gap-6">
        <form className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <form action={oAuthFormAction}>
          <input
            type="text"
            name="provider"
            defaultValue="google"
            className="hidden"
          />
          <input
            type="text"
            name="role"
            defaultValue="seller"
            className="hidden"
          />
          <input
            type="text"
            name="authType"
            defaultValue="register"
            className="hidden"
          />

          <SubmitButton
            variant="outline"
            className="w-full"
            cta={
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Continue with Google
              </>
            }
          />
        </form>
      </div>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link href={LOGIN_ROUTE} className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </>
  )
}
