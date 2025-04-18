import Link from 'next/link'

import { ShoppingBag } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-background w-full border-t">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <ShoppingBag className="h-6 w-6" />
          <p className="text-center text-sm leading-loose md:text-left">
            © 2025 TradeAfrik. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/terms" className="text-sm underline underline-offset-4">
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-sm underline underline-offset-4"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
