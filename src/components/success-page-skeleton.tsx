'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function SuccessPageSkeleton() {
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
          <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto animate-pulse" />
        </motion.div>
        <h1 className="text-3xl font-bold">
          <div className="h-9 bg-gray-700 rounded w-3/4 mx-auto animate-pulse" />
        </h1>
        <p className="text-xl">
          <div className="h-6 bg-gray-700 rounded w-5/6 mx-auto animate-pulse" />
        </p>
        <p>
          <div className="h-6 bg-gray-700 rounded w-4/5 mx-auto animate-pulse" />
        </p>
        <Button 
          disabled
          className="bg-gray-700 hover:bg-gray-700 transition-colors duration-200 cursor-not-allowed"
        >
          <div className="h-5 bg-gray-600 rounded w-32 animate-pulse" />
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  )
}