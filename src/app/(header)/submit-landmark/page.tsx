//@ts-nocheck
"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle2, MapPin, Clock, Ticket, History, Users, Info } from "lucide-react";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
});

export default function LandmarkSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [files, setFiles] = useState([]);
  
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      opening_hours: days.reduce((acc, day) => ({ ...acc, [day]: '9:00 AM - 5:00 PM' }), {}),
      ticket_prices: { Adult: '$10', Child: '$5' },
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const imageUrls = await uploadPhotos();
      const response = await fetch('https://api.landmark-api.com/api/v1/contribution/submit-landmark', {
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
      });

      if (!response.ok) throw new Error('Failed to submit landmark data');
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const uploadPhotos = async () => {
    if (files.length === 0) return [];
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    
    const response = await fetch('https://api.landmark-api.com/api/v1/contribution/submit-photo', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to upload photos');
    const result = await response.json();
    return result.urls;
  };

  return (
    <div className="min-h-screen bg-[#0A0B1A] text-gray-100">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 inline-block p-3 rounded-lg mb-4">
            <MapPin className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Submit New Landmark
          </h1>
          <p className="mt-2 text-gray-400">Share your favorite landmarks with our global community</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-[#131325] rounded-xl p-6 shadow-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-400" />
              Basic Information
            </h2>
            <div className="grid gap-6">
              <div>
                <Label className="text-gray-300">Landmark Name</Label>
                <Input
                  {...register('name')}
                  className="mt-1 bg-[#1A1A2E] border-gray-700 focus:border-blue-500"
                />
                {errors.name && (
                  <p className="mt-1 text-red-400 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label className="text-gray-300">Description</Label>
                <Textarea
                  {...register('description')}
                  className="mt-1 bg-[#1A1A2E] border-gray-700 focus:border-blue-500"
                  rows={4}
                />
                {errors.description && (
                  <p className="mt-1 text-red-400 text-sm">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Latitude</Label>
                  <Input
                    type="number"
                    step="any"
                    {...register('latitude', { valueAsNumber: true })}
                    className="mt-1 bg-[#1A1A2E] border-gray-700 focus:border-blue-500"
                  />
                  {errors.latitude && (
                    <p className="mt-1 text-red-400 text-sm">{errors.latitude.message}</p>
                  )}
                </div>
                <div>
                  <Label className="text-gray-300">Longitude</Label>
                  <Input
                    type="number"
                    step="any"
                    {...register('longitude', { valueAsNumber: true })}
                    className="mt-1 bg-[#1A1A2E] border-gray-700 focus:border-blue-500"
                  />
                  {errors.longitude && (
                    <p className="mt-1 text-red-400 text-sm">{errors.longitude.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Country</Label>
                  <Input
                    {...register('country')}
                    className="mt-1 bg-[#1A1A2E] border-gray-700 focus:border-blue-500"
                  />
                  {errors.country && (
                    <p className="mt-1 text-red-400 text-sm">{errors.country.message}</p>
                  )}
                </div>
                <div>
                  <Label className="text-gray-300">City</Label>
                  <Input
                    {...register('city')}
                    className="mt-1 bg-[#1A1A2E] border-gray-700 focus:border-blue-500"
                  />
                  {errors.city && (
                    <p className="mt-1 text-red-400 text-sm">{errors.city.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Category</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="mt-1 bg-[#1A1A2E] border-gray-700">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="historical">Historical</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="natural">Natural</SelectItem>
                        <SelectItem value="religious">Religious</SelectItem>
                        <SelectItem value="architectural">Architectural</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="mt-1 text-red-400 text-sm">{errors.category.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[#131325] rounded-xl p-6 shadow-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-400" />
              Operating Hours & Prices
            </h2>
            <div className="space-y-6">
              <div className="space-y-4">
                {days.map((day) => (
                  <div key={day} className="grid grid-cols-4 gap-4 items-center">
                    <Label className="text-gray-400">{day}</Label>
                    <Input
                      {...register(`opening_hours.${day}`)}
                      className="col-span-3 bg-[#1A1A2E] border-gray-700 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-300 flex items-center gap-2">
                  <Ticket className="h-5 w-5 text-purple-400" />
                  Ticket Prices
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400">Adult Price</Label>
                    <Input
                      {...register('ticket_prices.Adult')}
                      className="mt-1 bg-[#1A1A2E] border-gray-700 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-400">Child Price</Label>
                    <Input
                      {...register('ticket_prices.Child')}
                      className="mt-1 bg-[#1A1A2E] border-gray-700 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#131325] rounded-xl p-6 shadow-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <History className="h-5 w-5 text-blue-400" />
              Additional Information
            </h2>
            <div className="space-y-6">
              <div>
                <Label className="text-gray-300">Historical Significance</Label>
                <Textarea
                  {...register('historical_significance')}
                  className="mt-1 bg-[#1A1A2E] border-gray-700 focus:border-blue-500"
                  rows={4}
                />
                {errors.historical_significance && (
                  <p className="mt-1 text-red-400 text-sm">{errors.historical_significance.message}</p>
                )}
              </div>

              <div>
                <Label className="text-gray-300">Visitor Tips</Label>
                <Textarea
                  {...register('visitor_tips')}
                  className="mt-1 bg-[#1A1A2E] border-gray-700 focus:border-blue-500"
                  rows={4}
                />
                {errors.visitor_tips && (
                  <p className="mt-1 text-red-400 text-sm">{errors.visitor_tips.message}</p>
                )}
              </div>

              <div>
                <Label className="text-gray-300">Accessibility Information</Label>
                <Textarea
                  {...register('accessibility_info')}
                  className="mt-1 bg-[#1A1A2E] border-gray-700 focus:border-blue-500"
                  rows={3}
                />
                {errors.accessibility_info && (
                  <p className="mt-1 text-red-400 text-sm">{errors.accessibility_info.message}</p>
                )}
              </div>

              <div>
                <Label className="text-gray-300">Photos</Label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 bg-[#1A1A2E] border-gray-700 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert className="bg-green-900/50 border-green-500">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Your landmark has been submitted successfully!</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-6"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              'Submit Landmark'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}