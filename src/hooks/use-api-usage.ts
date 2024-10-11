import { useState, useEffect } from 'react'

interface ApiUsageData {
  currentCount: number
  limit: number
  remainingRequests: number
  periodEnd: string
}

export function useApiUsage(fetchInterval: number = 60000) {
  const [apiUsage, setApiUsage] = useState<ApiUsageData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApiUsage = async () => {
      try {
        const response = await fetch('/api/user/usage')
        if (!response.ok) {
          throw new Error('Failed to fetch API usage data')
        }
        const data = await response.json()
        setApiUsage({
          currentCount: data.CurrentCount,
          limit: data.Limit,
          remainingRequests: data.RemainingRequests,
          periodEnd: data.PeriodEnd
        })
        setLoading(false)
      } catch (err) {
        //@ts-expect-error Expect error with err.
        setError(err.message)
        setLoading(false)
      }
    }

    fetchApiUsage()

    const intervalId = setInterval(fetchApiUsage, fetchInterval)

    return () => clearInterval(intervalId)
  }, [fetchInterval])

  return { apiUsage, loading, error }
}