'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Search, Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-xl">Landmark API</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              {['Features', 'Pricing', 'Docs'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm font-medium hover:text-blue-400 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
            <Button className='bg-white text-black hover:bg-white-700'>Log In</Button>
              <Button className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700">
                Sign Up
              </Button>
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-16"
          >
            <nav className="container mx-auto px-4 py-8 flex flex-col space-y-6">
              {['Features', 'Pricing', 'Docs'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-2xl font-medium hover:text-blue-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Button className="w-full mt-4">Log In</Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Sign Up</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-50" />
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter">
                Discover the World's
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Landmarks
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-gray-300">
                Access global landmark data with our powerful RESTful API service. Build amazing location-based experiences.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="w-full sm:w-auto text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
                <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-3">
                  View Documentation
                </Button>
              </div>
              <div className="max-w-xl mx-auto mt-8">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search for landmarks..."
                    className="w-full pl-10 pr-4 py-3 rounded-full bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="h-8 w-8 text-white/60" />
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}