"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlusCircle, Globe, MapPin, Clock, Ticket, Info, Accessibility, Bus, Loader2, Check, AlertCircle, Upload } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, FieldError } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'

const formSchema = z.object({
  name: z.string().min(1, 'Landmark name is required'),
  description: z.string(),
  category: z.string().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  ticketPrices: z.string().optional(),
  openingHours: z.string().optional(),
  visitor_tips: z.string().optional(),
  historicalSignificance: z.string().optional(),
  accessibility: z.string().optional(),
  publicTransport: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>;

export default function Component() {
  const [images, setImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files))
    }
  }

  const uploadImages = async () => {
    const uploadPromises = images.map(async (file) => {
      const formData = new FormData()
      formData.append('image', file)

      try {
        const response = await axios.post('https://landmark-api-development.up.railway.app/6f27ee581a4c29a546c5a611325161176bed6cf9d853782c47489d0659c558a1/api/v1/landmarks/upload-photo', formData, {
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mjg3NjUyNDMsInBsYW5fdHlwZSI6IkZSRUUiLCJzdWJzY3JpcHRpb25faWQiOiI4YjAzZGM0My1hNzUxLTQ5NWItOWFiYy1mZmQ0ZTgwOTc3MWIiLCJ1c2VyX2lkIjoiOWJkZjdhYmMtZWFhMi00MWY3LTlkM2MtODE5ZWU5MTVlNmZlIn0.PgO-yR8_Hi2yARLVTbhlrIuoqHJfPAxV9x1LcS09FdU',
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent: any) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!)
            setUploadProgress(percentCompleted)
          },
        })
        return response
      } catch (error) {
        console.error('Upload failed:', error)
        throw error
      }
    })

    return Promise.all(uploadPromises)
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Upload images first
      const imageUrls = await uploadImages()
      console.log(imageUrls[0].data.url)
      // Combine form data with image URLs
      const landmarkData = {
        landmark: {
            name: data.name,
            description: data.description,
            latitude: data.latitude,
            longitude: data.longitude,
            country: data.country,
            city: data.city,
            category: data.category,
            image_url: imageUrls[0].data.url
        },
        landmark_detail: {
            opening_hours: data.openingHours,
            ticket_prices: data.ticketPrices,
            historical_significance: data.historicalSignificance,
            visitor_tips: data.visitor_tips,
            accessibility_info: data.accessibility
        }
      }

      // Send landmark data to the server
      const response = await fetch('https://landmark-api-development.up.railway.app/6f27ee581a4c29a546c5a611325161176bed6cf9d853782c47489d0659c558a1/api/v1/landmarks/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mjg3NjUyNDMsInBsYW5fdHlwZSI6IkZSRUUiLCJzdWJzY3JpcHRpb25faWQiOiI4YjAzZGM0My1hNzUxLTQ5NWItOWFiYy1mZmQ0ZTgwOTc3MWIiLCJ1c2VyX2lkIjoiOWJkZjdhYmMtZWFhMi00MWY3LTlkM2MtODE5ZWU5MTVlNmZlIn0.PgO-yR8_Hi2yARLVTbhlrIuoqHJfPAxV9x1LcS09FdU'
        },
        body: JSON.stringify(landmarkData),
      })
      setSubmitSuccess(true)
      toast({
        title: "Landmark added successfully!",
        description: `${data.name} has been added to the database.`,
      })

      // Reset form and state after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
        setImages([])
        setUploadProgress(0)
        // Reset form here (you might want to use the reset function from useForm)
      }, 2000)
    } catch (error) {
      console.error('Submission failed:', error)
      toast({
        title: "Error",
        description: "Failed to add landmark. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderError = (error: FieldError | undefined) => {
    if (error) {
      return <p className="text-red-500 text-sm mt-1">{error.message}</p>
    }
    return null
  }

  return (
    <div className="min-h-screen bg-[#1e3a8a] p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Welcome back, Admin! 🌍</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Total Landmarks</h2>
          <p className="text-4xl font-bold">127</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <p className="text-4xl font-bold">15</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Countries</h2>
          <p className="text-4xl font-bold">42</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Cities</h2>
          <p className="text-4xl font-bold">89</p>
        </div>
      </div>
      
      <motion.div 
        className="bg-gray-800 p-6 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <PlusCircle className="mr-2" />
          Add New Landmark
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2" htmlFor="name">Landmark Name</label>
            <Input className='text-black' id="name" {...register('name')} placeholder="Enter landmark name" />
            {renderError(errors.name)}
          </div>
          <div>
            <label className="block mb-2" htmlFor="description">Landmark Description</label>
            <Input className='text-black' id="description" {...register('description')} placeholder="Enter landmark description" />
            {renderError(errors.description)}
          </div>
          <div>
            <label className="block mb-2" htmlFor="category">Landmark Description</label>
            <Input className='text-black' id="category" {...register('category')} placeholder="Enter landmark category" />
            {renderError(errors.category)}
          </div>
          <div>
            <label className="block mb-2" htmlFor="latitude">Latitude</label>
            <Input className='text-black' id="latitude" type="number" step="0.000001" {...register('latitude', { valueAsNumber: true })} placeholder="Enter latitude" />
            {renderError(errors.latitude)}
          </div>
          <div>
            <label className="block mb-2" htmlFor="longitude">Longitude</label>
            <Input className='text-black' id="longitude" type="number" step="0.000001" {...register('longitude', { valueAsNumber: true })} placeholder="Enter longitude" />
            {renderError(errors.longitude)}
          </div>
          <div>
            <label className="block mb-2" htmlFor="country">Country</label>
            <Input className='text-black' id="country" {...register('country')} placeholder="Enter country" />
            {renderError(errors.country)}
          </div>
          <div>
            <label className="block mb-2" htmlFor="city">City</label>
            <Input className='text-black' id="city" {...register('city')} placeholder="Enter city" />
            {renderError(errors.city)}
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2" htmlFor="images">
              <Upload className="inline mr-2" />
              Images
            </label>
            <Input id="images" type="file" multiple onChange={handleImageUpload} />
            <div className="mt-2 text-sm text-gray-400">
              {images.length} file(s) selected
            </div>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mt-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                <p className="text-sm text-gray-400 mt-1">Uploading: {uploadProgress}%</p>
              </div>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2" htmlFor="ticket-prices">
              <Ticket className="inline mr-2" />
              Ticket Prices
            </label>
            <Textarea className='text-black' id="ticket-prices" {...register('ticketPrices')} placeholder="Enter ticket price information" />
            {renderError(errors.ticketPrices)}
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2" htmlFor="opening-hours">
              <Clock className="inline mr-2" />
              Opening Hours
            </label>
            <Textarea className='text-black' id="opening-hours" {...register('openingHours')} placeholder="Enter opening hours" />
            {renderError(errors.openingHours)}
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2" htmlFor="historical-significance">
              <Info className="inline mr-2" />
              Historical Significance
            </label>
            <Textarea className='text-black' id="historical-significance" {...register('historicalSignificance')} placeholder="Enter historical significance" />
            {renderError(errors.historicalSignificance)}
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2" htmlFor="visitor_tips">
              <Info className="inline mr-2" />
              Visitor Tips
            </label>
            <Textarea className='text-black' id="visitor_tips" {...register('visitor_tips')} placeholder="Enter Visitor Tips" />
            {renderError(errors.visitor_tips)}
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2" htmlFor="accessibility">
              <Accessibility className="inline mr-2" />
              Accessibility Information
            </label>
            <Textarea className='text-black' id="accessibility" {...register('accessibility')} placeholder="Enter accessibility information" />
            {renderError(errors.accessibility)}
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2" htmlFor="public-transport">
              <Bus className="inline mr-2" />
              Public Transport API Links
            </label>
            <Input className='text-black' id="public-transport" {...register('publicTransport')} placeholder="Enter public transport API links" />
            {renderError(errors.publicTransport)}
          </div>
          <AnimatePresence>
            {isSubmitting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:col-span-2 flex items-center justify-center"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="md:col-span-2 flex items-center justify-center text-green-500"
              >
                <Check className="mr-2 h-4 w-4" />
                Landmark added successfully!
              </motion.div>
            )}
          </AnimatePresence>
          <Button className="md:col-span-2" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Landmark...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Landmark
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}