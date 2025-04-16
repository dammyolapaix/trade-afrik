import Image from 'next/image'

import { CheckCircle } from 'lucide-react'

export function DashboardPreviewSection() {
  return (
    <section
      id="dashboard-preview"
      className="bg-muted/40 w-full py-12 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
                Seller Dashboard
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Powerful Insights at Your Fingertips
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our comprehensive dashboard gives you all the data and tools you
                need to optimize your sales and grow your business.
              </p>
            </div>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="text-primary h-5 w-5" />
                <span>Real-time sales analytics and reporting</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-primary h-5 w-5" />
                <span>Customer behavior and conversion insights</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-primary h-5 w-5" />
                <span>Inventory management tools</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-primary h-5 w-5" />
                <span>Marketing performance metrics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="text-primary h-5 w-5" />
                <span>Order tracking and fulfillment management</span>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-background relative h-[400px] w-full overflow-hidden rounded-xl border p-2 shadow-lg">
              <Image
                src="/images/insights.jpg"
                width={550}
                height={400}
                alt="Seller dashboard preview"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
