'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, User, Lock, Eye, EyeOff, Mail, ChevronRight, Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { useAuth } from '@/hooks/use-auth'
import { useRouter, useSearchParams } from 'next/navigation'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          <span className="mr-2">Submit</span>
          <ChevronRight className="w-5 h-5" />
        </>
      )}
    </motion.button>
  )
}

export default function FinalEnhancedAuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [animatingLandmarks, setAnimatingLandmarks] = useState<{ x: number; y: number; scale: number }[]>([])
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()



  useEffect(() => {
    const landmarks = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
    }))
    setAnimatingLandmarks(landmarks)
  }, [])

  const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login'
  const payload = isSignUp ? {name, email, password} : {email, password}
  const loginSearchParam = searchParams.get("login")
  if(loginSearchParam) {
    setIsSignUp(false)
  }

  async function handleSubmit(formData: FormData) {
    if (isSignUp && !acceptTerms) {
      alert('Please accept the terms of service')
      return
    }
    const request = await fetch(`${endpoint}`,{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    }) 
    if (request.ok) {
        if(!isSignUp) {
            await login()
            router.push('/dashboard')
        } else {
            const request = await fetch(`/api/auth/login`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({email, password})
            })
            if(request.ok) {
                router.push('/dashboard')
            }
        }
    }
  }

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.2 } },
  }

  const inputVariants = {
    focus: { scale: 1.05, transition: { type: 'spring', stiffness: 300, damping: 17 } },
    blur: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 17 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {animatingLandmarks.map((landmark, index) => (
          <motion.div
            key={index}
            className="absolute text-white opacity-20"
            style={{ left: `${landmark.x}%`, top: `${landmark.y}%` }}
            animate={{
              y: [0, -20, 0],
              scale: [landmark.scale, landmark.scale * 1.1, landmark.scale],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 3 + 2,
              ease: 'easeInOut',
            }}
          >
            <MapPin size={24 + landmark.scale * 24} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-white bg-opacity-10 p-8 rounded-lg shadow-2xl max-w-md w-full backdrop-blur-md relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
        >
          <MapPin className="w-16 h-16 text-blue-400" />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isSignUp ? 'signup' : 'signin'}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-4xl font-bold text-white mb-6 text-center">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <form action={handleSubmit} className="space-y-4">
              {isSignUp && (
                <motion.div variants={inputVariants} whileFocus="focus">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-10 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Full Name"
                      required={isSignUp}
                    />
                  </div>
                </motion.div>
              )}
              <motion.div variants={inputVariants} whileFocus="focus">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-10 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Email"
                    required
                  />
                </div>
              </motion.div>
              <motion.div variants={inputVariants} whileFocus="focus">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-10 py-2 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="flex items-center space-x-2 text-white">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm">
                      I accept the{' '}
                      <a href="#" className="text-blue-400 hover:underline">
                        Terms of Service
                      </a>
                    </span>
                  </label>
                </motion.div>
              )}
              <SubmitButton />
            </form>
          </motion.div>
        </AnimatePresence>

        <motion.p
          className="mt-6 text-center text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-1 text-blue-400 hover:underline focus:outline-none"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </motion.p>
      </motion.div>
    </div>
  )
}