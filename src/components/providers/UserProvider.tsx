'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'

interface UserData {
  name: string
  email: string
  planType: string
  apiCalls: number
  apiLimit: number
  landmarks: number
  apiKey: string
  accessToken: string
}

interface UserContextType {
  userData: UserData | null
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch('/api/user/me')
          if (response.ok) {
            const data = await response.json()
            setUserData(data)
          } else {
            console.error('Failed to fetch user data')
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      }
    }

    fetchUserData()
  }, [isAuthenticated])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}