import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from 'lucide-react'

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
}

export function SubscriptionModal({ isOpen, onClose, onConfirm }: SubscriptionModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
      onClose()
    } catch (error) {
      console.error('Failed to cancel subscription:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Cancel Subscription</DialogTitle>
          <DialogDescription className="text-gray-400">
            Are you sure you want to cancel your subscription and revert to the free plan?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 p-4 bg-yellow-900/20 rounded-md">
          <AlertCircle className="h-5 w-5 text-yellow-500" />
          <p className="text-sm text-yellow-200">
            You will lose access to premium features at the end of your current billing period.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="bg-transparent text-white hover:bg-gray-800">
            Keep Subscription
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading} className="bg-red-600 hover:bg-red-700">
            {isLoading ? 'Canceling...' : 'Confirm Cancellation'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}