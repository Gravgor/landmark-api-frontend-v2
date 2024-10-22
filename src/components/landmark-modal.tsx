"use client"

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Accessibility, Thermometer, Clock, Calendar, Ticket, Info, Lightbulb } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface LandmarkModalProps {
  landmark: {
    id: string
    name: string
    description: string
    category: string
    city: string
    country: string
    latitude: number
    longitude: number
    accessibility_info: string
    images: { image_url: string }[]
    opening_hours: Record<string, string>
    ticket_prices: Record<string, string>
    visitor_tips: string
    weather_info: {
      main: { temp: number }
      weather: { description: string }[]
    }
    image_url?: string
  }
  onClose: () => void
}

export default function LandmarkModal({ landmark, onClose }: LandmarkModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % landmark.images.length)
  }, [landmark.images.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + landmark.images.length) % landmark.images.length)
  }, [landmark.images.length])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
    >
      <motion.div 
        className="bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <motion.div 
              className="relative rounded-lg overflow-hidden mb-4 shadow-lg"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img 
                src={landmark.images[currentImageIndex]?.image_url || landmark.image_url || "/placeholder.svg?height=400&width=600"} 
                alt={landmark.name} 
                className="w-full h-64 object-cover" 
              />
              {landmark.images.length > 1 && (
                <div className="absolute bottom-4 right-4 space-x-2">
                  <Button size="sm" variant="secondary" onClick={prevImage}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" onClick={nextImage}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <motion.div 
                className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 shadow-md"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span>{landmark.city}, {landmark.country}</span>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-2">{landmark.name}</h2>
              <Badge variant="secondary" className="mb-4">{landmark.category}</Badge>
              <p className="text-sm mb-4">{landmark.description}</p>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Landmark Details</h3>
              <Button
                variant="outline"
                onClick={onClose}
                className="z-10"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Close
              </Button>
            </div>
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <Accessibility className="h-4 w-4" />
                  <span>{landmark.accessibility_info}</span>
                </div>
              </CardContent>
            </Card>
            <Tabs defaultValue="visit" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="visit">
                  <Calendar className="h-4 w-4 mr-2" />
                  Visit
                </TabsTrigger>
                <TabsTrigger value="tickets">
                  <Ticket className="h-4 w-4 mr-2" />
                  Tickets
                </TabsTrigger>
                <TabsTrigger value="weather">
                  <Thermometer className="h-4 w-4 mr-2" />
                  Weather
                </TabsTrigger>
                <TabsTrigger value="tips">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Tips
                </TabsTrigger>
              </TabsList>
              <AnimatePresence mode="wait">
                <TabsContent value="visit">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-semibold mb-2">Opening Hours</h3>
                        <ul className="space-y-2">
                          {Object.entries(landmark.opening_hours).map(([day, hours]) => (
                            <li key={day} className="flex justify-between text-sm">
                              <span className="font-medium">{day}</span>
                              <span>{hours}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
                <TabsContent value="tickets">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-semibold mb-2">Ticket Prices</h3>
                        <ul className="space-y-2">
                          {Object.entries(landmark.ticket_prices).map(([type, price]) => (
                            <li key={type} className="flex justify-between text-sm">
                              <span className="font-medium">{type}</span>
                              <span>{price}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
                <TabsContent value="weather">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-semibold mb-2">Current Weather</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <Thermometer className="h-5 w-5 text-gray-500" />
                          <span className="text-sm">Temperature: {landmark.weather_info.main.temp}°C</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-5 w-5 text-gray-500" />
                          <span className="text-sm">Conditions: {landmark.weather_info.weather[0].description}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
                <TabsContent value="tips">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-semibold mb-2">Visitor Tips</h3>
                        <p className="text-sm">{landmark.visitor_tips}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}