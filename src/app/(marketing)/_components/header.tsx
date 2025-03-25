import Link from 'next/link'

import { ShoppingBag } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="inline-block font-bold">TradeAfrik</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#features"
              className="hover:text-primary flex items-center text-lg font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-primary flex items-center text-lg font-medium transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="hover:text-primary flex items-center text-lg font-medium transition-colors"
            >
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
