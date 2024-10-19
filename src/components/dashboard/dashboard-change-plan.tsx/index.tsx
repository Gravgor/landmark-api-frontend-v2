'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CreditCard, Check, ArrowLeft, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from 'next/link'
import { useStripePrices } from '@/hooks/use-stripe-prices'

interface Plan {
  id: string
  name: string
  description: string
  amount: number
  priceId: string
  currency: string
  interval: string
  intervalCount: number
  features: string[]
}

export default function SubscriptionChangePlan() {
  const searchParams = useSearchParams()
  const [currentPlan, setCurrentPlan] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isChangingPlan, setIsChangingPlan] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { plans, isLoading, error: stripePricesError } = useStripePrices()
  const [combinedPlans, setCombinedPlans] = useState<Plan[]>([])

  useEffect(() => {
    if (plans.length > 0) {
      const updatedPlans: Plan[] = plans.map(plan => ({
        id: plan.priceId,
        name: plan.productName,
        description: plan.productDescription,
        amount: plan.unitAmount,
        priceId: plan.priceId,
        currency: plan.currency,
        interval: plan.interval || 'month',
        intervalCount: plan.intervalCount || 1,
        features: plan.priceId === process.env.NEXT_PUBLIC_PRO_PRICE_ID
        ? [
            '1,000 requests per day',
            'Basic support',
            'Access to basic landmark information',
            'Standard filtering options',
            'Basic landmark description and visitor tips'
          ]
        : 
          [
            '10,000 requests per day',
            'Priority support',
            'Access to real-time weather and crowd data',
            'Advanced filtering and sorting options',
            'Detailed historical and visitor info',
            'Custom API endpoints for enhanced performance'
          ]
    }))
      setCombinedPlans(updatedPlans)
    }
  }, [plans])

  useEffect(() => {
    const plan = searchParams.get('plan')
    if (plan && combinedPlans.length > 0) {
      const currentPlanDetails = combinedPlans.find(p => p.priceId === plan)
      if (currentPlanDetails) {
        setCurrentPlan(plan)
        const otherPlan = combinedPlans.find(p => p.priceId !== plan)
        if (otherPlan) {
          setSelectedPlan(otherPlan.priceId)
        } else {
          setError('No alternative plan available')
        }
      } else {
        setError('Invalid plan specified in URL')
      }
    }
  }, [searchParams, combinedPlans])

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount / 100)
  }

  const handleChangePlan = async () => {
    if (!selectedPlan || selectedPlan === currentPlan) return
    setIsChangingPlan(true)
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Plan changed to:', selectedPlan)
      // Here you would typically update the user's plan in your backend
    } catch (error) {
      console.error('Failed to change plan:', error)
      setError('Failed to change plan. Please try again.')
    } finally {
      setIsChangingPlan(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || stripePricesError) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error || stripePricesError}</AlertDescription>
          </Alert>
          <Button
            variant="ghost"
            className="mt-4 text-gray-300 hover:text-white transition-colors"
            asChild
          >
            <Link href="/subscription">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Subscription
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!currentPlan || !selectedPlan || combinedPlans.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const availablePlan = combinedPlans.find(plan => plan.priceId === selectedPlan)

  if (!availablePlan) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Invalid plan selection</AlertDescription>
          </Alert>
          <Button
            variant="ghost"
            className="mt-4 text-gray-300 hover:text-white transition-colors"
            asChild
          >
            <Link href="/subscription">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Subscription
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">
          {availablePlan.amount === 0 ? 'Downgrade' : 'Upgrade'} Your Plan
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gray-800 border-blue-500/20 overflow-hidden">
            <CardHeader className="bg-gray-900">
              <CardTitle className="text-2xl font-bold text-white">{availablePlan.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">
                  {formatCurrency(availablePlan.amount, availablePlan.currency)}
                </span>
                <span className="text-gray-400">
                  /{availablePlan.interval}
                  {availablePlan.intervalCount > 1 ? ` (${availablePlan.intervalCount} ${availablePlan.interval}s)` : ''}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{availablePlan.description}</p>
              <ul className="space-y-3 mb-6">
                {availablePlan.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={availablePlan.priceId} id={availablePlan.priceId} className="border-white" />
                  <Label htmlFor={availablePlan.priceId} className="text-white">Select Plan</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button 
            onClick={handleChangePlan} 
            disabled={isChangingPlan || selectedPlan === currentPlan} 
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {isChangingPlan ? 'Changing Plan...' : `${availablePlan.amount === 0 ? 'Downgrade to' : 'Upgrade to'} ${availablePlan.name}`}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}