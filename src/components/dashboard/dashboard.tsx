'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Search, Code, Users, BarChart2, Package, Clock, LogOut, ChevronDown, Bell, Settings, Copy, Eye, EyeOff, Key, CreditCard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { useUser } from '@/components/providers/UserProvider'
import { useApiUsage } from '@/hooks/use-api-usage'
import { useApiAdventures } from '@/hooks/use-api-adventures'
import ApiUsageChart from '@/components/api-usage-chart'
import DashboardAdventures from '@/components/dashboard/dashboard-adventures'

export default function Dashboard() {
  const { isAuthenticated, checkAccess, logout } = useAuth()
  const { userData } = useUser()
  const { apiUsage, loading, error } = useApiUsage(30000)
  const { adventures, loading: adventuresLoading, error: adventuresError } = useApiAdventures(30000) // Fetch every 30 seconds



  useEffect(() => {
    checkAccess()
  }, [checkAccess])

  if (!isAuthenticated || !userData) {
    return null
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      <main className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome back, <span className="text-blue-400">{userData.name}</span>! 🌍
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <DashboardCard
            title="API Calls"
            value={apiUsage ? apiUsage.currentCount : 'Loading...'}
            icon={BarChart2}
            description={apiUsage ? `${apiUsage.limit.toLocaleString()} limit` : 'Fetching data...'}
          >
            {apiUsage && (
              <Progress 
                value={(apiUsage.currentCount / apiUsage.limit) * 100} 
                className="mt-2" 
              />
            )}
          </DashboardCard>
          <DashboardCard
            title="Remaining Requests"
            value={apiUsage ? apiUsage.remainingRequests : 'Loading...'}
            icon={Globe}
            description={apiUsage ? `Reset on ${new Date(apiUsage.periodEnd).toLocaleDateString()}` : 'Fetching data...'}
          />
          <DashboardCard
            title="Current Plan"
            value={userData.planType}
            icon={Package}
            button={true}
          />
          <DashboardCard
            title="API Uptime"
            value="99.99%"
            icon={Clock}
            description="Rock-solid reliability"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardAdventures 
            adventures={adventures} 
            loading={adventuresLoading} 
            error={adventuresError} 
          />
          <motion.div 
            className="bg-gray-900 rounded-lg shadow-xl border border-blue-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {adventuresLoading ? (
              <p className="p-6">Loading API usage data...</p>
            ) : adventuresError ? (
              <p className="p-6">Error: {adventuresError}</p>
            ) : (
              <ApiUsageChart adventures={adventures} />
            )}
          </motion.div>
        </div>
        <motion.div
          className="bg-gray-900 rounded-lg p-6 shadow-xl border border-blue-500/20 mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Authentication Keys & Tokens 🔐</h2>
          <div className="space-y-6">
            <AuthKeyInput
              label="API Key"
              value={userData.apiKey}
              icon={<Key className="h-4 w-4 text-blue-500" />}
            />
          </div>
          <div className="mt-6">
            <Button className="w-full">
              <Key className="mr-2 h-4 w-4" />
              Generate New API Key
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

function DashboardCard({ title, value, icon: Icon, description, button, children }:any) {
  return (
    <motion.div 
      className="bg-gray-900 rounded-lg p-6 shadow-xl border border-blue-500/20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl font-semibold">{value}</h3>
        </div>
        <Icon className="h-6 w-6 text-blue-500" />
      </div>
      {children}
      <p className="text-sm text-gray-400 mt-2">{description}</p>
      {button === true && <Link href="/dashboard/subscription">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <CreditCard className="mr-2 h-4 w-4" />
              Manage Subscription
            </Button>
          </Link>}
    </motion.div>
  )
}

function AuthKeyInput({ label, value, icon }:any) {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
      .then(() => alert('Copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err))
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <Input
          type={isVisible ? "text" : "password"}
          value={value}
          className="pl-10 pr-20 bg-gray-800 border-gray-700 text-white"
          readOnly
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <Button
            type="button"
            variant="ghost"
            className="h-full px-2 text-gray-400 hover:text-white"
            onClick={toggleVisibility}
          >
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-full px-2 text-gray-400 hover:text-white"
            onClick={copyToClipboard}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  return `${Math.floor(diffInSeconds / 86400)} days ago`
}