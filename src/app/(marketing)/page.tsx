import { HeroSection } from "./_components/hero-section";
import { FeaturesSection } from "./_components/features-section";
import { HowItWorksSection } from "./_components/how-it-works-section";
import { DashboardPreviewSection } from "./_components/dashboard-preview-section";
import { PricingSection } from "./_components/pricing-section";
import { TestimonialsSection } from "./_components/testimonials-section";
import { CTASection } from "./_components/cta-section";

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
  );
}
