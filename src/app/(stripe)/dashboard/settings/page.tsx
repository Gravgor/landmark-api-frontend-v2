'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, Save } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SettingsPage() {
  const [name, setName] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage('')
    setErrorMessage('')

    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords don't match")
      setIsLoading(false)
      return
    }

    // Here you would typically make an API call to update the user's settings
    console.log('Updating settings:', { name, currentPassword, newPassword })

    setSuccessMessage('Settings updated successfully')
    setIsLoading(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="bg-gray-900 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Settings</CardTitle>
              <CardDescription className="text-gray-400">Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-200">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-200">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm font-medium text-gray-200">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              {successMessage && (
                <Alert className="w-full bg-green-900/50 border-green-500 text-green-300">
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}
              {errorMessage && (
                <Alert className="w-full bg-red-900/50 border-red-500 text-red-300">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              <Button 
                onClick={handleSubmit}
                disabled={isLoading} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
              >
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}