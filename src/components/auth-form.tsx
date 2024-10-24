"use client"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, User, Lock, Eye, EyeOff, Mail, ChevronRight, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { createAccount } from '@/app/actions/actions';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '@/hooks/use-auth';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const SubmitButton = ({ pending, children }:any) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center"
    type="submit"
    disabled={pending}
  >
    {pending ? (
      <Loader2 className="w-5 h-5 animate-spin" />
    ) : (
      <>
        <span className="mr-2">{children}</span>
        <ChevronRight className="w-5 h-5" />
      </>
    )}
  </motion.button>
);

const InputField = ({ icon: Icon, ...props }:any) => (
  <motion.div
    whileFocus={{ scale: 1.02 }}
    className="relative"
  >
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      {...props}
      className="w-full px-10 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    />
  </motion.div>
);

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [pending, setPending] = useState(false);
  const router = useRouter()
  const {login} = useAuth()
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSignUp && !acceptTerms) {
      alert('Please accept the terms of service')
      return
    }

    if (isSignUp) {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('plan', selectedPlan.toLowerCase())

      try {
        const result = await createAccount(formData)

        if (result.success) {
          const stripe = await stripePromise
          if (!stripe) {
            throw new Error('Stripe failed to initialize')
          }
          const { error } = await stripe.redirectToCheckout({
            sessionId: result.sessionId,
          })
          if (error) {
            console.error('Stripe redirect error:', error)
          }
        } else {
          console.error('Account creation failed:', result.message)
        }
      } catch (error) {
        console.error('Error during account creation:', error)
      }
    } else {
      try {
        const loginResponse = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        if (loginResponse.ok) {
          await login()
          router.push('/dashboard')
        } else {
          const errorData = await loginResponse.json()
          console.error('Login failed:', errorData.message)
        }
      } catch (error) {
        console.error('Error during login:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900/50 backdrop-blur-lg border-gray-800">
        <CardHeader className="space-y-1 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto mb-4"
          >
            <MapPin className="w-12 h-12 text-blue-500" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-white">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <InputField
                    icon={User}
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e:any) => setName(e.target.value)}
                    required={isSignUp}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <InputField
              icon={Mail}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e:any) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <InputField
                icon={Lock}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e:any) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {isSignUp && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="free">Free Plan</option>
                  <option value="pro">Pro Plan - $49/month</option>
                </select>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">
                    I accept the Terms of Service
                  </span>
                </label>
              </motion.div>
            )}

            <SubmitButton pending={pending}>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </SubmitButton>

            <p className="text-center text-sm text-gray-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-400 hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}