import { useState, useEffect } from 'react'

interface ApiAdventure {
  ID: number
  UserID: string
  Endpoint: string
  Method: string
  Status: string
  StatusCode: number
  Summary: string
  Timestamp: string
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
}

export function useApiAdventures(fetchInterval: number = 60000) {
  const [adventures, setAdventures] = useState<ApiAdventure[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        const response = await fetch('/api/user/adventures')
        if (!response.ok) {
          throw new Error('Failed to fetch API adventures')
        }
        const data = await response.json()
        setAdventures(data)
        setLoading(false)
      } catch (err) {
        //@ts-expect-error Yes can be errors
        setError(err.message)
        setLoading(false)
      }
    }

    fetchAdventures()

    const intervalId = setInterval(fetchAdventures, fetchInterval)

    return () => clearInterval(intervalId)
  }, [fetchInterval])

  return { adventures, loading, error }
}