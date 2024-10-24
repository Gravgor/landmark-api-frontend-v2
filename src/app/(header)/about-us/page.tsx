"use client"
import { motion } from 'framer-motion'
import { Database, Rocket, Globe, Shield, Zap, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'

export default function AboutUs() {
  const teamMembers = [
    { 
      name: 'Marceli Borowczak', 
      role: 'Founder & CEO & Lead Developer', 
      image: '/api/placeholder/100/100',
      linkedin: 'https://www.linkedin.com/in/marceli-borowczak-b63808249/',
      github: 'https://github.com/Gravgor'
    },
    {
      name: 'Igor Tęcza',
      role: 'Creative Director',
      image: '/api/placeholder/100/100',
      linkedin: 'https://www.linkedin.com/in/igor-tecza',
    }
  ]

  const milestones = [
    { year: '06/2024', event: 'Landmark API founded' },
    { year: '10/2024', event: 'Launched alpha version' },
  ]

  const features = [
    {
      icon: <Database className="h-6 w-6 text-blue-400" />,
      title: "Rich Data Coverage",
      description: "Comprehensive landmark information including geolocation, history, and real-time updates"
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-400" />,
      title: "High Performance",
      description: "Redis-cached responses serving 10,000+ daily requests with 99.99% uptime"
    },
    {
      icon: <Shield className="h-6 w-6 text-pink-400" />,
      title: "Enterprise Ready",
      description: "Secure authentication, rate limiting, and comprehensive usage analytics"
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <section className="w-full py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
              About Landmark API
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Enterprise-grade landmark data platform built for scale and reliability. Serving 10,000+ daily requests with 99.99% uptime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Our Journey</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4 bg-gray-800/50 p-6 rounded-lg border border-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                >
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <Rocket className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{milestone.year}</h3>
                    <p className="text-gray-400">{milestone.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 p-8 rounded-lg border border-gray-700"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
              <p className="text-gray-300 mb-4">
                We envision a world where every developer has seamless access to comprehensive landmark data, enabling the creation of innovative location-based applications and services.
              </p>
              <p className="text-gray-300">
                By providing a robust, easy-to-use API, we aim to unlock the potential of landmark information and inspire the next generation of geo-aware technologies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 p-6 rounded-lg border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-center text-white">{member.name}</h3>
                <p className="text-blue-400 text-center mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                      <Users className="h-5 w-5" />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                      <Globe className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers using Landmark API to power their applications.
            </p>
            <Link href="/pricing">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Get API Key
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}