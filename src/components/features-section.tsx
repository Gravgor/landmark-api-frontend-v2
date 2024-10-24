"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, Clock, Shield, Scale, Cloud, Terminal, Bolt, MapPin, Globe, Mountain, Info, Building, Timer, Ticket, CloudSun, Accessibility, History, Users } from 'lucide-react';

export default function FeatureAPISection() {
  const [activeTab, setActiveTab] = useState('overview');
  
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

  const apiResponse = {
    name: "Mount Fuji",
    latitude: 35.3606,
    longitude: 138.7274,
    city: "Fujinomiya",
    country: "Japan",
    description: "Mount Fuji is the highest mountain in Japan, an active stratovolcano and one of the country's iconic symbols. It is known for its breathtaking symmetrical cone shape, spiritual significance, and as a popular destination for climbers and tourists.",
    historical_significance: "Mount Fuji has been a sacred site in Japanese culture for centuries, featuring in art and literature. It was also added to the UNESCO World Heritage List in 2013 for its cultural significance",
    accessibility_info: "Accessible by bus or car to the 5th Station for non-climbers. Some trails are rugged and not suitable for those with mobility issues",
    visitor_tips: "Climbers should prepare for rapid weather changes, start early to avoid crowds, and pack warm clothes, food, and water. July to September is the best time for climbing",
    weather_info: {
      main: { temp: 6.27 },
      weather: [{ description: "light rain" }]
    },
    opening_hours: {
      Monday: "24/7, official climbing season July to early September",
    },
    ticket_prices: {
      Adult: "0",
      Child: "0"
    }
  };

  const responseFields = {
    overview: [
      {
        icon: Mountain,
        label: "Name",
        value: apiResponse.name,
        gradient: "from-blue-500 to-blue-600"
      },
      {
        icon: MapPin,
        label: "Location",
        value: `${apiResponse.city}, ${apiResponse.country}`,
        gradient: "from-purple-500 to-purple-600"
      },
      {
        icon: CloudSun,
        label: "Current Weather",
        value: `${apiResponse.weather_info.main.temp}°C, ${apiResponse.weather_info.weather[0].description}`,
        gradient: "from-blue-400 to-blue-600"
      },
      {
        icon: Ticket,
        label: "Entry",
        value: "Free admission",
        gradient: "from-pink-500 to-purple-600"
      }
    ],
    details: [
      {
        icon: History,
        label: "Historical Significance",
        value: apiResponse.historical_significance,
        gradient: "from-indigo-500 to-purple-500"
      },
      {
        icon: Accessibility,
        label: "Accessibility",
        value: apiResponse.accessibility_info,
        gradient: "from-purple-400 to-pink-500"
      },
      {
        icon: Users,
        label: "Visitor Tips",
        value: apiResponse.visitor_tips,
        gradient: "from-blue-500 to-blue-600"
      },
      {
        icon: Timer,
        label: "Opening Hours",
        value: apiResponse.opening_hours.Monday,
        gradient: "from-purple-500 to-purple-600"
      }
    ]
  };

  return (
    <section className="relative w-full py-20 overflow-hidden bg-gray-900">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black opacity-90" />
      
      <div className="relative container mx-auto px-4">
        {/* Features Section */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
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

        {/* API Response Section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          >
            Experience Rich Data
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto font-mono flex items-center justify-center space-x-4"
          >
            <code className="bg-gray-800 px-4 py-2 rounded-lg">
              GET /api/v1/landmarks/name/Mount Fuji
            </code>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-lg p-1 flex space-x-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === 'overview' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === 'details' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === 'json' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Raw JSON
            </button>
          </div>
        </div>

        {/* Response Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          {(activeTab === 'overview' || activeTab === 'details') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {responseFields[activeTab].map((field, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative p-6 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-r ${field.gradient} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`} />
                    <div className="relative z-10">
                      <div className="p-3 w-12 h-12 rounded-lg bg-gray-800 mb-4">
                        <field.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-400 mb-2">{field.label}</h3>
                      <p className="text-white text-lg font-medium">{field.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {activeTab === 'json' && (
            <div className="relative p-6 bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-gray-500">JSON Response</span>
              </div>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
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