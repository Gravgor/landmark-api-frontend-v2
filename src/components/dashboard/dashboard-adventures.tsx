'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Rocket, AlertCircle } from 'lucide-react'

interface Adventure {
  ID: number
  Endpoint: string
  Status: string
  Timestamp: string
  Summary: string
}

interface ScrollableAdventuresProps {
  adventures: Adventure[]
  loading: boolean
  error: string | null
}

export default function DashboardAdventures({ adventures, loading, error }: ScrollableAdventuresProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0
    }
  }, [adventures])

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  }

  return (
    <motion.div 
      className="bg-gray-900 rounded-lg p-6 shadow-xl border border-blue-500/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-white">Recent API Adventures 🚀</h2>
      {loading ? (
        <div className="flex items-center justify-center h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-[300px] text-red-400">
          <AlertCircle className="mr-2" />
          <p>Error: {error}</p>
        </div>
      ) : adventures.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[300px] text-gray-400">
          <Rocket className="w-16 h-16 mb-4 text-blue-500" />
          <p className="text-lg font-semibold mb-2">No API Adventures Yet</p>
          <p className="text-sm text-center max-w-md">
            Your API journey is about to take off! Make your first API call to see your adventures here.
          </p>
        </div>
      ) : (
        <ScrollArea className="h-[300px] pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {adventures.map((adventure, index) => (
              <motion.div 
                key={adventure.ID} 
                className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div>
                  <p className="font-medium text-white">{adventure.Endpoint}</p>
                  <p className="text-sm text-gray-400">{formatTimestamp(adventure.Timestamp)}</p>
                  <p className="text-xs text-gray-500 mt-1">{adventure.Summary}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  adventure.Status === 'SUCCESS' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                }`}>
                  {adventure.Status}
                </span>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      )}
    </motion.div>
  )
}