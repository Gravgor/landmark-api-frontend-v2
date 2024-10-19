'use client'

import { useState, useRef, useCallback } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Check, X, User, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createAccount } from '@/app/actions/actions'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

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

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('plan', selectedPlan?.toLowerCase() || 'free')

    try {
      const result = await createAccount(formData)

      if (result.success) {
          const stripe = await stripePromise
          if (!stripe) {
            throw new Error('Stripe failed to initialize')
          }
          console.log(result)
          const { error } = await stripe.redirectToCheckout({
            sessionId: result.sessionId,
          })

          if (error) {
            throw new Error(error.message)
          }
      } else {
        throw new Error(result.message || 'An error occurred during account creation.')
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  const PlanCard = useCallback(({ plan, index }: { plan: typeof plans[0], index: number }) => {
    

    return (
      <motion.div
        className={`flex flex-col p-6 bg-gray-800 bg-opacity-75 rounded-lg border ${
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
          onClick={() => {
            setSelectedPlan(plan.name)
            setIsModalOpen(true)
          }}
        >
          {plan.cta}
        </Button>
      </motion.div>
    )
  }, [scrollYProgress, setSelectedPlan, setIsModalOpen])

  return (
    <section ref={sectionRef} id="pricing" className="w-full py-20 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-75 backdrop-blur-md"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Flexible Pricing Plans</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
        {message && (
          <div className="mt-8 p-4 bg-gray-700 rounded-lg text-center max-w-md mx-auto">
            {message}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white text-gray-900 rounded-lg p-8 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Sign Up for {selectedPlan}</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                  <X className="w-6 h-6" />
                </Button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Sign Up'}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}