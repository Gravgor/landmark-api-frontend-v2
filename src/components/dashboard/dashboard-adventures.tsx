'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Rocket, AlertCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

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

// Skeleton Loading Component
const AdventureSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-slate-800/50 p-4 rounded-lg animate-pulse">
        <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-slate-700 rounded w-1/4 mb-2"></div>
        <div className="h-3 bg-slate-700 rounded w-1/2"></div>
      </div>
    ))}
  </div>
)

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
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-medium text-white">
          Recent API Adventures <Rocket className="w-5 h-5" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <AdventureSkeleton />
        ) : error ? (
          <div className="flex items-center justify-center h-64 text-red-400">
            <AlertCircle className="mr-2" />
            <p>Error: {error}</p>
          </div>
        ) : adventures.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Rocket className="w-16 h-16 mb-4 text-blue-500" />
            <p className="text-lg font-semibold mb-2">No API Adventures Yet</p>
            <p className="text-sm text-center max-w-md">
              Your API journey is about to take off! Make your first API call to see your adventures here.
            </p>
          </div>
        ) : (
          <ScrollArea className="h-64 pr-4" ref={scrollAreaRef}>
            <div className="space-y-3">
              {adventures.map((adventure, index) => (
                <motion.div 
                  key={adventure.ID} 
                  className="p-4 border border-slate-800 rounded-lg bg-slate-900/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <code className="text-sm font-mono text-slate-300">
                      {adventure.Endpoint}
                    </code>
                    <span className={`px-2 py-1 text-xs rounded ${
                      adventure.Status === 'SUCCESS' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {adventure.Status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">
                    {formatTimestamp(adventure.Timestamp)}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {adventure.Summary}
                  </p>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}