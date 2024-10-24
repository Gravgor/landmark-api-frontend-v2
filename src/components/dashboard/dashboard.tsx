'use client'

import React, { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Settings, BarChart2, Package, Clock, Key, 
  CreditCard, Database, Eye, EyeOff, Copy, Shield,
  Activity, Users, AlertTriangle, CheckCircle, RefreshCw
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from 'next/link';
import { useApiAdventures } from '@/hooks/use-api-adventures';
import { useApiUsage } from '@/hooks/use-api-usage';
import { useAuth } from '@/hooks/use-auth';
import ApiUsageChart from '../api-usage-chart';
import { useUser } from '../providers/UserProvider';
import DashboardAdventures from './dashboard-adventures';
import DashboardSkeleton from './dashboard-skeleton';
import APIUsageStats from './api-usage-stats';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Enhanced Header with Notifications
const DashboardHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'System Update', message: 'New features available', type: 'info' },
    { id: 2, title: 'Usage Alert', message: '80% of monthly quota reached', type: 'warning' }
  ]);

  return (
    <header className="border-b border-blue-500/20 bg-[#0D0E23] py-4 sticky top-0 z-50">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Database className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-xl font-bold">Dashboard</h1>
        </motion.div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-blue-500/10 relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </Button>
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  className="absolute right-0 mt-2 w-80 bg-[#0D0E23] border border-blue-500/20 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="p-4">
                    <h3 className="text-sm font-semibold mb-3">Notifications</h3>
                    <div className="space-y-2">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className="p-2 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-gray-400">{notification.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Button variant="ghost" size="icon" className="hover:bg-blue-500/10">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

// Enhanced Welcome Section with Status
const WelcomeSection = ({ name, status }:any) => (
  <motion.div 
    className="mb-8"
    variants={fadeIn}
    initial="initial"
    animate="animate"
  >
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold mb-2">
          Welcome back, <span className="text-blue-400">{name}</span>
        </h2>
        <p className="text-gray-400">Monitor your API usage and manage your account</p>
      </div>
      <motion.div 
        className="flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-lg"
        whileHover={{ scale: 1.02 }}
      >
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm">System Status: {status}</span>
      </motion.div>
    </div>
  </motion.div>
);

// Enhanced Stats Card with Animations
const StatsCard = ({ title, value, icon: Icon, gradient, children, action, subtitle }:any) => (
  <motion.div 
    className="bg-[#0D0E23] rounded-xl p-6 border border-blue-500/20 relative overflow-hidden group"
    variants={fadeIn}
    whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.4)' }}
    transition={{ duration: 0.2 }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
    <div className="relative z-10">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
          <motion.p 
            className="text-2xl font-bold"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.p>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <motion.div
          whileHover={{ rotate: 15 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="h-6 w-6 text-blue-400" />
        </motion.div>
      </div>
      {children}
      {action}
    </div>
  </motion.div>
);

// New System Health Component
const SystemHealth = () => {
  const healthMetrics = [
    { name: 'API Response Time', value: '45ms', status: 'good' },
    { name: 'Error Rate', value: '0.01%', status: 'good' },
    { name: 'Success Rate', value: '99.99%', status: 'good' }
  ];

  return (
    <Card className="bg-[#0D0E23] border-blue-500/20 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-blue-400" />
          <span className='text-white'>System Health</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {healthMetrics.map((metric) => (
            <motion.div
              key={metric.name}
              className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">{metric.name}</span>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <p className="text-xl font-bold text-white">{metric.value}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced API Key Input with Copy Animation
const AuthKeyInput = ({ label, value, icon }:any) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">{label}</label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <motion.div whileHover={{ rotate: 20 }}>
            {icon}
          </motion.div>
        </div>
        <Input
          type={isVisible ? "text" : "password"}
          value={value}
          className="pl-10 pr-20 bg-[#0A0B1A] border-gray-700 text-white focus:border-blue-500 transition-colors"
          readOnly
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <Button
            type="button"
            variant="ghost"
            className="h-full px-2 text-gray-400 hover:text-white hover:bg-blue-500/10"
            onClick={() => setIsVisible(!isVisible)}
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </motion.div>
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-full px-2 text-gray-400 hover:text-white hover:bg-blue-500/10"
            onClick={handleCopy}
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <Copy className="h-4 w-4" />
            </motion.div>
            <AnimatePresence>
              {copied && (
                <motion.span
                  className="absolute -top-8 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Copied!
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
export default function Dashboard() {
  const { isAuthenticated, checkAccess } = useAuth();
  const { userData } = useUser();
  const { apiUsage, loading: usageLoading } = useApiUsage(30000);
  const { adventures, loading: adventuresLoading, error: adventuresError } = useApiAdventures(30000);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Add your refresh logic here
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  if (!isAuthenticated || !userData) {
    return <DashboardSkeleton />;
  }


  return (
    <div className="min-h-screen bg-[#0A0B1A] text-white">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <WelcomeSection name={userData.name} status="Operational" />

        {/* Refresh Button */}
        <motion.div 
          className="flex justify-end mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Button
            variant="ghost"
            className="hover:bg-blue-500/10"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <APIUsageStats
            usageLoading={usageLoading}
            apiUsage={apiUsage}
          />
          
          <StatsCard
            title="Current Plan"
            value={userData.planType}
            icon={Package}
            gradient="from-purple-500/20 to-pink-500/20"
            action={
              <Link href="/dashboard/subscription">
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 transition-colors">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Plan
                </Button>
              </Link>
            }
          />
          
          <StatsCard
            title="System Status"
            value="99.99% Uptime"
            icon={Clock}
            gradient="from-pink-500/20 to-blue-500/20"
            subtitle="All systems operational"
          />
        </motion.div>

        {/* System Health Section */}
        <SystemHealth />

        {/* API Key Section */}
        <Card className="bg-[#0D0E23] border-blue-500/20 mb-8 hover:border-blue-500/40 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-blue-400" />
              <span className="text-white">API Credentials</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AuthKeyInput
              label="API Key"
              value={userData.apiKey}
              icon={<Key className="h-4 w-4 text-blue-400" />}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
              <DashboardAdventures 
                adventures={adventures} 
                loading={adventuresLoading} 
                error={adventuresError}
              />
         

         
              {adventuresLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 w-48 bg-gray-700 rounded"></div>
                    <div className="h-32 w-full bg-gray-700 rounded"></div>
                  </div>
                </div>
              ) : adventuresError ? (
                <p className="text-red-400">Error: {adventuresError}</p>
              ) : (
                <ApiUsageChart adventures={adventures} />
              )}
        </div>
      </main>
    </div>
  );
}