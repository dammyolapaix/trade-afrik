import Image from 'next/image'
import { ReactNode } from 'react'

import { ShoppingBag } from 'lucide-react'

type Props = {
  children: ReactNode
}

export default function AuthOnboardingLayout({ children }: Props) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/images/traders.jpg"
          width={600}
          height={450}
          alt="African marketplace products"
          priority
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
              <ShoppingBag className="size-4" />
            </div>
            TradeAfrik.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center text-center">
          <div className="mx-auto w-full md:w-1/2">{children}</div>
        </div>
      </div>
    </div>
  )
}
