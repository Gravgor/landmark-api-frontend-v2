"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Link from "next/link"

const changelogEntries = [
  {
    version: "Alpha 1.0",
    date: "October 24, 2024",
    changes: [
      "Major Alpha release with fixed performance, more landmark data.",
      "Changed authorization from JWT + API key to only API key one per user",
      
    ],
    isLatest: true
  }
];

export default function Changelog() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100">
      <header className="py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Landmark API Changelog</h1>
        <p className="text-xl text-gray-400 mb-6">Stay updated with our latest features and improvements for landmark identification and exploration</p>
       <Link href="/docs">
       <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          View API Documentation
        </Button>
       </Link>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8">
          {changelogEntries.map((entry, index) => (
            <motion.div
              key={entry.version}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="bg-[#1e2430] border-none">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center justify-between">
                    <span >Version {entry.version}</span>
                    {entry.isLatest && <Badge variant="secondary">Latest</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    {entry.changes.map((change, changeIndex) => (
                      <li key={changeIndex}>{change}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">Released on: {entry.date}</p>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}