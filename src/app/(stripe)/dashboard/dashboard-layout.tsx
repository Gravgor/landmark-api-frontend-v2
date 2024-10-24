"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Home, Globe, Code, Users, BarChart2, Package, Clock, HelpCircle, LogOut, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useUser } from "@/components/providers/UserProvider"
import LightOnboardingFlow from "@/components/dashboard/dashboard-onboarding"
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton"

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
    { icon: Package, label: "Subscription", href: "/dashboard/subscription" },
    { icon: HelpCircle, label: "Support", href: "/dashboard/support" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ]

  if (!isAuthenticated || !userData) {
    return <DashboardSkeleton />
  }

  if(userData.onboarding === true) {
    return <LightOnboardingFlow />
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      
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