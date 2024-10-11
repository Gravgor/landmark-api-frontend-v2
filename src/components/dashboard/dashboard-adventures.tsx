'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ScrollArea } from "@/components/ui/scroll-area"

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
      <h2 className="text-2xl font-semibold mb-4">Recent API Adventures 🚀</h2>
      {loading ? (
        <p>Loading adventures...</p>
      ) : error ? (
        <p>Error: {error}</p>
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
                  <p className="font-medium">{adventure.Endpoint}</p>
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