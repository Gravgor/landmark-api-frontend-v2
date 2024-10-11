'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Search, Code, Users, BarChart2, Package, Clock, LogOut, ChevronDown, Bell, Settings, Copy, Eye, EyeOff, Key } from 'lucide-react'
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

export default function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Mock user data - replace with actual data fetching in a real application
  const userData = {
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'Pro',
    apiCalls: 8750,
    apiLimit: 10000,
    landmarks: 1250,
    apiKey: 'lmk_1234567890abcdef',
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      <header className="bg-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Globe className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold">Landmark API</span>
          </motion.div>
          <nav className="hidden md:flex space-x-6">
            {['Dashboard', 'Docs', 'Support'].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors">
                  {item}
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <motion.div
                    className="flex h-full w-full items-center justify-center rounded-full bg-blue-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {userData.name.charAt(0)}
                  </motion.div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userData.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {userData.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </div>
      </header>

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
            value={userData.apiCalls}
            icon={BarChart2}
            description={`${userData.apiLimit.toLocaleString()} limit`}
          >
            <Progress value={(userData.apiCalls / userData.apiLimit) * 100} className="mt-2" />
          </DashboardCard>
          <DashboardCard
            title="Landmarks Discovered"
            value={userData.landmarks}
            icon={Globe}
            description="Keep exploring!"
          />
          <DashboardCard
            title="Current Plan"
            value={userData.plan}
            icon={Package}
            description="Unlock more with Pro+"
          />
          <DashboardCard
            title="API Uptime"
            value="99.99%"
            icon={Clock}
            description="Rock-solid reliability"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            className="bg-gray-900 rounded-lg p-6 shadow-xl border border-blue-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Recent API Adventures 🚀</h2>
            <div className="space-y-4">
              {[
                { endpoint: '/landmarks/nearby', status: 'Success', time: '2 minutes ago', message: 'Found 5 landmarks near the Eiffel Tower' },
                { endpoint: '/landmarks/search', status: 'Success', time: '15 minutes ago', message: 'Searched for "ancient ruins" in Greece' },
                { endpoint: '/landmarks/details', status: 'Error', time: '1 hour ago', message: 'Oops! Landmark ID not found' },
                { endpoint: '/landmarks/popular', status: 'Success', time: '3 hours ago', message: 'Retrieved top 10 landmarks in Japan' },
              ].map((call, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div>
                    <p className="font-medium">{call.endpoint}</p>
                    <p className="text-sm text-gray-400">{call.time}</p>
                    <p className="text-xs text-gray-500 mt-1">{call.message}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    call.status === 'Success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {call.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            className="bg-gray-900 rounded-lg p-6 shadow-xl border border-blue-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Your API Journey 📈</h2>
            <div className="h-64 flex items-center justify-center text-gray-500">
              [Imagine an awesome, interactive chart here showing your API usage over time!]
            </div>
          </motion.div>
        </div>
        <motion.div
          className="bg-gray-900 rounded-lg p-6 shadow-xl border border-blue-500/20"
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
            <AuthKeyInput
              label="Access Token"
              value={userData.accessToken}
              icon={<Code className="h-4 w-4 text-blue-500" />}
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

function DashboardCard({ title, value, icon: Icon, description, children }:any) {
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