import { CTASection } from './_components/cta-section'
import { DashboardPreviewSection } from './_components/dashboard-preview-section'
import { FeaturesSection } from './_components/features-section'
import { HeroSection } from './_components/hero-section'
import { HowItWorksSection } from './_components/how-it-works-section'
import { PricingSection } from './_components/pricing-section'
import { TestimonialsSection } from './_components/testimonials-section'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />

        <FeaturesSection />

        <HowItWorksSection />

        <DashboardPreviewSection />

        <PricingSection />

        <TestimonialsSection />

        <CTASection />
      </main>
    </div>
  )
}
