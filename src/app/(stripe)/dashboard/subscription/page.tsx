import Link from 'next/link'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { getUserBillingInfo } from '@/lib/api'
import { BillingInfo } from './BillingInfo'

export default async function SubscriptionPage() {
  let billingInfo
  let error

  try {
    billingInfo = await getUserBillingInfo()
  } catch (err) {
    error = 'Failed to load billing information. Please try again later.'
  }

  return (
    <div className="min-h-screen bg-[#060918]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            asChild 
            className="text-gray-400 hover:text-white hover:bg-[#1a2236]"
          >
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">Manage Your Subscription</h1>
            <p className="text-gray-400">View and manage your subscription details</p>
          </div>
        </div>
        
        {error ? (
          <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg text-red-200">
            <AlertCircle className="h-5 w-5 mb-2" />
            {error}
          </div>
        ) : (
          <BillingInfo billingInfo={billingInfo} />
        )}
      </div>
    </div>
  )
}