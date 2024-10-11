'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MapPin, Phone, Mail, Globe, MessageSquare, Clock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission,
    // such as sending the data to an API endpoint
    console.log('Form submitted:', { name, email, subject, message })
    // Reset form fields
    setName('')
    setEmail('')
    setSubject('')
    setMessage('')
  }

  const officeLocations = [
    { city: "San Francisco", address: "123 Tech Street, San Francisco, CA 94105", phone: "+1 (415) 555-0123" },
    { city: "New York", address: "456 Digital Avenue, New York, NY 10001", phone: "+1 (212) 555-0456" },
    { city: "London", address: "789 API Lane, London, EC2A 1NT, UK", phone: "+44 20 7123 4567" },
  ]

  const faqs = [
    {
      question: "How quickly can I expect a response to my inquiry?",
      answer: "We strive to respond to all inquiries within 24 hours during business days. For urgent matters, please use the emergency support option in your dashboard if you're a paid subscriber."
    },
    {
      question: "Do you offer technical support over the phone?",
      answer: "Phone support is available for our Enterprise customers. Pro and Free tier users can receive support via email and our comprehensive documentation."
    },
    {
      question: "Can I schedule a demo of the Landmark API?",
      answer: "Yes! We'd be happy to give you a personalized demo. Please fill out the contact form and select 'Request a Demo' as the subject, and our sales team will get in touch to schedule a convenient time."
    },
    {
      question: "How do I report a bug or suggest a new feature?",
      answer: "You can report bugs or suggest features through our GitHub repository or by contacting our support team via email. We greatly appreciate your feedback as it helps us improve our service."
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-xl">Landmark API</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              {['Home', 'Docs', 'Pricing'].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-sm font-medium hover:text-blue-400 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <Button className='bg-white text-black'>Log In</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                  className="w-full bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                <Select onValueChange={setSubject} required>
                  <SelectTrigger className="w-full bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="sales">Sales Question</SelectItem>
                    <SelectItem value="demo">Request a Demo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message here..."
                  required
                  className="w-full bg-gray-800 border-gray-700"
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-400" />
                <span>support@landmarkapi.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-400" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-blue-400" />
                <span>www.landmarkapi.com</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-400" />
                <span>Monday - Friday, 9am - 5pm PST</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Office Locations</h3>
            <div className="space-y-4">
              {officeLocations.map((office, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{office.city}</h4>
                  <p className="text-sm text-gray-400">{office.address}</p>
                  <p className="text-sm text-gray-400">{office.phone}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mt-16 bg-gray-800 p-8 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Need immediate assistance?</h2>
              <p className="text-gray-400">Our support team is just a click away.</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <MessageSquare className="mr-2 h-4 w-4" />
              Start Live Chat
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}