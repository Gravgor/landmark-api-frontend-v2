'use client'

import { Loader2 } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 shadow-xl flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  )
}