import { useState, useEffect } from 'react'

interface StripeProduct {
  id: string
  name: string
  description: string
}

interface StripePrice {
  id: string
  product: StripeProduct
  unit_amount: number
  currency: string
  recurring: {
    interval: string
    interval_count: number
  } | null
}

interface StripePlan {
  priceId: string
  productName: string
  productDescription: string
  unitAmount: number
  currency: string
  interval: string | null
  intervalCount: number | null
}

export function useStripePrices() {
  const [plans, setPlans] = useState<StripePlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStripePrices = async () => {
      try {
        const response = await fetch('/api/stripe/prices')

        if (!response.ok) {
          throw new Error('Failed to fetch Stripe data')
        }

        const prices: StripePrice[] = await response.json()

        const formattedPlans = prices.map(price => ({
          priceId: price.id,
          productName: price.product.name,
          productDescription: price.product.description,
          unitAmount: price.unit_amount,
          currency: price.currency,
          interval: price.recurring?.interval || null,
          intervalCount: price.recurring?.interval_count || null
        }))

        setPlans(formattedPlans)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStripePrices()
  }, [])

  return { plans, isLoading, error }
}