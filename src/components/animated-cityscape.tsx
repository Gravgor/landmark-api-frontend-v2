import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCityscape: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="stars absolute inset-0"></div>
      <svg
        className="cityscape absolute bottom-0 left-0 right-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="cityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(15, 23, 42, 0.9)" />
            <stop offset="100%" stopColor="rgba(15, 23, 42, 0.5)" />
          </linearGradient>
        </defs>
        
        {/* Generic cityscape */}
        <path 
          className="cityscape-path"
          d="M0,320 L0,280 L60,280 L60,260 L120,260 L120,220 L180,220 L180,280 L240,280 L240,180 L280,180 L280,240 L340,240 L340,200 L400,200 L400,260 L460,260 L460,180 L520,180 L520,220 L580,220 L580,280 L640,280 L640,240 L700,240 L700,200 L760,200 L760,180 L820,180 L820,240 L880,240 L880,280 L940,280 L940,220 L1000,220 L1000,180 L1060,180 L1060,240 L1120,240 L1120,200 L1180,200 L1180,260 L1240,260 L1240,220 L1300,220 L1300,280 L1360,280 L1360,240 L1420,240 L1420,320 L1440,320 Z"
          fill="url(#cityGradient)"
          stroke="rgba(59, 130, 246, 0.5)"
          strokeWidth="1"
        />
        
        {/* Eiffel Tower */}
        <motion.path
          d="M200,320 L220,180 L240,320 M210,280 L230,280 M205,260 L235,260"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Statue of Liberty */}
        <motion.path
          d="M800,320 L800,200 L810,180 L820,200 L820,320 M805,200 L815,200"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
        
        {/* Big Ben */}
        <motion.path
          d="M1100,320 L1100,180 L1120,180 L1120,320 M1105,180 L1115,160 L1115,180"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
        
        {/* Sydney Opera House */}
        <motion.path
          d="M500,320 Q520,280 540,320 Q560,280 580,320"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
        
        {/* Burj Khalifa */}
        <motion.path
          d="M1300,320 L1300,140 L1310,130 L1320,140 L1320,320"
          stroke="rgba(59, 130, 246, 0.8)"
          strokeWidth="2"
          fill="none"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
        />
      </svg>
    </div>
  );
};

export default AnimatedCityscape;
