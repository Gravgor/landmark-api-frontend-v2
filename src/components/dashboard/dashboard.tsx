'use client'

import React, { Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, Settings, BarChart2, Package, Clock, Key, 
  CreditCard, Database, Eye, EyeOff, Copy 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { useApiAdventures } from '@/hooks/use-api-adventures';
import { useApiUsage } from '@/hooks/use-api-usage';
import { useAuth } from '@/hooks/use-auth';
import ApiUsageChart from '../api-usage-chart';
import { useUser } from '../providers/UserProvider';
import DashboardAdventures from './dashboard-adventures';
import DashboardSkeleton from './dashboard-skeleton';
import APIUsageStats from './api-usage-stats';

// Header Component
const DashboardHeader = () => (
  <header className="border-b border-blue-500/20 bg-[#0D0E23] py-4 sticky top-0 z-50">
    <div className="container mx-auto px-6 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <Database className="h-4 w-4 text-white" />
        </div>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="hover:bg-blue-500/10">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-blue-500/10">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </div>
  </header>
);

// Welcome Section Component
const WelcomeSection = ({ name }:any) => (
  <motion.div 
    className="mb-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-3xl font-bold mb-2">
      Welcome back, <span className="text-blue-400">{name}</span>
    </h2>
    <p className="text-gray-400">Monitor your API usage and manage your account</p>
  </motion.div>
);

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, gradient, children, action, subtitle }:any) => (
  <motion.div 
    className="bg-[#0D0E23] rounded-xl p-6 border border-blue-500/20 relative overflow-hidden hover:border-blue-500/40 transition-colors"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
    <div className="relative z-10">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <Icon className="h-6 w-6 text-blue-400" />
      </div>
      {children}
      {action}
    </div>
  </motion.div>
);

// API Key Input Component
const AuthKeyInput = ({ label, value, icon }:any) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

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
          {icon}
        </div>
        <Input
          type={isVisible ? "text" : "password"}
          value={value}
          className="pl-10 pr-20 bg-[#0A0B1A] border-gray-700 text-white focus:border-blue-500 transition-colors"
          readOnly
        />
        <div className="absolute inset-y-0 right-0 flex items-center opacity-75 group-hover:opacity-100 transition-opacity">
          <Button
            type="button"
            variant="ghost"
            className="h-full px-2 text-gray-400 hover:text-white hover:bg-blue-500/10"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-full px-2 text-gray-400 hover:text-white hover:bg-blue-500/10"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
            {copied && (
              <span className="absolute -top-8 right-0 bg-black text-white text-xs px-2 py-1 rounded">
                Copied!
              </span>
            )}
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

  useEffect(() => {
    checkAccess();
  }, [checkAccess]);

  if (!isAuthenticated || !userData) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#0A0B1A] text-white">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <WelcomeSection name={userData.name} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
              <Link href="/dashboard/subscription" className="block">
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
        </div>

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