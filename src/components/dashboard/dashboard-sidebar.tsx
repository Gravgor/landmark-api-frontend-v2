"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Home, Activity, Globe, Box, CreditCard, HelpCircle, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserData {
  name: string
  plan: string
  avatar: string
}

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<UserData | null>(null)

  const toggleSidebar = () => setIsExpanded(!isExpanded)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check')
        if (response.ok) {
          setIsAuthenticated(true)
          const userData = await fetch('/api/user/me')
          if (userData.ok) {
            const user = await userData.json()
            setUserData(user)
          }
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const sidebarVariants = {
    expanded: { width: "240px" },
    collapsed: { width: "64px" }
  }

  const menuItems = [
    { icon: Home, label: "Dashboard" },
    { icon: Activity, label: "API Usage" },
    { icon: Globe, label: "API Endpoints" },
    { icon: Box, label: "API Adventures" },
    { icon: CreditCard, label: "Subscription" },
    { icon: HelpCircle, label: "Help & Support" },
  ]

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-[#1a2b6d]">Loading...</div>
  }

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center h-screen bg-[#1a2b6d]">Please log in to access the dashboard.</div>
  }

  return (
    <motion.div
      className="flex flex-col h-screen bg-[#1a2b6d] text-white"
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
              className="text-xl font-bold text-[#4d7cfe]"
            >
              API Dashboard
            </motion.h2>
          )}
        </AnimatePresence>
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-[#2a3b7d] transition-colors">
          {isExpanded ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>

      <nav className="flex-1 mt-6">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="#" className="flex items-center px-4 py-2 hover:bg-[#2a3b7d] transition-colors rounded-lg mx-2">
                <item.icon size={24} className="text-[#4d7cfe]" />
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
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className="p-4">
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Avatar>
            <AvatarImage src={userData?.avatar || "/placeholder.svg?height=32&width=32"} alt="User" />
            <AvatarFallback>{userData?.name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-4"
              >
                <p className="font-medium">{userData?.name || 'User'}</p>
                <p className="text-sm text-[#4d7cfe]">{userData?.plan || 'Basic'} Plan</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 flex items-center w-full px-4 py-2 bg-[#4d7cfe] hover:bg-[#3a69eb] rounded transition-colors"
        >
          <LogOut size={20} />
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
        </motion.button>
      </div>
    </motion.div>
  )
}