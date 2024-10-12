"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HelpCircle, MessageSquare, Phone, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupportPage() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Support request submitted:", { subject, message })
    setSubject("")
    setMessage("")
  }

  return (
      <main className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-3xl font-bold mb-8 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HelpCircle className="mr-2" /> Support
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2 bg-gray-900 rounded-lg p-6 shadow-xl border border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Contact Support</CardTitle>
              <CardDescription>Fill out the form below to get in touch with our support team.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1 text-white">Subject</label>
                  <Input
                    id="subject"
                    placeholder="Enter the subject of your inquiry"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="bg-gray-100 text-[#1a2b6d]"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1 text-white">Message</label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue or question"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="bg-gray-100 text-[#1a2b6d]"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card className="bg-gray-900 rounded-lg p-6 shadow-xl border border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">FAQs</CardTitle>
                <CardDescription>Find quick answers to common questions.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">How do I reset my API key?</a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">What's included in the Pro plan?</a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">How can I upgrade my subscription?</a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">What's your refund policy?</a>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-gray-900 rounded-lg p-6 shadow-xl border border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white">Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="text-white">Live Chat (9am - 5pm EST)</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="text-white">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="text-white">support@apidashboard.com</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
  )
}