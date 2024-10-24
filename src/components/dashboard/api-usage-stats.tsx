import { useEffect, useState } from 'react';
import { BarChart2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";

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

const APIUsageStats = ({ usageLoading, apiUsage }:any) => {
  const [timeUntilReset, setTimeUntilReset] = useState('');
  
  useEffect(() => {
    const calculateTimeUntilReset = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      return `${hours}h ${minutes}m`;
    };
    
    // Initial calculation
    setTimeUntilReset(calculateTimeUntilReset());
    
    // Update every minute
    const interval = setInterval(() => {
      setTimeUntilReset(calculateTimeUntilReset());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <StatsCard
      title="API Usage"
      value={usageLoading ? 'Loading...' : `${apiUsage?.currentCount.toLocaleString()} / ${apiUsage?.limit.toLocaleString()}`}
      icon={BarChart2}
      gradient="from-blue-500/20 to-purple-500/20"
      subtitle={
        <div className="flex items-center gap-1 mt-1">
          <Clock className="h-3 w-3 text-gray-400" />
          <span>Resets in {timeUntilReset}</span>
        </div>
      }
    >
      {apiUsage && (
        <Progress
          value={(apiUsage.currentCount / apiUsage.limit) * 100}
          className="mt-4 bg-gray-700"
        />
      )}
    </StatsCard>
  );
};

export default APIUsageStats;