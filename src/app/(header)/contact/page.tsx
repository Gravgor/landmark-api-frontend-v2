'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Globe, MessageSquare, Clock, Building2 } from "lucide-react"

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e:any) => {
    e.preventDefault()
    console.log('Form submitted:', { name, email, subject, message })
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
    <div className="min-h-screen bg-[#0A0C10] text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Contact Us</h1>
          <p className="text-gray-400 mt-4">Get in touch with our support team</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-[#141625] border-gray-800">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#1C1F2E] border-gray-700"
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#1C1F2E] border-gray-700"
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Select onValueChange={setSubject}>
                    <SelectTrigger className="bg-[#1C1F2E] border-gray-700">
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
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-[#1C1F2E] border-gray-700"
                    placeholder="How can we help?"
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-[#141625] border-gray-800">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center text-gray-300">
                  <Mail className="h-5 w-5 mr-3 text-blue-400" />
                  <span>support@landmarkapi.com</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="h-5 w-5 mr-3 text-blue-400" />
                  <span>+1 (800) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="h-5 w-5 mr-3 text-blue-400" />
                  <span>Monday - Friday, 9am - 5pm PST</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Globe className="h-5 w-5 mr-3 text-blue-400" />
                  <span>www.landmarkapi.com</span>
                </div>
              </CardContent>
            </Card>

            {/* Office Locations */}
            <div className="grid gap-4">
              {officeLocations.map((office, index) => (
                <Card key={index} className="bg-[#141625] border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <Building2 className="h-5 w-5 mr-3 text-blue-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-200">{office.city}</h4>
                        <p className="text-sm text-gray-400 mt-1">{office.address}</p>
                        <p className="text-sm text-gray-400">{office.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-800">
                <AccordionTrigger className="text-gray-200 hover:text-gray-100">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Live Chat CTA */}
        <Card className="mt-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-gray-800">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold text-black">Need immediate assistance?</h2>
                <p className="text-gray-800 mt-2">Our support team is just a click away.</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Live Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}