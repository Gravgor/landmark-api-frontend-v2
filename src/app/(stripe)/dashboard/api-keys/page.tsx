"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Plus, Trash2, Copy, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

const initialKeys = [
  { name: "Production Key", key: "prod_1234567890abcdef", created: "2023-05-15", lastUsed: "2023-06-01" },
  { name: "Development Key", key: "dev_0987654321fedcba", created: "2023-06-01", lastUsed: "2023-06-10" },
]

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState(initialKeys)
  const [newKeyName, setNewKeyName] = useState("")
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({})

  const addNewKey = () => {
    if (newKeyName) {
      const newKey = {
        name: newKeyName,
        key: `key_${Math.random().toString(36).substr(2, 9)}`,
        created: new Date().toISOString().split('T')[0],
        lastUsed: "-"
      }
      setApiKeys([...apiKeys, newKey])
      setNewKeyName("")
    }
  }

  const deleteKey = (keyToDelete: string) => {
    setApiKeys(apiKeys.filter(key => key.key !== keyToDelete))
  }

  const toggleKeyVisibility = (key: string) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Code className="mr-2" /> API Keys
        </h1>
        <div className="bg-gray-900 rounded-lg shadow-xl border border-blue-500/20 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Create New API Key</h2>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Enter key name"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={addNewKey}>
              <Plus className="h-4 w-4 mr-2" /> Add Key
            </Button>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg shadow-xl border border-blue-500/20 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey, index) => (
                <TableRow key={index}>
                  <TableCell>{apiKey.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Input
                        type={showKeys[apiKey.key] ? "text" : "password"}
                        value={apiKey.key}
                        readOnly
                        className="mr-2"
                      />
                      <Button variant="ghost" size="sm" onClick={() => toggleKeyVisibility(apiKey.key)}>
                        {showKeys[apiKey.key] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>{apiKey.created}</TableCell>
                  <TableCell>{apiKey.lastUsed}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(apiKey.key)}>
                      <Copy className="h-4 w-4 mr-1" /> Copy
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteKey(apiKey.key)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
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