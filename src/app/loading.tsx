import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0e16] text-white">
      <div className="flex flex-col items-center space-y-6 text-center">
        <div className="flex items-center justify-center">
          <svg
            className="w-16 h-16 text-indigo-500"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="ml-3 text-4xl font-bold">Landmark API</span>
        </div>
        <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
        <div className="space-y-2">
          <p className="text-2xl font-semibold">Loading your world of landmarks...</p>
          <p className="text-lg text-gray-400">Experience the power of our cutting-edge API</p>
        </div>
      </div>
    </div>
  )
}