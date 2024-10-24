"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const changelogEntries = [
  {
    version: "Alpha 1.0",
    date: "October 24, 2024",
    changes: [
      "Major Alpha release with fixed performance, more landmark data",
      "Changed authorization from JWT + API key to only API key one per user",
      "Added support for real-time landmark updates",
      "Improved Redis caching implementation",
      "Enhanced PostgreSQL backend performance"
    ],
    type: "major",
    isLatest: true
  },
  {
    version: "Alpha 0.9",
    date: "October 10, 2024",
    changes: [
      "Beta testing phase completed",
      "Implemented advanced search functionality",
      "Added support for multiple countries",
      "Enhanced API documentation"
    ],
    type: "feature",
    isLatest: false
  }
];

export default function Changelog() {
  return (
    <div className="min-h-screen bg-[#0a0c14] text-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Changelog
          </h1>
          <p className="text-gray-400 mb-8">
            Keep track of updates and improvements to the Landmark API
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/docs">
              <Button className="bg-blue-600 hover:bg-blue-700">
                View Documentation
              </Button>
            </Link>
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              Get API Key
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {changelogEntries.map((entry, index) => (
            <Card key={index} className="bg-[#151823] border border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl text-gray-100">
                  <div className="flex items-center gap-3">
                    <span>v{entry.version}</span>
                    {entry.isLatest && (
                      <Badge className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20">
                        Latest
                      </Badge>
                    )}
                  </div>
                </CardTitle>
                <span className="text-sm text-gray-500">{entry.date}</span>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {entry.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-start gap-3">
                      <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
                      <span className="text-gray-300">{change}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}