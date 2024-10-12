import { CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface SubscriptionData {
  plan: string
  nextBillingDate: string
  amount: string
}

export default async function SubscriptionDetails({ 
  getSubscriptionData 
}: { 
  getSubscriptionData: () => Promise<SubscriptionData>
}) {
  const subscriptionData = await getSubscriptionData()

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-xl border border-blue-500/20 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Current Plan</h2>
      <div className="space-y-2">
        <p><strong>Plan:</strong> {subscriptionData.plan}</p>
        <p><strong>Next Billing Date:</strong> {subscriptionData.nextBillingDate}</p>
        <p><strong>Amount:</strong> {subscriptionData.amount}</p>
      </div>
      <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
        <CreditCard className="mr-2 h-4 w-4" />
        Change Plan
      </Button>
    </div>
  )
}