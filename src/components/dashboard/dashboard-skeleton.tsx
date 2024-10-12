import { motion } from 'framer-motion'
import { BarChart2, Globe, Package, Clock, Key, Code, Home, Settings, HelpCircle, LogOut } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-900 to-black text-white">
      <SkeletonSidebar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-3/4 mb-8 bg-gray-700" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {['API Calls', 'Landmarks Discovered', 'Current Plan', 'API Uptime'].map((title, index) => (
            <SkeletonCard key={index} title={title} icon={[BarChart2, Globe, Package, Clock][index]} />
          ))}
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
              {[...Array(4)].map((_, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-full">
                    <Skeleton className="h-4 w-3/4 mb-2 bg-gray-700" />
                    <Skeleton className="h-3 w-1/2 mb-1 bg-gray-700" />
                    <Skeleton className="h-2 w-5/6 bg-gray-700" />
                  </div>
                  <Skeleton className="h-6 w-16 bg-gray-700 rounded-full" />
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
            <div className="h-64 flex items-center justify-center">
              <Skeleton className="h-full w-full bg-gray-700" />
            </div>
          </motion.div>
        </div>
        <motion.div
          className="bg-gray-900 rounded-lg p-6 shadow-xl border border-blue-500/20 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Authentication Keys & Tokens 🔐</h2>
          <div className="space-y-6">
            <SkeletonAuthKeyInput label="API Key" icon={<Key className="h-4 w-4 text-blue-500" />} />
            <SkeletonAuthKeyInput label="Access Token" icon={<Code className="h-4 w-4 text-blue-500" />} />
          </div>
          <div className="mt-6">
            <Skeleton className="h-10 w-full bg-gray-700" />
          </div>
        </motion.div>
      </main>
    </div>
  )
}

function SkeletonSidebar() {
  return (
    <motion.div
      className="w-64 bg-gray-900 border-r border-blue-500/20 p-4"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Skeleton className="h-8 w-3/4 mb-8 bg-gray-700" />
      <nav className="space-y-2">
        {[Home, Globe, Key, Package, HelpCircle, Settings].map((Icon, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-4 p-2 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Icon className="h-5 w-5 text-blue-500" />
            <Skeleton className="h-4 w-24 bg-gray-700" />
          </motion.div>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <motion.div
          className="flex items-center space-x-4 p-2 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
          <div className="flex-1">
            <Skeleton className="h-4 w-20 mb-1 bg-gray-700" />
            <Skeleton className="h-3 w-16 bg-gray-700" />
          </div>
        </motion.div>
        <motion.div
          className="mt-4 flex items-center space-x-4 p-2 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <LogOut className="h-5 w-5 text-red-500" />
          <Skeleton className="h-4 w-16 bg-gray-700" />
        </motion.div>
      </div>
    </motion.div>
  )
}

function SkeletonCard({ title, icon: Icon }:any) {
  return (
    <motion.div 
      className="bg-gray-900 rounded-lg p-6 shadow-xl border border-blue-500/20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 mb-1">{title}</p>
          <Skeleton className="h-8 w-24 bg-gray-700" />
        </div>
        <Icon className="h-6 w-6 text-blue-500" />
      </div>
      {title === 'API Calls' && <Progress value={0} className="mt-2" />}
      <Skeleton className="h-4 w-3/4 mt-2 bg-gray-700" />
    </motion.div>
  )
}

function SkeletonAuthKeyInput({ label, icon }:any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <Skeleton className="h-10 w-full bg-gray-700" />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <Skeleton className="h-8 w-8 mx-1 bg-gray-600" />
          <Skeleton className="h-8 w-8 mx-1 bg-gray-600" />
        </div>
      </div>
    </div>
  )
}