"use client"

import { motion } from 'framer-motion'
import { Globe, Users, Rocket, Linkedin, Github } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function AboutUs() {
  const teamMembers = [
    { 
      name: 'Marceli Borowczak', 
      role: 'Founder & CEO & Lead Developer', 
      image: '/placeholder.svg?height=100&width=100',
      linkedin: 'https://www.linkedin.com/in/marceli-borowczak-b63808249/',
      github: 'https://github.com/Gravgor'
    },
    {
      name: 'Igor Tęcza',
      role: 'Creative Director',
      image: '/placeholder.svg?height=100&width=100',
      linkedin: 'https://www.linkedin.com/in/igor-tecza',
    }
  ]

  const milestones = [
    { year: '06/2024', event: 'Landmark API founded' },
    { year: '10/2024', event: 'Launched alpha version' },
  ]

  return (
    <main className="bg-gray-900 text-white">
      <section className="w-full py-20 bg-gradient-to-r from-blue-900 to-purple-900 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Landmark API
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            We're a passionate startup on a mission to revolutionize how developers access and utilize landmark data worldwide.
          </motion.p>
        </div>
      </section>

      <section className="w-full py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {milestones.map((milestone, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-4 bg-gray-700 p-4 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="bg-blue-600 p-2 rounded-full">
                    <Rocket className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{milestone.year}</h3>
                    <p className="text-gray-300">{milestone.event}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-blue-800 to-purple-800 p-8 rounded-lg shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-200 mb-4">
                We envision a world where every developer has seamless access to comprehensive landmark data, enabling the creation of innovative location-based applications and services.
              </p>
              <p className="text-gray-200">
                By providing a robust, easy-to-use API, we aim to unlock the potential of landmark information and inspire the next generation of geo-aware technologies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-blue-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800 p-6 rounded-lg text-center shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-300 mb-4">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                      <Linkedin className="h-6 w-6" />
                    </a>
                  )}
                  {member.github && (
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">
                      <Github className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Join Us on Our Journey
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            We're just getting started, and we'd love for you to be part of our story. Whether you're a developer, investor, or potential partner, let's explore the world of landmarks together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link href="/#pricing">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Access
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}