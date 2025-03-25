import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight, CheckCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Sell African Indigenous Products to the World
              </h1>
              <p className="text-muted-foreground max-w-[600px] md:text-xl">
                Connect with global buyers, showcase your authentic products,
                and grow your business with our specialized B2B marketplace.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/register">
                  Start Selling <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#learn-more">Learn More</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <CheckCircle className="text-primary h-4 w-4" />
                <span>Keep 80% of Revenue</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="text-primary h-4 w-4" />
                <span>Global Shipping</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="text-primary h-4 w-4" />
                <span>Marketing Support</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[450px] w-full overflow-hidden rounded-xl">
              <Image
                src="/images/traders.jpg"
                width={600}
                height={450}
                alt="African marketplace products"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
