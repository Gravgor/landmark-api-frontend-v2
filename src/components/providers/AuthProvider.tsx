'use client'

import React, { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardSkeleton } from '../dashboard/dashboard-skeleton'
import LoadingSpinner from '../LoadingSpinner'

interface AuthContextType {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check')
        if (response.ok) {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async () => {
    setIsAuthenticated(true)
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}