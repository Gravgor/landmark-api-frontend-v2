
import CTASection from "@/components/cta-section"
import FeaturesSection from "@/components/features-section"
import Hero from "@/components/hero-section"
import PricingSection from "@/components/pricing-section"

export default function Page() {
  return (
    <div className="relative">
      <Hero />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
    </div>
  )
}