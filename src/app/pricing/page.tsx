'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MapPin, Check, X, HelpCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const plans = [
    {
      name: "Free",
      price: { monthly: "$0", annual: "$0" },
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
      price: { monthly: "$49", annual: "$470" },
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
      price: { monthly: "Custom", annual: "Custom" },
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

  const featureComparison = [
    { feature: "Daily API Requests", free: "100", pro: "10,000", enterprise: "Unlimited" },
    { feature: "Countries Covered", free: "10", pro: "All", enterprise: "All" },
    { feature: "Landmark Details", free: "Basic", pro: "Advanced", enterprise: "Full" },
    { feature: "Search Capabilities", free: "Basic", pro: "Advanced", enterprise: "Advanced" },
    { feature: "Support", free: "Standard", pro: "Priority", enterprise: "24/7 Dedicated" },
    { feature: "Custom Integration", free: "❌", pro: "❌", enterprise: "✅" },
    { feature: "SLA", free: "❌", pro: "❌", enterprise: "✅" },
    { feature: "Analytics", free: "Basic", pro: "Advanced", enterprise: "Advanced" },
  ]

  const faqs = [
    {
      question: "What happens if I exceed my daily request limit?",
      answer: "If you exceed your daily request limit, additional requests will be rejected with a 429 (Too Many Requests) status code. You can upgrade your plan or wait until the next day for your limit to reset."
    },
    {
      question: "Can I change my plan at any time?",
      answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes will be effective immediately, and any unused portion of your current billing cycle will be prorated."
    },
    {
      question: "Do you offer a free trial for paid plans?",
      answer: "Yes, we offer a 14-day free trial for our Pro plan. You can sign up for the trial without providing payment information, and you'll have full access to all Pro features during the trial period."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover) and PayPal. For Enterprise plans, we also offer invoicing options."
    },
    {
      question: "Is there a long-term contract for paid plans?",
      answer: "No, there are no long-term contracts. Our paid plans are billed monthly or annually, and you can cancel at any time."
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-xl">Landmark API</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              {['Home', 'Docs', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-sm font-medium hover:text-blue-400 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
            <Button className='bg-white text-black'>Log In</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Flexible Pricing for Every Need</h1>
        
        <div className="flex justify-center mb-8">
          <Tabs value={billingCycle} onValueChange={(value: 'monthly' | 'annual') => setBillingCycle(value)}>
            <TabsList className="bg-gray-800 p-1 rounded-lg">
              <TabsTrigger value="monthly" className="px-4 py-2 text-sm font-medium transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Monthly Billing
              </TabsTrigger>
              <TabsTrigger value="annual" className="px-4 py-2 text-sm font-medium transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Annual Billing
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col p-6 bg-gray-800 rounded-lg border ${
                plan.highlighted
                  ? "border-blue-500 shadow-lg shadow-blue-500/50"
                  : "border-gray-700"
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price[billingCycle]}</span>
                {plan.price[billingCycle] !== "Custom" && <span className="text-gray-400">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>}
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
            </motion.div>
          ))}
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Feature Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 text-left">Feature</th>
                  <th className="p-2 text-center">Free</th>
                  <th className="p-2 text-center">Pro</th>
                  <th className="p-2 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                    <td className="p-2 border-t border-gray-700">{row.feature}</td>
                    <td className="p-2 border-t border-gray-700 text-center">{row.free}</td>
                    <td className="p-2 border-t border-gray-700 text-center">{row.pro}</td>
                    <td className="p-2 border-t border-gray-700 text-center">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="bg-gray-800 p-8 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
              <p className="text-gray-400">Choose the plan that's right for you and start exploring landmarks today!</p>
            </div>
            <div className="flex space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700">Sign Up Now</Button>
              <Button variant="outline">Contact Sales</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}