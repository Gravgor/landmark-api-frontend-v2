'use client'

import { motion } from 'framer-motion'
import { XCircle, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function CancelPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.div 
        className="text-center space-y-6 p-8 bg-gray-800 rounded-lg border border-gray-700 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 10 }}
        >
          <XCircle className="w-20 h-20 text-red-500 mx-auto" />
        </motion.div>
        <h1 className="text-3xl font-bold">Purchase Cancelled</h1>
        <p className="text-xl">
          Your plan purchase has been cancelled.
        </p>
        <p>
          If you have any questions or concerns, please don't hesitate to contact our support team.
        </p>
        <Button 
          onClick={() => router.push('/pricing')}
          className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Pricing
        </Button>
      </motion.div>
    </div>
  )
}