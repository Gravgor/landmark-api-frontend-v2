'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, ArrowRight, Loader2, CheckCircle, XCircle } from "lucide-react"
import Link from 'next/link'
import { toast } from "@/hooks/use-toast"

export default function CTASection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0])

  const floatY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -20]
  )

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('https://api.landmark-api.com/auth/register-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to create account')
      }

      setIsSuccess(true)
      toast({
        title: "Account created successfully!",
        description: "Please check your email for further instructions.",
        duration: 5000,
      })
    } catch (error) {
      console.error('Error creating account:', error)
      toast({
        title: "Error creating account",
        description: "Please try again later or contact support.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.section 
    id="cta"
      ref={sectionRef}
      style={{ opacity }}
      className="w-full py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <motion.div
            style={{ scale, y }}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4"
            >
              Ready to Explore the World's Landmarks?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl mb-8 text-gray-300"
            >
              Join thousands of developers already using Landmark API to power their applications. Start your journey today!
            </motion.p>
            <motion.form 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
              onSubmit={handleSubmit}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                className="bg-white text-blue-900 hover:bg-gray-200 transition-colors group"
                disabled={isLoading || isSuccess}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : isSuccess ? (
                  <CheckCircle className="mr-2 h-4 w-4" />
                ) : (
                  <>
                    Get Started
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </>
                )}
              </Button>
            </motion.form>
            <motion.p 
              variants={itemVariants}
              className="mt-4 text-sm text-gray-400"
            >
              {isSuccess 
                ? "Account created! Please check your email for further instructions." 
                : "No credit card required. Start with our free plan and upgrade anytime."}
            </motion.p>
          </motion.div>
          <motion.div 
            className="relative"
            style={{ y: floatY }}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div 
              className="absolute inset-0 bg-blue-500 rounded-lg filter blur-xl"
              animate={isInView ? {
                opacity: [0.2, 0.3, 0.2],
                scale: [1, 1.05, 1],
              } : {}}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="relative bg-gray-900 p-8 rounded-lg border border-gray-700"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex items-center mb-6">
                <MapPin className="h-8 w-8 text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold">Quick Start Guide</h3>
              </div>
              <ol className="list-decimal list-inside space-y-3 text-gray-300">
                {[
                  "Sign up for an API key",
                  "Install our SDK",
                  "Make your first API call",
                  "Explore our documentation",
                  "Build amazing location-based experiences!"
                ].map((step, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                  >
                    {step}
                  </motion.li>
                ))}
              </ol>
             <Link href="/docs">
               <Button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 group">
                  View Documentation
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}