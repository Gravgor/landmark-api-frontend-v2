"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Globe, Search, Copy } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const endpoints = [
  { name: "Get User", method: "GET", url: "/api/v1/user", status: "Active" },
  { name: "Create Post", method: "POST", url: "/api/v1/posts", status: "Active" },
  { name: "Update Profile", method: "PUT", url: "/api/v1/profile", status: "Active" },
  { name: "Delete Comment", method: "DELETE", url: "/api/v1/comments", status: "Deprecated" },
  { name: "List Products", method: "GET", url: "/api/v1/products", status: "Active" },
]

export default function EndpointsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEndpoints = endpoints.filter(endpoint =>
    endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    endpoint.url.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Globe className="mr-2" /> API Endpoints
        </h1>
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search endpoints..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="bg-gray-900 rounded-lg shadow-xl border border-blue-500/20 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEndpoints.map((endpoint, index) => (
                <TableRow key={index}>
                  <TableCell>{endpoint.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium
                      ${endpoint.method === 'GET' ? 'bg-green-500/20 text-green-300' :
                        endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-300' :
                        endpoint.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'}`}>
                      {endpoint.method}
                    </span>
                  </TableCell>
                  <TableCell>{endpoint.url}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium
                      ${endpoint.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                      {endpoint.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(endpoint.url)}>
                      <Copy className="h-4 w-4 mr-1" /> Copy URL
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  )
}