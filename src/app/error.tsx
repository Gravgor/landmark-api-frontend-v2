'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import Link from 'next/link'

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0c0e16] text-white p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex flex-col items-center space-y-2">
          <AlertTriangle className="w-20 h-20 text-yellow-500" />
          <h1 className="text-4xl font-bold">Oops! Something went wrong</h1>
          <p className="text-xl text-gray-400">We apologize for the inconvenience</p>
        </div>
        
        <div className="bg-[#1c1f2e] rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-2">Error Details</h2>
          <p className="text-gray-300 mb-4">{error.message || "An unexpected error occurred"}</p>
          {error.digest && (
            <p className="text-sm text-gray-400 mb-4">Error ID: {error.digest}</p>
          )}
          <div className="flex flex-col space-y-4">
            <Button onClick={reset} variant="default">
              Try Again
            </Button>
            <Link href="/" passHref>
              <Button variant="outline" className="w-full">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="text-sm text-gray-400">
          <p>If the problem persists, please contact our support team.</p>
          <p className="mt-2">
            <Link href="/support" className="text-indigo-400 hover:underline">
              Get Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}