"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, Clock, Shield, Scale, Cloud, Terminal, Bolt } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Database,
      title: "Rich Data Coverage",
      description: "Comprehensive landmark information including geolocation, history, and real-time updates",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Scale,
      title: "High Performance",
      description: "Redis-cached responses serving 10,000+ daily requests with 99.99% uptime",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Terminal,
      title: "Developer Friendly",
      description: "Clear documentation, robust SDKs, and seamless API integration",
      gradient: "from-pink-500 to-purple-600"
    },
    {
      icon: Cloud,
      title: "Live Updates",
      description: "Real-time weather, crowd size, and transport information",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: Shield,
      title: "Enterprise Ready",
      description: "Secure authentication, rate limiting, and usage analytics",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Bolt,
      title: "Fast Integration",
      description: "Quick setup with comprehensive documentation and examples",
      gradient: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <section className="relative w-full py-20 overflow-hidden bg-gray-900">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black opacity-90" />
      
      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          >
            Why Choose Landmark API?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Enterprise-grade landmark data platform built for scale and reliability
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative p-6 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="p-3 w-12 h-12 rounded-lg bg-gray-800 mb-4">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-300">
            Get API Key
          </button>
          <button className="px-8 py-3 ml-4 border border-gray-700 hover:border-gray-600 text-gray-300 rounded-lg font-medium transition-colors duration-300">
            View Docs
          </button>
        </motion.div>
      </div>
    </section>
  );
}