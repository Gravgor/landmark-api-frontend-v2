"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Home, Globe, Code, Users, BarChart2, Package, Clock, HelpCircle, LogOut, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useUser } from "@/components/providers/UserProvider"
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton"
import LightOnboardingFlow from "@/components/dashboard/dashboard-onboarding"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const { isAuthenticated, logout } = useAuth()
  const { userData } = useUser()

  const toggleSidebar = () => setIsExpanded(!isExpanded)

  const sidebarVariants = {
    expanded: { width: "240px" },
    collapsed: { width: "64px" }
  }

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Globe, label: "API Endpoints", href: "/dashboard/endpoints" },
    { icon: Code, label: "API Keys", href: "/dashboard/api-keys" },
    { icon: Package, label: "Subscription", href: "/dashboard/subscription" },
    { icon: HelpCircle, label: "Support", href: "/dashboard/support" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ]

  if (!isAuthenticated || !userData) {
    return <DashboardSkeleton />
  }

  if(userData.onboarding === true) {
    return <DashboardSkeleton />
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      <motion.div
        className="flex flex-col bg-gray-900 border-r border-blue-500/20"
        initial="expanded"
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 flex items-center justify-between">
          <AnimatePresence>
            {isExpanded && (
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-bold text-blue-400"
              >
                Landmark API Dashboard
              </motion.h2>
            )}
          </AnimatePresence>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-blue-400">
            {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </Button>
        </div>

        <nav className="flex-1 mt-6">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={item.href} className="flex items-center px-4 py-2 hover:bg-blue-800/20 transition-colors rounded-lg mx-2">
                  <item.icon size={24} className="text-blue-400" />
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="ml-4"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-blue-500/20">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={"/placeholder.svg?height=40&width=40"} alt="User" />
              <AvatarFallback className={`${isExpanded === false && 'text-sm text-black'} text-sm text-black`}>
                {userData.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="ml-4 overflow-hidden"
                >
                  <p className="font-medium truncate">{userData.name}</p>
                  <p className="text-sm text-blue-400 truncate">{userData.planType} Plan</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <Button
            variant="ghost"
            className={`mt-4 flex items-center w-full px-4 py-2 text-red-400 hover:bg-red-500/20 rounded transition-colors ${
              isExpanded ? '' : 'justify-center'
            }`}
            onClick={logout}
          >
            <LogOut className="text-red-400" size={20} />
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="ml-2"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.div>
      <AnimatePresence>
        {userData.onboarding && (
          <LightOnboardingFlow />
        )}
      </AnimatePresence>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}