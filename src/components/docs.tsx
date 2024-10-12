'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Search, Code, Key, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("getting-started")

  const tabs = [
    { id: "getting-started", label: "Getting Started" },
    { id: "authentication", label: "Authentication" },
    { id: "endpoints", label: "Endpoints" },
    { id: "examples", label: "Examples" },
    { id: "errors", label: "Error Handling" },
    { id: "wrappers", label: "API Wrappers" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Landmark API Documentation</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-gray-800 p-1 rounded-lg flex flex-wrap">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="px-4 py-2 text-sm font-medium transition-colors data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="getting-started" className="space-y-6">
            <h2 className="text-2xl font-semibold">Getting Started with Landmark API</h2>
            <p>Welcome to the Landmark API documentation. Follow these steps to start using our API:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Sign up for an account</li>
              <li>Obtain your API key</li>
              <li>Make your first API request</li>
            </ol>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Quick Start Example</h3>
              <pre className="bg-black p-4 rounded text-sm overflow-x-auto">
                <code>{`
curl -X GET "https://api.landmarkapi.com/v1/landmarks?country=France&limit=5" \\
     -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json"
                `}</code>
              </pre>
            </div>
          </TabsContent>

          <TabsContent value="authentication" className="space-y-6">
            <h2 className="text-2xl font-semibold">Authentication</h2>
            <p>Landmark API uses API keys for authentication. Include your API key in the Authorization header of each request:</p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <pre className="bg-black p-4 rounded text-sm overflow-x-auto">
                <code>{`
Authorization: Bearer YOUR_API_KEY
X-API-Key: YOUR_API_KEY
                `}</code>
              </pre>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Register a new user</h3>
              <pre className="bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                <code>{`
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
                `}</code>
              </pre>
              <h3 className="text-xl font-semibold">Login</h3>
              <pre className="bg-gray-800 p-4 rounded text-sm overflow-x-auto">
                <code>{`
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
                `}</code>
              </pre>
            </div>
            <div className="flex items-center space-x-2 text-yellow-400">
              <AlertCircle className="h-5 w-5" />
              <p>Never share your API key publicly or commit it to version control.</p>
            </div>
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-6">
            <h2 className="text-2xl font-semibold">API Endpoints</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">GET /api/v1/landmarks</h3>
                <p>Retrieve a list of landmarks.</p>
                <h4 className="text-lg font-semibold mt-2">Query Parameters:</h4>
                <ul className="list-disc list-inside">
                  <li>limit (default: 10)</li>
                  <li>offset (default: 0)</li>
                  <li>sort (e.g., "-name" for descending order)</li>
                  <li>fields (comma-separated list of fields)</li>
                  <li>Additional filters as query parameters</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">GET /api/v1/landmarks/{'{id}'}</h3>
                <p>Retrieve details for a specific landmark.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">GET /api/v1/landmarks/country/{'{country}'}</h3>
                <p>Retrieve landmarks for a specific country.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">GET /api/v1/landmarks/name/{'{name}'}</h3>
                <p>Search landmarks by name.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">GET /api/v1/landmarks/category/{'{category}'}</h3>
                <p>Search landmarks by category.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">POST /api/v1/landmarks/search</h3>
                <p>Search landmarks by coordinates.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <h2 className="text-2xl font-semibold">Example Requests and Responses</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold">Example: Get landmarks in France</h3>
                <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto mt-2">
                  <code>{`
GET /api/v1/landmarks?country=France&limit=5
Authorization: Bearer <your_jwt_token>
X-API-Key: <your_api_key>

Response:
{
  "landmarks": [
    {
      "id": "eiffel-tower",
      "name": "Eiffel Tower",
      "location": {
        "lat": 48.8584,
        "lon": 2.2945
      },
      "description": "Iconic iron lattice tower on the Champ de Mars in Paris"
    },
    // ... more landmarks
  ],
  "total": 1384,
  "page": 1,
  "limit": 5
}
                  `}</code>
                </pre>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="errors" className="space-y-6">
            <h2 className="text-2xl font-semibold">Error Handling</h2>
            <p>Landmark API uses conventional HTTP response codes to indicate the success or failure of an API request.</p>
            <table className="w-full border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 text-left">Code</th>
                  <th className="p-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-t border-gray-700">200 - OK</td>
                  <td className="p-2 border-t border-gray-700">The request was successful.</td>
                </tr>
                <tr>
                  <td className="p-2 border-t border-gray-700">400 - Bad Request</td>
                  <td className="p-2 border-t border-gray-700">The request was invalid or cannot be served.</td>
                </tr>
                <tr>
                  <td className="p-2 border-t border-gray-700">401 - Unauthorized</td>
                  <td className="p-2 border-t border-gray-700">The request requires authentication.</td>
                </tr>
                <tr>
                  <td className="p-2 border-t border-gray-700">403 - Forbidden</td>
                  <td className="p-2 border-t border-gray-700">The server understood the request but refuses to authorize it.</td>
                </tr>
                <tr>
                  <td className="p-2 border-t border-gray-700">404 - Not Found</td>
                  <td className="p-2 border-t border-gray-700">The requested resource could not be found.</td>
                </tr>
                <tr>
                  <td className="p-2 border-t border-gray-700">429 - Too Many Requests</td>
                  <td className="p-2 border-t border-gray-700">You have exceeded the rate limit.</td>
                </tr>
                <tr>
                  <td className="p-2 border-t border-gray-700">500 - Internal Server Error</td>
                  <td className="p-2 border-t border-gray-700">The server encountered an unexpected condition that prevented it from fulfilling the request.</td>
                </tr>
              </tbody>
            </table>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-6">
            <h2 className="text-2xl font-semibold">Subscription Tiers</h2>
            <table className="w-full border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 text-left">Feature</th>
                  <th className="p-2 text-center">Free Plan</th>
                  <th className="p-2 text-center">Pro Plan</th>
                  <th className="p-2 text-center">Enterprise Plan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-t border-gray-700">Basic landmark info</td>
                  <td className="p-2 border-t border-gray-700 text-center">✓</td>
                  <td className="p-2 border-t border-gray-700 text-center">✓</td>
                  <td className="p-2 border-t border-gray-700 text-center">✓</td>
                </tr>
                <tr>
                  <td className="p-2 border-t border-gray-700">Detailed descriptions</td>
                  <td className="p-2 border-t border-gray-700 text-center">✗</td>
                  <td className="p-2 border-t border-gray-700 text-center">✓</td>
                  <td className="p-2 border-t border-gray-700 text-center">✓</td>
                </tr>
                <tr>
                  <td className="p-2 border-t border-gray-700">Historical significance</td>
                  <td className="p-2 border-t border-gray-700 text-center">✗</td>
                  <td className="p-2 border-t border-gray-700 text-center">✓</td>
                  <td className="p-2 border-t border-gray-700 text-center">✓</td>
                </tr>
                <tr>
                  <td className="p-2 border-t border-gray-700">Visitor tips</td>
                  <td className="p-2 border-t border-gray-700 text-center">✗</td>
                  <td className="p-2 border-t border-gray-700 text-center">✓</td>
                  <td className="p-2 border-t border-gray-700 text-center">✓</td>
                </tr>
                <tr>
                  <td className="p-2 border-t border-gray-700">Real-time data</td>
                  <td className="p-2 border-t border-gray-700 text-center">✗</td>
                  <td className="p-2 border-t border-gray-700 text-center">✗</td>
                  <td className="p-2 border-t border-gray-700 text-center">✓</td>
                </tr>
                <tr>
                  <td className="p-2 border-t border-gray-700">Rate limit</td>
                  <td className="p-2 border-t border-gray-700 text-center">100/hour</td>
                  <td className="p-2 border-t border-gray-700 text-center">1000/hour</td>
                  
                  <td className="p-2 border-t border-gray-700 text-center">Unlimited</td>
                </tr>
              </tbody>
            </table>
          </TabsContent>

          <TabsContent value="wrappers" className="space-y-6">
            <h2 className="text-2xl font-semibold">API Wrappers</h2>
            <p>We provide official wrappers for various programming languages to make it easier to integrate with our API:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>JavaScript/TypeScript: <a href="#" className="text-blue-400 hover:underline">npm package</a></li>
            </ul>
            <div className="bg-gray-800 p-4 rounded-lg mt-4">
              <h3 className="text-lg font-semibold mb-2">Example usage (JavaScript/Typescript)</h3>
              <pre className="bg-black p-4 rounded text-sm overflow-x-auto">
                <code>{`
import LandmarkAPI from 'landmark-api-wrapper';

const api = new LandmarkAPI({ apiKey: 'api_key', authKey: 'jwt_auth_key' });


export async function getLandmarks() {
    const landmarks = await api.getLandmarks()
    return landmarks.data;
}

export async function getLandmarksById(id: string) {
    const landmark = await api.getLandmarkById(id)
    return landmark;
}
                `}</code>
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}