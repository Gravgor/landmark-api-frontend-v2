'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Search, Menu, X, ChevronDown, User, Mail, Lock, ChevronLeft } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { debounce } from 'lodash'
import LandmarkModal from './landmark-modal'
import { useInView } from 'react-intersection-observer'

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
  image_url: string
  opening_hours: OpeningHours
  ticket_prices: TicketPrices
  visitor_tips: string
  weather_info: WeatherInfo
}

interface LandmarkResponse {
  data: Landmark[]
  meta: {
    limit: number
    offset: number
    total: number
  }
}

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showLandmarks, setShowLandmarks] = useState(false)
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null)
  const [showFullDetails, setShowFullDetails] = useState(false)
  const [landmarks, setLandmarks] = useState<Landmark[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [isUserActive, setIsUserActive] = useState(true)
  const [inactivityTimer, setInactivityTimer] = useState<number | null>(null)
  const [searchType, setSearchType] = useState<'city' | 'country' | 'category' | 'name'>('city')
  const [lastSearchTerm, setLastSearchTerm] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()

  const { ref: lastLandmarkRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setOffset(prevOffset => prevOffset + 10)
    }
  }, [inView, hasMore, isLoading])

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if(searchTerm === '') {
      timer = setTimeout(() => {
        setShowLandmarks(false)
        setLastSearchTerm('')
      },10000)
    }
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  },[searchTerm])

  const fetchLandmarks = useCallback(async (query: string, offsetValue: number = 0) => {
    if (query.trim()) {
      setIsLoading(true)
      setError(null)
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        const endpoint = `/landmarks/${searchType}/${encodeURIComponent(query)}?offset=${offsetValue}&limit=10`
        const response = await fetch(`https://api.landmark-api.com/api/v1${endpoint}`, {
          headers: {
            'x-api-key': '43f79790-bc83-47a5-ad99-ee965c27bc34',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mjk0MjY2NjksInBsYW5fdHlwZSI6IlBSTyIsInJvbGUiOiJhZG1pbiIsInN1YnNjcmlwdGlvbl9pZCI6IjllYzRiYTcwLThkOTctNDY5OC05ZDllLWM2MTdkZGQyZjljNiIsInVzZXJfaWQiOiJkN2NlY2JhNS1iODFiLTRhMTItYWE3My0zZjcxYjNiZGI2NjMifQ.wrW_7hrL0VyIDMcKlp3jOIi-3kgCJmbyc-22XFiI8pg',
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch landmarks')
        }
        const data: LandmarkResponse = await response.json()
        setLandmarks(prevLandmarks => offsetValue === 0 ? data.data : [...prevLandmarks, ...data.data])
        setShowLandmarks(true)
        setHasMore(data.data.length === 10)
      } catch (err) {
        setError('An error occurred while fetching landmarks. Please try again.')
        setLandmarks([])
      } finally {
        setIsLoading(false)
        setIsAnimating(false)
      }
    }
  }, [searchType])

  useEffect(() => {
    if (offset > 0 && lastSearchTerm) {
      fetchLandmarks(lastSearchTerm, offset)
    }
  }, [offset, lastSearchTerm, fetchLandmarks])

  const handleSearch = useCallback((term: string) => {
    setOffset(0)
    setIsAnimating(true)
    setLastSearchTerm(term)
    setTimeout(() => {
      fetchLandmarks(term)
    }, 1000) // Delay fetch to allow for animation
  }, [fetchLandmarks])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch(searchTerm)
      resetInactivityTimer()
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const types: Array<'city' | 'country' | 'category' | 'name'> = ['city', 'country', 'category', 'name']
      const currentIndex = types.indexOf(searchType)
      const nextIndex = (currentIndex + 1) % types.length
      setSearchType(types[nextIndex])
    }
  }

  const resetInactivityTimer = useCallback(() => {
    // Only reset timer if there is a lastSearchTerm
    if (lastSearchTerm) {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer)
      }
      
      const timer = setTimeout(() => {
        setIsModalOpen(true)
      }, 300000) // 5 minutes inactivity
  
      //@ts-ignore
      setInactivityTimer(timer)
    }
  }, [inactivityTimer, lastSearchTerm])

  const handleModalResponse = useCallback((isUserStillHere: boolean) => {
    setIsModalOpen(false)
    if (!isUserStillHere) {
      setShowLandmarks(false)
    } else {
      resetInactivityTimer()
    }
  }, [resetInactivityTimer])

  useEffect(() => {
    if (lastSearchTerm) {
      resetInactivityTimer()
    }
  
    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer)
      }
    }
  }, [resetInactivityTimer, inactivityTimer, lastSearchTerm])

  const SkeletonCard = () => (
    <div className="bg-white/10 rounded-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300" />
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-full mb-2" />
        <div className="h-4 bg-gray-300 rounded w-2/3" />
      </div>
    </div>
  )

  const SkeletonTitle = () => (
    <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-4 animate-pulse" />
  )

  const SkeletonSearch = () => (
    <div className="w-full h-12 bg-gray-300 rounded-full animate-pulse" />
  )

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: "easeInOut" }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-grow">
        <motion.section 
          className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 sm:py-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-50" />
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <AnimatePresence mode="wait">
              {!isAnimating && !showLandmarks ? (
                <motion.div
                  key="hero"
                  className="text-center space-y-8 mb-12"
                  {...fadeInUp}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tighter">
                    Discover the World's
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                      Landmarks
                    </span>
                  </h1>
                  <p className="max-w-2xl mx-auto text-xl sm:text-2xl text-gray-300 mt-4">
                    Access global landmark data with our powerful RESTful API service. Build amazing location-based experiences.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
                    <Link href={"#pricing"}>
                      <Button className="w-full sm:w-auto text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700">
                        Get Started
                      </Button>
                    </Link>
                    <Link href={"/docs"}>
                      <Button variant="outline" className="w-full sm:w-auto text-lg px-8 py-3 text-black">
                        View Documentation
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.h2
                  key="explore"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: -85 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeInOut" }}
                  className="text-2xl font-semibold mb-4 text-center"
                >
                  {isAnimating ? 'Searching...' : 
                    `Explore landmarks ${searchType === 'city' ? `in ${lastSearchTerm}` :
                    searchType === 'country' ? `of ${lastSearchTerm}` :
                    searchType === 'category' ? `in the ${lastSearchTerm} category` :
                    `named ${lastSearchTerm}`}`
                  }
                </motion.h2>
              )}
            </AnimatePresence>

            <motion.div
              className="max-w-xl mx-auto mt-2"
              initial={{ y: 0 }}
              animate={{ y: isAnimating || showLandmarks ? -80 : 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeInOut" }}
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder={`Search landmarks by ${searchType}...`}
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-white/10 border-white/20 text-white placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Tip: Press Tab to change search type ({searchType}). Press Enter to search.
              </p>
            </motion.div>

            <AnimatePresence>
              {(isAnimating || isLoading) && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: -80 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.2, ease: "easeInOut" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
                >
                  {[...Array(8)].map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                  className="text-center mt-8 text-red-500"
                >
                  <p>{error}</p>
                </motion.div>
              )}

              {showLandmarks && !selectedLandmark && !error && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: -80 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: 0.2, ease: "easeInOut" }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
                >
                  {landmarks.length > 0 ? (
                    landmarks.map((landmark, index) => (
                      <motion.div
                        key={landmark.id}
                        ref={index === landmarks.length - 1 ? lastLandmarkRef : null}
                        initial={{ opacity:  0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                        whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                        className="bg-white/10 rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setSelectedLandmark(landmark)}
                        layout
                      >
                        <img 
                          src={landmark.images[0]?.image_url || landmark.image_url} 
                          alt={landmark.name} 
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-xl font-semibold mb-2">{landmark.name}</h3>
                          <p className="text-sm text-gray-300">{landmark.description.slice(0, 100)}...</p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                      className="col-span-full text-center text-gray-400"
                    >
                      <p>No landmarks found for "{lastSearchTerm}". Try another search.</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {selectedLandmark && (
                <LandmarkModal landmark={selectedLandmark} onClose={() => setSelectedLandmark(null)} />
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {!showLandmarks && !isLoading && !isAnimating && (
              <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeInOut", delay: 0.5 }}
              >
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-8 w-8 text-white/60" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </main>

      <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
            className="bg-white rounded-lg p-8 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4 text-black">Are you still there?</h2>
            <p className="mb-6 text-black">We noticed you've been inactive for a while. Would you like to continue your search?</p>
            <div className="flex justify-end space-x-4">
              <Button onClick={() => handleModalResponse(false)} variant="outline" className='text-gray-500'>
                No, I'm done
              </Button>
              <Button onClick={() => handleModalResponse(true)}>
                Yes, continue
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  )
}