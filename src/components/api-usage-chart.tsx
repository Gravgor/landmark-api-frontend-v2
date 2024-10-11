'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Adventure {
  ID: number
  UserID: string
  Endpoint: string
  Method: string
  Status: string
  StatusCode: number
  Summary: string
  Timestamp: string
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
}

interface ApiUsageData {
  date: string
  calls: number
}

interface ApiUsageChartProps {
  adventures: Adventure[]
}

export default function ApiUsageChart({ adventures }: ApiUsageChartProps) {
  const chartData = useMemo(() => {
    const dailyUsage: { [key: string]: number } = {}

    adventures.forEach(adventure => {
      const date = new Date(adventure.Timestamp).toISOString().split('T')[0]
      dailyUsage[date] = (dailyUsage[date] || 0) + 1
    })

    const sortedDates = Object.keys(dailyUsage).sort()
    return sortedDates.map(date => ({
      date,
      calls: dailyUsage[date]
    }))
  }, [adventures])

  return (
    <Card className="w-full h-full bg-gray-900 border-none">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-white">API Usage Over Time 📈</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            calls: {
              label: "API Calls",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                stroke="rgba(255,255,255,0.5)"
              />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <ChartTooltip 
                content={
                  <ChartTooltipContent 
                  />
                }
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="calls" 
                stroke="hsl(var(--chart-1))" 
                name="API Calls" 
                strokeWidth={2}
                dot={{ r: 4, fill: "hsl(var(--chart-1))" }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}