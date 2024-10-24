'use client'

'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  CreditCard, 
  Download, 
  AlertCircle, 
  ArrowLeft,
  Box,
  Clock
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface BillingInfo {
  subscription: {
    status: string
    current_period_end: number
    plan: {
      id: string
      amount: number
      currency: string
      interval: string
    }
  }
  invoices: Array<{
    id: string
    number: string
    amount_due: number
    currency: string
    status: string
    created: number
    invoice_pdf: string
  }>
  next_payment_date: number
}

interface BillingInfoProps {
  billingInfo: BillingInfo
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount / 100)
}

const formatDate = (timestamp: number) => {
  return format(new Date(timestamp * 1000), 'MMM dd, yyyy')
}

export function BillingInfo({ billingInfo }: BillingInfoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const planName = billingInfo.subscription.plan.amount === 4900 ? 'Landmark API Pro Access' : 'Landmark API Free Access'
  const planPriceId = billingInfo.subscription.plan.amount === 4900 ? 
    `${process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID}` : 
    `${process.env.NEXT_PUBLIC_STRIPE_FREE_PRICE_ID}`

  const handleCancelSubscription = async () => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Subscription cancelled')
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to cancel subscription:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#0A0F1E] border-[#1a2236]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">{planName}</p>
                <p className="text-blue-400">
                  {formatCurrency(billingInfo.subscription.plan.amount, billingInfo.subscription.plan.currency)} / {billingInfo.subscription.plan.interval}
                </p>
              </div>
              <Box className="h-6 w-6 text-blue-400" />
            </div>
            <Button 
              onClick={() => router.push(`/dashboard/subscription/change-plan?plan=${planPriceId}`)}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Manage Plan
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#0A0F1E] border-[#1a2236]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">Next Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">
                  {formatDate(billingInfo.next_payment_date)}
                </p>
                <Badge 
                  variant={billingInfo.subscription.status === 'active' ? 'default' : 'destructive'}
                  className="mt-2"
                >
                  {billingInfo.subscription.status}
                </Badge>
              </div>
              <Clock className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0A0F1E] border-[#1a2236]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">Period End</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-white">
                  {formatDate(billingInfo.subscription.current_period_end)}
                </p>
                <p className="text-blue-400">Current billing period</p>
              </div>
              <CreditCard className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#0A0F1E] border-[#1a2236]">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-[#1a2236]">
                  <TableHead className="text-gray-400">Invoice Number</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400">Amount</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-right text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingInfo.invoices.map((invoice) => (
                  <TableRow 
                    key={invoice.id} 
                    className="border-b border-[#1a2236] hover:bg-[#141b2d]"
                  >
                    <TableCell className="font-medium text-white">{invoice.number}</TableCell>
                    <TableCell className="text-gray-300">{formatDate(invoice.created)}</TableCell>
                    <TableCell className="text-gray-300">
                      {formatCurrency(invoice.amount_due, invoice.currency)}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={invoice.status === 'paid' ? 'default' : 'destructive'}
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        asChild 
                        className="text-blue-400 hover:text-blue-300 hover:bg-[#1a2236]"
                      >
                        <a href={invoice.invoice_pdf} target="_blank" rel="noopener noreferrer">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-[#0A0F1E] text-white border-[#1a2236]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Cancel Subscription</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to cancel your subscription?
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 p-4 bg-yellow-900/20 rounded-md">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <p className="text-sm text-yellow-200">
              You will lose access to premium features at the end of your current billing period.
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)} 
              className="bg-transparent border-[#1a2236] text-white hover:bg-[#141b2d]"
            >
              Keep Subscription
            </Button>
            <Button 
              onClick={handleCancelSubscription} 
              disabled={isLoading} 
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'Canceling...' : 'Confirm Cancellation'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}