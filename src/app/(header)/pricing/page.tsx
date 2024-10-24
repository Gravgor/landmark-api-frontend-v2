//@ts-nocheck
"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, X } from "lucide-react"
import Link from "next/link"

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: "Free",
      icon: "⬡",
      price: { monthly: "$0", annual: "$0" },
      description: "Perfect for testing and small projects",
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
      icon: "⬢",
      price: { monthly: "$49", annual: "$470" },
      description: "Ideal for growing applications",
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
      icon: "◆",
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
  ];

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
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-gray-400">Start with our free tier and scale as you grow</p>
        </div>

        <div className="flex justify-center mb-12">
          <Tabs value={billingCycle} onValueChange={(value) => setBillingCycle(value)} className="w-fit">
            <TabsList className="bg-gray-800/50 p-1 rounded-lg">
              <TabsTrigger 
                value="monthly" 
                className="px-6 py-2 data-[state=active]:bg-blue-600 rounded-md transition-colors"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger 
                value="annual" 
                className="px-6 py-2 data-[state=active]:bg-blue-600 rounded-md transition-colors"
              >
                Annual
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative overflow-hidden rounded-2xl bg-gray-800/50 p-8 ${
                plan.highlighted ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="mb-6">
                <span className="text-2xl text-blue-400">{plan.icon}</span>
                <h3 className="text-2xl font-bold text-white mt-4">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-4xl font-bold text-white">{plan.price[billingCycle]}</span>
                  {plan.price[billingCycle] !== "Custom" && (
                    <span className="text-gray-400 ml-2">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  )}
                </div>
                <p className="text-gray-400 mt-4">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.limitations?.map((limitation) => (
                  <li key={limitation} className="flex items-center text-gray-500">
                    <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>

              <Link href={`/auth?plan=${plan.name.toLowerCase()}`} className="block">
                <Button
                  className={`w-full py-6 text-lg ${
                    plan.highlighted
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-gray-800/50 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white py-4">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 bg-gray-800/50 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-white mb-2">Ready to get started?</h2>
              <p className="text-gray-400">Choose the plan that's right for you and start exploring landmarks today!</p>
            </div>
            <div className="flex space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700">Get API Key</Button>
              <Button variant="outline">View Documentation</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage;