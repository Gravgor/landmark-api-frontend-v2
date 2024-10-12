'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { CreditCard, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { SubscriptionModal } from './SubscriptionModal'

interface BillingInfo {
  subscription: {
    status: string
    current_period_end: number
    plan: {
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
  onCancelSubscription: () => Promise<void>
}

export default function BillingInfo({ billingInfo, onCancelSubscription }: BillingInfoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount / 100)
  }

  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp * 1000), 'MMM dd, yyyy')
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Current Plan</CardTitle>
          <p className="text-gray-400">Your subscription details</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-400">Status</p>
              <Badge variant={billingInfo.subscription.status === 'active' ? 'default' : 'destructive'} className="mt-1">
                {billingInfo.subscription.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Plan</p>
              <p className="text-white font-medium mt-1">
                {formatCurrency(billingInfo.subscription.plan.amount, billingInfo.subscription.plan.currency)} / {billingInfo.subscription.plan.interval}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Current Period Ends</p>
              <p className="text-white font-medium mt-1">{formatDate(billingInfo.subscription.current_period_end)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Next Payment</p>
              <p className="text-white font-medium mt-1">{formatDate(billingInfo.next_payment_date)}</p>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
              <CreditCard className="mr-2 h-4 w-4" />
              Change Plan
            </Button>
            <Button 
              variant="outline" 
              className="w-full bg-transparent text-white hover:bg-red-900/30 hover:text-red-300 transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Billing History</CardTitle>
          <p className="text-gray-400">Your recent invoices</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-800">
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
                    className="border-b border-gray-800 transition-colors hover:bg-gray-800/50"
                  >
                    <TableCell className="font-medium text-white">{invoice.number}</TableCell>
                    <TableCell className="text-gray-300">{formatDate(invoice.created)}</TableCell>
                    <TableCell className="text-gray-300">{formatCurrency(invoice.amount_due, invoice.currency)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={invoice.status === 'paid' ? 'default' : 'destructive'}
                        className="bg-opacity-80 hover:bg-opacity-100 transition-opacity"
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        asChild 
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 transition-colors"
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

      <SubscriptionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={onCancelSubscription}
      />
    </div>
  )
}