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

  const leftSideOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0, 1])
  const leftSideX = useTransform(scrollYProgress, [0, 0.2, 0.4], [-100, -100, 0])
  
  const rightSideOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 0, 1])
  const rightSideX = useTransform(scrollYProgress, [0, 0.2, 0.4], [100, 100, 0])

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
      className="w-full py-20 bg-gradient-to-r from-gray-900 to-black text-white overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <motion.div
            style={{ opacity: leftSideOpacity, x: leftSideX }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Why Choose Landmark API?</h2>
            <p className="text-xl text-gray-300 mb-8">Experience the power of our cutting-edge API with these standout features:</p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <feature.icon className="h-6 w-6 text-blue-400" />
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="relative"
            style={{ opacity: rightSideOpacity, x: rightSideX }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg filter blur-xl opacity-50"></div>
            <div className="relative bg-black p-6 rounded-lg border border-gray-800">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`GET /api/v1/landmarks/name/Mount Fiji

{
  "data": [
    {
      "name": "Mount Fuji",
      "latitude": 35.3606,
      "longitude": 138.7274,
      "category": "Natural Landmark",
      "city": "Fujinomiya",
      "country": "Japan",
      "description": "Mount Fuji is the highest mountain in Japan, an active stratovolcano and one of the country's iconic symbols. It is known for its breathtaking symmetrical cone shape, spiritual significance, and as a popular destination for climbers and tourists.\n",
      "historical_significance": "Mount Fuji has been a sacred site in Japanese culture for centuries, featuring in art and literature. It was also added to the UNESCO World Heritage List in 2013 for its cultural significance\n",
      "id": "7f3fabf9-a410-4f07-ba7c-4e3723b3a194",
      "image_url": "",
      "images": [
        {
          "image_url": "https://properties-photos.s3.amazonaws.com/landmarks/7a285aaefd0dcdadcde62819d731c21af5462d64d5c4ec02ba9ceee9b/api/v1/landmarks/upload-photo/R (2)_20241016173821_ac70cbc2.jpg",
          "created_at": "2024-10-16T17:43:16.551837Z",
          "updated_at": "2024-10-16T17:43:16.551837Z"
        },
        {
          "image_url": "https://properties-photos.s3.amazonaws.com/landmarks/7a285aaefd0dcdadcde62819d731c21af5462d64d5c4ec02ba9ceee9b/api/v1/landmarks/upload-photo/R (1)_20241016173823_ba2efda8.jpg",
          "created_at": "2024-10-16T17:43:16.551837Z",
          "updated_at": "2024-10-16T17:43:16.551837Z"
        },
        {
          "image_url": "https://properties-photos.s3.amazonaws.com/landmarks/7a285aaefd0dcdadcde62819d731c21af5462d64d5c4ec02ba9ceee9b/api/v1/landmarks/upload-photo/OIP (2)_20241016173824_26bcb482.jpg",
          "created_at": "2024-10-16T17:43:16.551837Z",
          "updated_at": "2024-10-16T17:43:16.551837Z"
        },
        {
          "image_url": "https://properties-photos.s3.amazonaws.com/landmarks/7a285aaefd0dcdadcde62819d731c21af5462d64d5c4ec02ba9ceee9b/api/v1/landmarks/upload-photo/R_20241016173824_9b8d4f1e.jpg",
          "created_at": "2024-10-16T17:43:16.551837Z",
          "updated_at": "2024-10-16T17:43:16.551837Z"
        },
        {
          "image_url": "https://properties-photos.s3.amazonaws.com/landmarks/7a285aaefd0dcdadcde62819d731c21af5462d64d5c4ec02ba9ceee9b/api/v1/landmarks/upload-photo/gettyimages-502617555-170667a_20241016173824_d3a5c8fe.jpg",
          "created_at": "2024-10-16T17:43:16.551837Z",
          "updated_at": "2024-10-16T17:43:16.551837Z"
        }
      ],
      "accessibility_info": "Accessible by bus or car to the 5th Station for non-climbers. Some trails are rugged and not suitable for those with mobility issues\n",
      "opening_hours": {
        "Friday": "24/7, official climbing season July to early Semptember",
        "Monday": "24/7, official climbing season July to early Semptember",
        "Saturday": "24/7, official climbing season July to early Semptember",
        "Sunday": "24/7, official climbing season July to early Semptember",
        "Thursday": "24/7, official climbing season July to early Semptember",
        "Tuesday": "24/7, official climbing season July to early Semptember",
        "Wednesday": "24/7, official climbing season July to early Semptember"
      },
      "ticket_prices": {
        "Adult": 0,
        "Child": 0
      },
      "visitor_tips": "Climbers should prepare for rapid weather changes, start early to avoid crowds, and pack warm clothes, food, and water. July to September is the best time for climbing\n",
      "weather_info": {
        "main": {
          "temp": 4.84
        },
        "weather": [
          {
            "description": "broken clouds"
          }
        ]
      }
    }
  ],
  "meta": {
    "limit": 10,
    "offset": 0,
    "total": 25
  }
}`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}