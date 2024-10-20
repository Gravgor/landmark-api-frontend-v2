'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function Component() {
  const [activeSection, setActiveSection] = useState('introduction')

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'authentication', title: 'Authentication' },
    { id: 'endpoints', title: 'API Endpoints' },
    { id: 'query-parameters', title: 'Query Parameters' },
    { id: 'subscription-tiers', title: 'Subscription Tiers' },
    { id: 'error-handling', title: 'Error Handling' },
    { id: 'rate-limiting', title: 'Rate Limiting' },
  ]

  const MenuItem = ({ id, title }: { id: string, title: string }) => (
    <button
      className={`flex items-center w-full py-2 px-4 text-left hover:bg-gray-100 ${activeSection === id ? 'bg-gray-100 font-semibold' : ''}`}
      onClick={() => setActiveSection(id)}
    >
      {activeSection === id ? <ChevronDown className="w-4 h-4 mr-2" /> : <ChevronRight className="w-4 h-4 mr-2" />}
      {title}
    </button>
  )

  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      {/* Left Sidebar */}
      <nav className="w-64 border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          {sections.map((section) => (
            <MenuItem key={section.id} id={section.id} title={section.title} />
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Landmark API Documentation</h1>

          {activeSection === 'introduction' && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="mb-4">
                Welcome to the Landmark API documentation. This API provides detailed information about landmarks worldwide, including historical sites, monuments, and points of interest.
              </p>
              <h3 className="text-xl font-semibold mb-2">Features</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Comprehensive landmark details</li>
                <li>Geolocation data</li>
                <li>Historical information</li>
                <li>Visitor information</li>
                <li>Advanced querying capabilities</li>
              </ul>
            </section>
          )}

          {activeSection === 'authentication' && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
              <p className="mb-4">The Landmark API uses JWT-based authentication. To access protected endpoints, you need to include your API key in the request headers.</p>
              <h3 className="text-xl font-semibold mb-2">Register a new user</h3>
              <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
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
              <h3 className="text-xl font-semibold mb-2">Login</h3>
              <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
                <code>{`
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
                `}</code>
              </pre>
            </section>
          )}

{activeSection === 'endpoints' && (
  <section>
    <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
    <h3 className="text-xl font-semibold mb-2">Get all landmarks</h3>
    <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
      <code>{`
GET /api/v1/landmarks
X-API-Key: <your_api_key>
      `}</code>
    </pre>
    <h3 className="text-xl font-semibold mb-2">Get landmark by ID</h3>
    <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
      <code>{`
GET /api/v1/landmarks/{id}
X-API-Key: <your_api_key>
      `}</code>
    </pre>
    <h3 className="text-xl font-semibold mb-2">Get landmarks by country</h3>
    <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
      <code>{`
GET /api/v1/landmarks/country/{country}
X-API-Key: <your_api_key>
      `}</code>
    </pre>
    <h3 className="text-xl font-semibold mb-2">Search landmarks by name</h3>
    <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
      <code>{`
GET /api/v1/landmarks/name/{name}
X-API-Key: <your_api_key>
      `}</code>
    </pre>
    <h3 className="text-xl font-semibold mb-2">Search landmarks by coordinates and radius</h3>
    <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
      <code>{`
GET /api/v1/landmarks/nearby
X-API-Key: <your_api_key>

Query Parameters:
  lat: Latitude (required)
  lon: Longitude (required)
  radius: Search radius in kilometers (optional, default: 10)

Example:
GET /api/v1/landmarks/nearby?lat=48.8584&lon=2.2945&radius=5
      `}</code>
    </pre>
    <p className="mb-4">
      This endpoint allows you to search for landmarks within a specified radius of given coordinates. 
      The 'lat' and 'lon' parameters are required, while 'radius' is optional and defaults to 10 km if not provided.
    </p>
    <h3 className="text-xl font-semibold mb-2">Search landmarks by category</h3>
    <pre className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
      <code>{`
GET /api/v1/landmarks/category/{category}
X-API-Key: <your_api_key>

Example:
GET /api/v1/landmarks/category/museum
      `}</code>
    </pre>
    <p className="mb-4">
      This endpoint allows you to search for landmarks by their category. Replace {'{category}'} with the desired category name.
      Common categories include: museum, monument, park, religious_site, historical_building, etc.
    </p>
  </section>
)}

          {activeSection === 'query-parameters' && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Query Parameters</h2>
              <p className="mb-4">The following query parameters are available for the GET /api/v1/landmarks endpoint:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>limit</strong>: Number of results to return (default: 10)</li>
                <li><strong>offset</strong>: Number of results to skip (default: 0)</li>
                <li><strong>sort</strong>: Field to sort by (e.g., "name" or "-name" for descending order)</li>
                <li><strong>fields</strong>: Comma-separated list of fields to include in the response</li>
                <li><strong>country</strong>: Filter landmarks by country</li>
                <li><strong>category</strong>: Filter landmarks by category</li>
              </ul>
            </section>
          )}

          {activeSection === 'subscription-tiers' && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Subscription Tiers</h2>
              <table className="w-full border-collapse border border-gray-300 mb-6">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Feature</th>
                    <th className="border border-gray-300 p-2">Free Plan</th>
                    <th className="border border-gray-300 p-2">Pro Plan</th>
                    <th className="border border-gray-300 p-2">Enterprise Plan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Basic landmark info</td>
                    <td className="border border-gray-300 p-2 text-center">✓</td>
                    <td className="border border-gray-300 p-2 text-center">✓</td>
                    <td className="border border-gray-300 p-2 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Detailed descriptions</td>
                    <td className="border border-gray-300 p-2 text-center">✗</td>
                    <td className="border border-gray-300 p-2 text-center">✓</td>
                    <td className="border border-gray-300 p-2 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Historical significance</td>
                    <td className="border border-gray-300 p-2 text-center">✗</td>
                    <td className="border border-gray-300 p-2 text-center">✓</td>
                    <td className="border border-gray-300 p-2 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Visitor tips</td>
                    <td className="border border-gray-300 p-2 text-center">✗</td>
                    <td className="border border-gray-300 p-2 text-center">✓</td>
                    <td className="border border-gray-300 p-2 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Real-time data</td>
                    <td className="border border-gray-300 p-2 text-center">✗</td>
                    <td className="border border-gray-300 p-2 text-center">✗</td>
                    <td className="border border-gray-300 p-2 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Rate limit</td>
                    <td className="border border-gray-300 p-2 text-center">100/hour</td>
                    <td className="border border-gray-300 p-2 text-center">1000/hour</td>
                    <td className="border border-gray-300 p-2 text-center">Unlimited</td>
                  </tr>
                </tbody>
              </table>
            </section>
          )}

          {activeSection === 'error-handling' && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Error Handling</h2>
              <p className="mb-4">The API uses conventional HTTP response codes to indicate the success or failure of an API request.</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>200 - OK</strong>: The request was successful.</li>
                <li><strong>400 - Bad Request</strong>: The request was invalid or cannot be served.</li>
                <li><strong>401 - Unauthorized</strong>: The request requires authentication.</li>
                <li><strong>403 - Forbidden</strong>: The server understood the request but refuses to authorize it.</li>
                <li><strong>404 - Not Found</strong>: The requested resource could not be found.</li>
                <li><strong>429 - Too Many Requests</strong>: You have exceeded the rate limit.</li>
                <li><strong>500 - Internal Server Error</strong>: The server encountered an unexpected condition that prevented it from fulfilling the request.</li>
              </ul>
            </section>
          )}

          {activeSection === 'rate-limiting' && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Rate Limiting</h2>
              <p className="mb-4">Rate limiting is implemented to ensure fair usage of the API. The limits vary based on your subscription tier:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Free Plan</strong>: 100 requests per hour</li>
                <li><strong>Pro Plan</strong>: 1000 requests per hour</li>
                <li><strong>Enterprise Plan</strong>: Unlimited requests</li>
              </ul>
              <p className="mb-4">If you exceed your rate limit, you'll receive a 429 Too Many Requests response. The response will include a Retry-After header indicating how long to wait before making another request.</p>
            </section>
          )}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-64 border-l border-gray-200 p-4 overflow-y-auto">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">On this page</h3>
          <ul className="space-y-2 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <Link
                  href={`#${section.id}`}
                  className={`text-gray-600 hover:text-gray-900 ${activeSection === section.id ? 'font-semibold' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveSection(section.id)
                  }}
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Additional resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900 flex items-center">
                API Reference
                <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900 flex items-center">
                Changelog
                <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900 flex items-center">
                Community Forum
                <ExternalLink className="w-3 h-3 ml-1" />
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}