"use client"
import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Accessibility, Thermometer, Clock, Calendar, Ticket, Info, Lightbulb } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LandmarkModal({ landmark, onClose }:any) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % landmark.images.length);
  }, [landmark.images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + landmark.images.length) % landmark.images.length);
  }, [landmark.images.length]);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 rounded-xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative border border-gray-800">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <div className="relative rounded-lg overflow-hidden mb-4 bg-gray-800">
              <img 
                src={landmark.images[currentImageIndex]?.image_url || landmark.image_url || "/api/placeholder/600/400"} 
                alt={landmark.name} 
                className="w-full h-64 object-cover" 
              />
              {landmark.images.length > 1 && (
                <div className="absolute bottom-4 right-4 space-x-2">
                  <Button size="sm" variant="secondary" onClick={prevImage} className="bg-gray-900/80 hover:bg-gray-800">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" onClick={nextImage} className="bg-gray-900/80 hover:bg-gray-800">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-1">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-200">{landmark.city}, {landmark.country}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {landmark.name}
              </h2>
              <Badge variant="secondary" className="mb-4 bg-gray-800 text-gray-200">
                {landmark.category}
              </Badge>
              <p className="text-sm mb-4 text-gray-400">{landmark.description}</p>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-200">Details</h3>
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-200 hover:bg-gray-800"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Close
              </Button>
            </div>
            
            <Card className="mb-4 bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Accessibility className="h-4 w-4 text-blue-400" />
                  <span>{landmark.accessibility_info}</span>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="visit" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4 bg-gray-800/50">
                {[
                  { value: "visit", icon: Calendar, label: "Visit" },
                  { value: "tickets", icon: Ticket, label: "Tickets" },
                  { value: "weather", icon: Thermometer, label: "Weather" },
                  { value: "tips", icon: Lightbulb, label: "Tips" }
                ].map(tab => (
                  <TabsTrigger 
                    key={tab.value} 
                    value={tab.value}
                    className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="visit">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-200">Opening Hours</h3>
                    <ul className="space-y-2">
                      {Object.entries(landmark.opening_hours).map(([day, hours]) => (
                        <li key={day} className="flex justify-between text-sm">
                          <span className="font-medium text-gray-400">{day}</span>
                          <span className="text-gray-300">{hours as string}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tickets">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-200">Ticket Prices</h3>
                    <ul className="space-y-2">
                      {Object.entries(landmark.ticket_prices).map(([type, price]) => (
                        <li key={type} className="flex justify-between text-sm">
                          <span className="font-medium text-gray-400">{type}</span>
                          <span className="text-gray-300">{price as string}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="weather">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-200">Current Weather</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-5 w-5 text-blue-400" />
                        <span className="text-sm text-gray-300">
                          Temperature: {landmark.weather_info.main.temp}°C
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-blue-400" />
                        <span className="text-sm text-gray-300">
                          Conditions: {landmark.weather_info.weather[0].description}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tips">
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-200">Visitor Tips</h3>
                    <p className="text-sm text-gray-400">{landmark.visitor_tips}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}