'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Globe, Search, Code, Users } from "lucide-react"

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0, 1])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.4], [50, 50, 0])

  const features = [
    { icon: Globe, title: "Global Coverage", description: "Access landmark data from all around the world" },
    { icon: Search, title: "Advanced Search", description: "Powerful search capabilities to find exactly what you need" },
    { icon: Code, title: "Developer Friendly", description: "Easy to integrate with clear documentation" },
    { icon: Users, title: "User Management", description: "Robust user authentication and authorization" },
  ]

  return (
    <section 
      id='features'
      ref={sectionRef}
      className="w-full py-12 md:py-20 bg-gradient-to-r from-gray-900 to-black text-white overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          style={{ opacity, y }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 md:space-y-12"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Why Choose Landmark API?</h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Experience the power of our cutting-edge API with these standout features:</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center text-center space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <feature.icon className="h-12 w-12 text-blue-400" />
                <h3 className="font-semibold text-xl">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative mt-12 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-50"></div>
            <div className="relative bg-black p-4 rounded-lg border border-gray-800">
              <pre className="text-sm text-gray-300 overflow-x-auto max-h-60 md:max-h-80">
                <code>{`GET /api/v1/landmarks/name/Mount Fuji

{
  "data": [
    {
      "name": "Mount Fuji",
      "latitude": 35.3606,
      "longitude": 138.7274,
      "category": "Natural Landmark",
      "country": "Japan",
      "description": "Mount Fuji is the highest mountain in Japan, an active stratovolcano and one of the country's iconic symbols.",
      "id": "7f3fabf9-a410-4f07-ba7c-4e3723b3a194",
      "images": [
        {
          "image_url": "https://example.com/mount-fuji-1.jpg",
          "created_at": "2024-10-16T17:43:16.551837Z"
        },
        {
          "image_url": "https://example.com/mount-fuji-2.jpg",
          "created_at": "2024-10-16T17:43:16.551837Z"
        }
      ],
      "accessibility_info": "Accessible by bus or car to the 5th Station for non-climbers.",
      "visitor_tips": "Climbers should prepare for rapid weather changes and pack warm clothes, food, and water."
    }
  ],
  "meta": {
    "total": 1
  }
}`}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}