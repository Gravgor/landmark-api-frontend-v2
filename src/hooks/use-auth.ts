'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { AuthContext } from '@/components/providers/AuthProvider'

export function useAuth() {
  const context = useContext(AuthContext)
  const router = useRouter()

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  const checkAccess = () => {
    if (!context.isAuthenticated) {
      router.push('/')
    }
  }

  return { ...context, checkAccess }
}