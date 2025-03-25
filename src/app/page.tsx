import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  CheckCircle,
  Globe,
  Package,
  Percent,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6" />
              <span className="inline-block font-bold">TradeAfrik</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#features"
                className="flex items-center text-lg font-medium transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="flex items-center text-lg font-medium transition-colors hover:text-primary"
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="flex items-center text-lg font-medium transition-colors hover:text-primary"
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Sell African Indigenous Products to the World
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Connect with global buyers, showcase your authentic
                    products, and grow your business with our specialized B2B
                    marketplace.
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
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Keep 80% of Revenue</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Global Shipping</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
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

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything You Need to Succeed
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides all the tools and support you need to
                  showcase your products to a global audience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Globe className="h-10 w-10 text-primary" />
                  <CardTitle>Global Reach</CardTitle>
                  <CardDescription>
                    Connect with buyers from around the world interested in
                    authentic African products.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Truck className="h-10 w-10 text-primary" />
                  <CardTitle>Fulfillment Support</CardTitle>
                  <CardDescription>
                    We handle shipping logistics, customs, and delivery to make
                    selling internationally easy.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Package className="h-10 w-10 text-primary" />
                  <CardTitle>Product Marketing</CardTitle>
                  <CardDescription>
                    Get your products in front of the right buyers with our
                    targeted marketing tools.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart2 className="h-10 w-10 text-primary" />
                  <CardTitle>Analytics Dashboard</CardTitle>
                  <CardDescription>
                    Track performance, understand your audience, and optimize
                    your listings with data-driven insights.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Percent className="h-10 w-10 text-primary" />
                  <CardTitle>Keep 80% Revenue</CardTitle>
                  <CardDescription>
                    Enjoy one of the most competitive commission structures in
                    the industry.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <ShieldCheck className="h-10 w-10 text-primary" />
                  <CardTitle>Secure Payments</CardTitle>
                  <CardDescription>
                    Receive payments securely and on time with our trusted
                    payment processing system.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple Process, Powerful Results
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started in minutes and start selling your products
                  globally.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Create Your Store</h3>
                <p className="text-muted-foreground">
                  Sign up, complete your profile, and set up your digital
                  storefront with product listings.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Receive Orders</h3>
                <p className="text-muted-foreground">
                  Global buyers discover and purchase your products through our
                  marketplace.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Ship & Get Paid</h3>
                <p className="text-muted-foreground">
                  We handle the logistics and payment processing, you focus on
                  creating amazing products.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="dashboard-preview"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                    Seller Dashboard
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Powerful Insights at Your Fingertips
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our comprehensive dashboard gives you all the data and tools
                    you need to optimize your sales and grow your business.
                  </p>
                </div>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Real-time sales analytics and reporting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Customer behavior and conversion insights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Inventory management tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Marketing performance metrics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Order tracking and fulfillment management</span>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[400px] w-full overflow-hidden rounded-xl border bg-background p-2 shadow-lg">
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

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Choose the Right Plan for Your Business
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
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
                  <p className="text-sm text-muted-foreground">
                    You keep 80% of your sales
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Basic store customization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Standard product listings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Global shipping support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Basic analytics dashboard</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
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
              <Card className="border-2 border-primary">
                <CardHeader>
                  <div className="inline-flex items-center rounded-full border border-primary bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Recommended
                  </div>
                  <CardTitle className="mt-4">Pro Plan</CardTitle>
                  <CardDescription>
                    For established sellers looking to scale
                  </CardDescription>
                  <div className="mt-4 text-4xl font-bold">
                    $49.99/month + 15% Commission
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You keep 85% of your sales
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Advanced store customization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Priority product listings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Featured in category pages</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Advanced analytics and insights</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
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

        <section
          id="testimonials"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/40"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Success Stories from Our Sellers
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from businesses that have expanded globally with our
                  platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/images/person-1.jpg"
                      width={60}
                      height={60}
                      alt="Testimonial avatar"
                      className="rounded-full w-12 h-12"
                    />
                    <div>
                      <CardTitle className="text-lg">Amara Okafor</CardTitle>
                      <CardDescription>
                        Textile Artisan, Nigeria
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    &quot;Since joining TradeAfrik, my handwoven textiles are
                    now shipping to customers in Europe and North America. My
                    revenue has increased by 300% in just six months.&quot;
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/images/person-2.jpg"
                      width={60}
                      height={60}
                      alt="Testimonial avatar"
                      className="rounded-full w-12 h-12"
                    />
                    <div>
                      <CardTitle className="text-lg">Kwame Mensah</CardTitle>
                      <CardDescription>
                        Woodcraft Cooperative, Ghana
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    &quot;The Pro plan has been a game-changer for our
                    cooperative. The priority listings and marketing support
                    have connected us with high-value buyers from Asia and
                    Australia.&quot;
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/images/person-3.jpg"
                      width={60}
                      height={60}
                      alt="Testimonial avatar"
                      className="rounded-full w-12 h-12"
                    />
                    <div>
                      <CardTitle className="text-lg">Fatima Diallo</CardTitle>
                      <CardDescription>
                        Skincare Products, Senegal
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    &quot;The analytics dashboard helped me understand which
                    products were most popular in different regions, allowing me
                    to optimize my inventory and increase my conversion rate by
                    45%.&quot;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Take Your Business Global?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of African sellers already growing their
                  businesses on our platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/register">
                    Start Selling Today <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <ShoppingBag className="h-6 w-6" />
            <p className="text-center text-sm leading-loose md:text-left">
              © 2025 TradeAfrik. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-sm underline underline-offset-4"
            >
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
    </div>
  );
}
