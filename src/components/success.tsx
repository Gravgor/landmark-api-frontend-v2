'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { loginAfterRedirect } from '@/app/actions/actions'

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')
  const [countdown, setCountdown] = useState(10)
  const [loginStatus, setLoginStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    const performLogin = async () => {
      try {
        const result = await loginAfterRedirect()
        if (result.success) {
          setLoginStatus('success')
          startCountdown()
        } else {
          setLoginStatus('error')
        }
      } catch (error) {
        console.error('Login error:', error)
        setLoginStatus('error')
      }
    }

    performLogin()
  }, [])

  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer)
          router.push('/dashboard')
        }
        return prevCountdown - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }

  const renderContent = () => {
    switch (loginStatus) {
      case 'success':
        return (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
            </motion.div>
            <h1 className="text-3xl font-bold">Success!</h1>
            <p className="text-xl">
              Your {plan} plan has been activated successfully.
            </p>
            <p>
              You will be redirected to your dashboard in {countdown} seconds.
            </p>
            <Button 
              onClick={() => router.push('/dashboard')}
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Go to Dashboard Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )
      case 'error':
        return (
          <>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
            >
              <XCircle className="w-20 h-20 text-red-500 mx-auto" />
            </motion.div>
            <h1 className="text-3xl font-bold">Oops!</h1>
            <p className="text-xl">
              There was an error activating your {plan} plan.
            </p>
            <Button 
              onClick={() => router.push('/login')}
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
            >
              Go to Login Page
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.div 
        className="text-center space-y-6 p-8 bg-gray-800 rounded-lg border border-gray-700 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {renderContent()}
      </motion.div>
    </div>
  )
}