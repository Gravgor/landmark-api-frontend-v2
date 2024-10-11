import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "For small projects and testing",
      features: [
        "100 requests / day",
        "Basic landmark info",
        "Standard support",
        "API key required",
      ],
      limitations: [
        "No advanced search",
        "Limited to 10 countries",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$49",
      period: "per month",
      description: "For growing applications",
      features: [
        "10,000 requests / day",
        "Advanced landmark details",
        "Priority support",
        "API key required",
        "Advanced search",
        "Access to all countries",
      ],
      cta: "Upgrade to Pro",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale applications",
      features: [
        "Unlimited requests",
        "Full landmark database access",
        "24/7 dedicated support",
        "Custom API integration",
        "Advanced analytics",
        "Service Level Agreement (SLA)",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="w-full py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Flexible Pricing Plans</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col p-6 bg-gray-800 rounded-lg border ${
                plan.highlighted
                  ? "border-blue-500 shadow-lg shadow-blue-500/50"
                  : "border-gray-700"
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-gray-400">/{plan.period}</span>}
              </div>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <ul className="mb-6 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.limitations && plan.limitations.map((limitation, limitationIndex) => (
                  <li key={limitationIndex} className="flex items-center mb-2 text-gray-500">
                    <X className="h-5 w-5 mr-2 text-red-500" />
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.highlighted
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}