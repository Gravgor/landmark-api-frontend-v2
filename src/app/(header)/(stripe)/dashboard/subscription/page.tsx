import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { getUserBillingInfo } from '@/lib/api'
import BillingInfo from './BillingInfo'

export default async function SubscriptionPage() {
  let billingInfo
  let error

  try {
    billingInfo = await getUserBillingInfo()
  } catch (err) {
    error = 'Failed to load billing information. Please try again later.'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      <main className="container mx-auto px-4 py-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-4xl font-bold mb-8">Manage Your Subscription</h1>
        
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <BillingInfo billingInfo={billingInfo}/>
        )}
      </main>
    </div>
  )
}