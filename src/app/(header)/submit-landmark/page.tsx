'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, CheckCircle2, MapPin } from "lucide-react"

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  category: z.string().min(1, 'Category is required'),
  opening_hours: z.any(),
  ticket_prices: z.object({
    Adult: z.string(),
    Child: z.string(),
  }),
  historical_significance: z.string().min(10, 'Historical significance must be at least 10 characters'),
  visitor_tips: z.string().min(10, 'Visitor tips must be at least 10 characters'),
  accessibility_info: z.string().min(1, 'Accessibility info is required'),
  photos: z.any(),
})

type FormData = z.infer<typeof schema>

export default function LandmarkSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      opening_hours: days.reduce((acc, day) => ({ ...acc, [day]: '9:00 AM - 5:00 PM' }), {}),
      ticket_prices: { Adult: '$10', Child: '$5' },
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const imageUrls = await uploadPhotos()
      const landmarkResponse = await fetch(`https://api.landmark-api.com/api/v1/contribution/submit-landmark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          landmark: {
            name: data.name,
            description: data.description,
            latitude: data.latitude,
            longitude: data.longitude,
            country: data.country,
            city: data.city,
            category: data.category,
            image_urls: imageUrls,
          },
          landmark_detail: {
            opening_hours: data.opening_hours,
            ticket_prices: data.ticket_prices,
            historical_significance: data.historical_significance,
            visitor_tips: data.visitor_tips,
            accessibility_info: data.accessibility_info,
          },
          image_urls: imageUrls,
        }),
      })

      if (!landmarkResponse.ok) {
        throw new Error('Failed to submit landmark data')
      }

      setSubmitStatus('success')
      reset()
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }


  const uploadPhotos= async (): Promise<string[]> => {
    if (files.length === 0) return []

    const formData = new FormData()
    files.forEach((file) => {
      formData.append('images', file)
    })
      const response = await fetch(`https://api.landmark-api.com/api/v1/contribution/submit-photo`, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload photo');
      }
  
      const result = await response.json();
      return result.urls;
    }  
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <MapPin className="mx-auto h-12 w-12 text-purple-400" />
          <h2 className="mt-2 text-3xl font-extrabold">Submit a New Landmark</h2>
          <p className="mt-2 text-sm text-gray-300">Share your favorite landmarks with the community</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-xl">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-300">Landmark Name</Label>
              <Input id="name" {...register('name')} className="bg-gray-700 text-white border-gray-600" />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea id="description" {...register('description')} className="bg-gray-700 text-white border-gray-600" />
              {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude" className="text-gray-300">Latitude</Label>
                <Input id="latitude" type="number" step="any" {...register('latitude', { valueAsNumber: true })} className="bg-gray-700 text-white border-gray-600" />
                {errors.latitude && <p className="text-red-400 text-sm mt-1">{errors.latitude.message}</p>}
              </div>
              <div>
                <Label htmlFor="longitude" className="text-gray-300">Longitude</Label>
                <Input id="longitude" type="number" step="any" {...register('longitude', { valueAsNumber: true })} className="bg-gray-700 text-white border-gray-600" />
                {errors.longitude && <p className="text-red-400 text-sm mt-1">{errors.longitude.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country" className="text-gray-300">Country</Label>
                <Input id="country" {...register('country')} className="bg-gray-700 text-white border-gray-600" />
                {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country.message}</p>}
              </div>
              <div>
                <Label htmlFor="city" className="text-gray-300">City</Label>
                <Input id="city" {...register('city')} className="bg-gray-700 text-white border-gray-600" />
                {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="category" className="text-gray-300">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 text-white border-gray-600">
                      <SelectItem value="Historical Landmark">Historical Landmark</SelectItem>
                      <SelectItem value="Natural Wonder">Natural Wonder</SelectItem>
                      <SelectItem value="Cultural Site">Cultural Site</SelectItem>
                      <SelectItem value="Architectural Marvel">Architectural Marvel</SelectItem>
                      <SelectItem value="Religious Site">Religious Site</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>}
            </div>

            <div>
              <Label className="text-gray-300">Opening Hours</Label>
              {days.map((day) => (
                <div key={day} className="flex items-center space-x-2 mt-2">
                  <span className="w-24 text-gray-300">{day}</span>
                  <Input {...register(`opening_hours.${day}`)} defaultValue="9:00 AM - 5:00 PM" className="bg-gray-700 text-white border-gray-600" />
                </div>
              ))}
              {errors.opening_hours && <p className="text-red-400 text-sm mt-1">Please provide valid opening hours for all days</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adultPrice" className="text-gray-300">Adult Ticket Price</Label>
                <Input id="adultPrice" {...register('ticket_prices.Adult')} className="bg-gray-700 text-white border-gray-600" />
                {errors.ticket_prices?.Adult && <p className="text-red-400 text-sm mt-1">{errors.ticket_prices.Adult.message}</p>}
              </div>
              <div>
                <Label htmlFor="childPrice" className="text-gray-300">Child Ticket Price</Label>
                <Input id="childPrice" {...register('ticket_prices.Child')} className="bg-gray-700 text-white border-gray-600" />
                {errors.ticket_prices?.Child && <p className="text-red-400 text-sm mt-1">{errors.ticket_prices.Child.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="historical_significance" className="text-gray-300">Historical Significance</Label>
              <Textarea id="historical_significance" {...register('historical_significance')} className="bg-gray-700 text-white border-gray-600" />
              {errors.historical_significance && <p className="text-red-400 text-sm mt-1">{errors.historical_significance.message}</p>}
            </div>

            <div>
              <Label htmlFor="visitor_tips" className="text-gray-300">Visitor Tips</Label>
              <Textarea id="visitor_tips" {...register('visitor_tips')} className="bg-gray-700 text-white border-gray-600" />
              {errors.visitor_tips && <p className="text-red-400 text-sm mt-1">{errors.visitor_tips.message}</p>}
            </div>

            <div>
              <Label htmlFor="accessibility_info" className="text-gray-300">Accessibility Information</Label>
              <Input id="accessibility_info" {...register('accessibility_info')} className="bg-gray-700 text-white border-gray-600" />
              {errors.accessibility_info && <p className="text-red-400 text-sm mt-1">{errors.accessibility_info.message}</p>}
            </div>

            <div>
            <Label htmlFor="photos" className="text-gray-300">Photos</Label>
            <Input id="photos" type="file" multiple accept="image/*" onChange={handleFileChange} className="bg-gray-700 text-white border-gray-600" />
          </div>

          </div>

          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="default" className="bg-green-800 text-white border-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    Your landmark submission has been received. Thank you for your contribution!
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="bg-red-800 text-white border-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {errorMessage || 'There was an error submitting your landmark. Please try again.'}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <Button type="submit" onClick={handleSubmit(onSubmit)} disabled={isSubmitting} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Landmark'
            )}
          </Button>
        </form>
      </div>
    
    </div>
  )
}