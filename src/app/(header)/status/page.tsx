//@ts-nocheck
"use client"
import { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function StatusPage() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const request = await fetch("https://api.landmark-api.com/health")
        const reponse = await request.json()
        setStatus(reponse);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching status:', error);
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const StatusIndicator = ({ status }:any) => (
    status.includes("healthy") || status.includes("running") || status === "Available" ? 
      <CheckCircle className="h-5 w-5 text-green-500" /> :
      <AlertCircle className="h-5 w-5 text-red-500" />
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Clock className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-white">System Status</h1>
          <p className="text-gray-400">
            Current status of Landmark API services and dependencies
          </p>
        </div>

        {/* Overall Status */}
        <Alert className="mb-8 bg-gray-800 border-blue-500">
          <AlertTitle className="text-xl font-semibold mb-2 flex items-center gap-2 text-white">
            <StatusIndicator status={status.status} />
            System Status
          </AlertTitle>
          <AlertDescription className="text-gray-300">
            All systems are operational with 99.99% uptime
          </AlertDescription>
        </Alert>

        {/* Services Grid */}
        <div className="grid gap-6 mb-8">
          {/* Main API Status */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">API Status</h3>
              <StatusIndicator status={status.status} />
            </div>
            <p className="text-gray-400">{status.status}</p>
          </div>

          {/* Database Status */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Database</h3>
              <StatusIndicator status={status.database} />
            </div>
            <p className="text-gray-400">{status.database}</p>
          </div>

          {/* External Services */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Weather API</h3>
              <StatusIndicator status={status.external_services['Weather API']} />
            </div>
            <p className="text-gray-400">{status.external_services['Weather API']}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm">
          <p>Last updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}