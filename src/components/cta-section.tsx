import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, ArrowRight } from "lucide-react"

export default function CTASection() {
  return (
    <section className="w-full py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">
              Ready to Explore the World's Landmarks?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Join thousands of developers already using Landmark API to power their applications. Start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
              <Button className="bg-white text-blue-900 hover:bg-gray-200 transition-colors">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              No credit card required. Start with our free plan and upgrade anytime.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-lg filter blur-xl opacity-20"></div>
            <div className="relative bg-gray-900 p-8 rounded-lg border border-gray-700">
              <div className="flex items-center mb-6">
                <MapPin className="h-8 w-8 text-blue-400 mr-3" />
                <h3 className="text-2xl font-bold">Quick Start Guide</h3>
              </div>
              <ol className="list-decimal list-inside space-y-3 text-gray-300">
                <li>Sign up for an API key</li>
                <li>Install our SDK</li>
                <li>Make your first API call</li>
                <li>Explore our documentation</li>
                <li>Build amazing location-based experiences!</li>
              </ol>
              <Button className="mt-8 w-full bg-blue-600 hover:bg-blue-700">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}