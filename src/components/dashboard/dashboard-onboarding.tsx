"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, UserCircle, Key, CheckCircle, Globe } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LightOnboardingFlow() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState('')

  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep((prev) => prev + 1)
    } else {
      const { firstName, lastName, password } = formData
      try {
        const response = await fetch("/api/user/update", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `${firstName} ${lastName}`.trim(),
            password
          })
        })

        if (response.ok) {
          router.push('/dashboard')
        } else {
          // Handle error responses
          const errorData = await response.json()
        }
      } catch (error) {
        // Handle network errors or other exceptions
        setError("An error occurred. Please check your connection and try again.")
      }
    }
  }
  const steps = [
    {
      title: "Welcome to Landmark API",
      description: "Let's get started by setting up your profile.",
      icon: <UserCircle className="w-12 h-12 text-blue-600" />,
      fields: (
        <>
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="border-gray-300"
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="border-gray-300"
              placeholder="Doe"
            />
          </div>
        </>
      ),
    },
    {
      title: "Secure Your Account",
      description: "Choose a strong password to protect your account.",
      icon: <Key className="w-12 h-12 text-blue-600" />,
      fields: (
        <>
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="border-gray-300"
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="border-gray-300"
              placeholder="••••••••"
            />
          </div>
        </>
      ),
    },
    {
      title: "All Set!",
      description: "Your account is now ready to use.",
      icon: <CheckCircle className="w-12 h-12 text-green-500" />,
      fields: (
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Thank you for completing your profile. You can now start using the Landmark API dashboard.
          </p>
          <Globe className="w-16 h-16 text-blue-600 mx-auto animate-pulse" />
        </div>
      ),
    },
  ]


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Card className="w-full max-w-md border border-gray-200 shadow-lg">
        <form onSubmit={handleSubmit}>
          <CardHeader className="border-b border-gray-200 bg-white">
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
              {steps[step - 1].title}
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              {steps[step - 1].description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex justify-center mb-6">
                  {steps[step - 1].icon}
                </div>
                {steps[step - 1].fields}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t border-gray-200">
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {step < 3 ? (
                <>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                "Get Started"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}