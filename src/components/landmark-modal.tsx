import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, Clock, MapPin, Thermometer, Accessibility, Ticket } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Image {
  image_url: string
  created_at: string
  updated_at: string
}

interface OpeningHours {
  [key: string]: string
}

interface TicketPrices {
  [key: string]: string
}

interface WeatherInfo {
  main: {
    temp: number
  }
  weather: {
    description: string
  }[]
}

interface Landmark {
  id: string
  name: string
  description: string
  category: string
  city: string
  country: string
  latitude: number
  longitude: number
  accessibility_info: string
  images: Image[]
  opening_hours: OpeningHours
  ticket_prices: TicketPrices
  visitor_tips: string
  weather_info: WeatherInfo
  image_url?: string // Added optional image_url
}

interface LandmarkModalProps {
  landmark: Landmark
  onClose: () => void
}

export default function LandmarkModal({ landmark, onClose }: LandmarkModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % landmark.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + landmark.images.length) % landmark.images.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
    >
      <motion.div 
        className="bg-white text-gray-900 rounded-lg p-4 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">{landmark.name}</h2>
          <Button variant="outline" onClick={onClose}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>

        <div className="relative mb-6">
          <img 
            src={landmark.images[currentImageIndex]?.image_url || landmark.image_url} 
            alt={landmark.name} 
            className="w-full h-64 object-cover rounded-lg" 
          />
          {landmark.images.length > 1 && (
            <div className="absolute bottom-4 right-4 space-x-2">
              <Button size="sm" onClick={prevImage}>Previous</Button>
              <Button size="sm" onClick={nextImage}>Next</Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="visit">Visit</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>
          <TabsContent value="info">
            <div className="space-y-4">
              <p>{landmark.description}</p>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{landmark.city}, {landmark.country}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Accessibility className="h-5 w-5 text-gray-500" />
                <span>{landmark.accessibility_info}</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="visit">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Opening Hours</h3>
              <ul className="space-y-2">
                {Object.entries(landmark.opening_hours).map(([day, hours]) => (
                  <li key={day} className="flex justify-between">
                    <span>{day}</span>
                    <span>{hours}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-xl font-semibold">Ticket Prices</h3>
              <ul className="space-y-2">
                {Object.entries(landmark.ticket_prices).map(([type, price]) => (
                  <li key={type} className="flex justify-between">
                    <span>{type}</span>
                    <span>${price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="weather">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Thermometer className="h-5 w-5 text-gray-500" />
                <span>Temperature: {landmark.weather_info.main.temp}°C</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span>Weather: {landmark.weather_info.weather[0].description}</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="tips">
            <p>{landmark.visitor_tips}</p>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}