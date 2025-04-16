import { BarChart2, Globe, Package, ShieldCheck, Truck } from 'lucide-react'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const features = [
  {
    icon: Globe,
    title: 'Global Reach',
    description:
      'Connect with buyers from around the world interested in authentic African products.',
  },
  {
    icon: Truck,
    title: 'Fulfillment Support',
    description:
      'We handle shipping logistics, customs, and delivery to make selling internationally easy.',
  },
  {
    icon: Package,
    title: 'Product Marketing',
    description:
      'Get your products in front of the right buyers with our targeted marketing tools.',
  },
  {
    icon: BarChart2,
    title: 'Analytics Dashboard',
    description:
      'Track performance, understand your audience, and optimize your listings with data-driven insights.',
  },
  {
    icon: Package,
    title: 'Keep 80% Revenue',
    description:
      'Enjoy one of the most competitive commission structures in the industry.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description:
      'Receive payments securely and on time with our trusted payment processing system.',
  },
]

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="bg-muted/40 w-full py-12 md:py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="bg-muted inline-block rounded-lg px-3 py-1 text-sm">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools and support you need to
              showcase your products to a global audience.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="text-primary h-10 w-10" />
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
