import Link from 'next/link'

import { CheckCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function PricingSection() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Choose the Right Plan for Your Business
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Flexible options to support businesses of all sizes.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Standard Plan</CardTitle>
              <CardDescription>
                Perfect for new sellers getting started
              </CardDescription>
              <div className="mt-4 text-4xl font-bold">20% Commission</div>
              <p className="text-muted-foreground text-sm">
                You keep 80% of your sales
              </p>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>Basic store customization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>Standard product listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>Global shipping support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>Basic analytics dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>Email support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="border-primary border-2">
            <CardHeader>
              <div className="border-primary bg-primary/10 text-primary inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
                Recommended
              </div>
              <CardTitle className="mt-4">Pro Plan</CardTitle>
              <CardDescription>
                For established sellers looking to scale
              </CardDescription>
              <div className="mt-4 text-4xl font-bold">
                $49.99/month + 15% Commission
              </div>
              <p className="text-muted-foreground text-sm">
                You keep 85% of your sales
              </p>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>Advanced store customization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>Priority product listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>Featured in category pages</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>Advanced analytics and insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-primary h-5 w-5" />
                  <span>Marketing consultation</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/register-pro">Upgrade to Pro</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
