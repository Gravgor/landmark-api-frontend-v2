'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Key, Zap, ChevronDown, Globe, Code, Users } from "lucide-react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useRef, useEffect } from "react"

export default function ModernLandmarkAPILanding() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)
  const features = [
    { icon: Globe, title: "Global Coverage", description: "Access landmark data from all around the world" },
    { icon: Search, title: "Advanced Search", description: "Powerful search capabilities to find exactly what you need" },
    { icon: Code, title: "Developer Friendly", description: "Easy to integrate with clear documentation" },
    { icon: Users, title: "User Management", description: "Robust user authentication and authorization" },

  ]

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-4 lg:px-6 h-14 flex items-center border-b border-white/10 backdrop-blur-md bg-black/50 fixed w-full z-50"
      >
        <Link className="flex items-center justify-center" href="#">
          <MapPin className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">Landmark API</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-gray-300 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-gray-300 transition-colors" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-gray-300 transition-colors" href="#docs">
            Docs
          </Link>
        </nav>
      </motion.header>
      <main className="flex-1">
        <section ref={ref} className="w-full h-screen flex items-center justify-center relative overflow-hidden">
          <motion.div
            style={{ y, opacity }}
            className="absolute inset-0 w-full h-full bg-black opacity-50"
          />
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                Discover the World's Landmarks
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl lg:text-2xl">
                A powerful RESTful API service for accessing global landmark data
              </p>
              <div className="space-x-4">
                <Button className="bg-white text-black hover:bg-gray-200 transition-colors text-lg px-8 py-6">
                  Get Started
                </Button>
                <Button variant="outline" className="text-black border-white hover:bg-gray-200 transition-colors text-lg px-8 py-6">
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="h-8 w-8" />
            </motion.div>
          </div>
        </section>
        <section id="features" className="w-full py-20 md:py-32 bg-white text-black">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Powerful Features</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center space-y-2 p-6 rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-lg"
                >
                  <feature.icon className="h-12 w-12 mb-4 text-blue-600" />
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm text-gray-600 text-center">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-20 md:py-32 bg-gradient-to-r from-gray-900 to-black text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Why Choose Landmark API?</h2>
                <p className="text-xl text-gray-300 mb-8">Experience the power of our cutting-edge API with these standout features:</p>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: currentFeature === index ? 1 : 0.5, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center space-x-3"
                    >
                      <feature.icon className="h-6 w-6 text-blue-400" />
                      <span>{feature.title}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg filter blur-xl opacity-50"></div>
                <div className="relative bg-black p-6 rounded-lg border border-gray-800">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{`
GET /api/v1/landmarks?country=France&limit=5

{
  "landmarks": [
    {
      "id": "eiffel-tower",
      "name": "Eiffel Tower",
      "location": {
        "lat": 48.8584,
        "lon": 2.2945
      },
      "description": "Iconic iron lattice tower on the Champ de Mars in Paris."
    },
    // ... more landmarks
  ],
  "total": 1384,
  "page": 1,
  "limit": 5
}
                    `}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-20 md:py-32 bg-gradient-to-b from-gray-100 to-white text-black">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Flexible Pricing Plans</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex flex-col p-6 bg-white text-black shadow-xl rounded-lg justify-between border border-gray-200 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-semibold">Popular</div>
                <div>
                  <h3 className="text-2xl font-bold text-center mb-4">Free</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <svg
                        className=" w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Basic landmark info
                    </li>
                    <li className="flex items-center">
                      <svg
                        className=" w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      100 requests / day
                    </li>
                    <li className="flex items-center text-gray-500">
                      <svg
                        className=" w-4 h-4 mr-2 text-gray-500"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                      Advanced features
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Get Started</Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex flex-col p-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl rounded-lg justify-between border border-blue-500"
              >
                <div>
                  <h3 className="text-2xl font-bold text-center mb-4">Pro</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <svg
                        className=" w-4 h-4 mr-2 text-white"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      All Free features
                    </li>
                    <li className="flex items-center">
                      <svg
                        className=" w-4 h-4 mr-2 text-white"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      10,000 requests / day
                    </li>
                    <li className="flex items-center">
                      <svg
                        className=" w-4 h-4 mr-2 text-white"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Advanced search
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">Upgrade to Pro</Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex flex-col p-6 bg-white text-black shadow-xl rounded-lg justify-between border border-gray-200"
              >
                <div>
                  <h3  className="text-2xl font-bold text-center mb-4">Enterprise</h3>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center">
                      <svg
                        className=" w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      All Pro features
                    </li>
                    <li className="flex items-center">
                      <svg
                        className=" w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Unlimited requests
                    </li>
                    <li className="flex items-center">
                      <svg
                        className=" w-4 h-4 mr-2 text-green-500"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Dedicated support
                    </li>
                  </ul>
                </div>
                <Button className="w-full bg-black text-white hover:bg-gray-800">Contact Sales</Button>
              </motion.div>
            </div>
          </div>
        </section>
        <section id="docs" className="w-full py-20 md:py-32 bg-gray-100 text-black">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">API Documentation</h2>
            <motion.div
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
              variants={{
                visible: { opacity: 1, height: "auto" },
                hidden: { opacity: 0, height: 0 }
              }}
              transition={{ duration: 0.3 }}
              className="space-y-4 overflow-hidden"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Authentication</h3>
                <p className="text-gray-600">
                  Use JWT-based authentication to secure your API requests. Include the JWT token in the Authorization header.
                </p>
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  <code>
                    Authorization: Bearer your_jwt_token_here
                  </code>
                </pre>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Endpoints</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>GET /api/v1/landmarks - Retrieve all landmarks</li>
                  <li>GET /api/v1/landmarks/{'{id}'} - Get landmark by ID</li>
                  <li>GET /api/v1/landmarks/country/{'{country}'} - Get landmarks by country</li>
                  <li>GET /api/v1/landmarks/name/{'{name}'} - Search landmarks by name</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Example Request</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  <code>{`
curl -X GET "https://api.landmarkapi.com/v1/landmarks?country=France&limit=5" \\
     -H "Authorization: Bearer your_jwt_token_here" \\
     -H "Content-Type: application/json"
                  `}</code>
                </pre>
              </div>
            </motion.div>
            <div className="mt-8 text-center">
              <Button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 text-white hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                {isOpen ? "Hide" : "Show"} Documentation
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-20 md:py-32 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Ready to Get Started?</h2>
                <p className="text-xl mb-8">Join thousands of developers already using Landmark API to power their applications.</p>
                <Button className="bg-white text-blue-600 hover:bg-gray-100 transition-colors text-lg px-8 py-3">
                  Sign Up Now
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-lg filter blur-xl opacity-20"></div>
                <div className="relative bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <h3 className="text-xl font-bold mb-4">Quick Start Guide</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>Sign up for an API key</li>
                    <li>Install our SDK</li>
                    <li>Make your first API call</li>
                    <li>Explore our documentation</li>
                    <li>Build amazing things!</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-black text-white border-t border-gray-800">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <MapPin className="h-6 w-6 mr-2" />
            <span className="font-bold text-lg">Landmark API</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm hover:underline underline-offset-4" href="#">
              Privacy Policy
            </Link>
            <Link className="text-sm hover:underline underline-offset-4" href="#">
              Contact Us
            </Link>
          </nav>
        </div>
        <div className="container px-4 md:px-6 mt-4 text-center text-gray-400 text-sm">
          © 2024 Landmark API. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
