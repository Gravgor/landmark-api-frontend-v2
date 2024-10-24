'use client'

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";

interface Adventure {
  ID: number;
  UserID: string;
  Endpoint: string;
  Method: string;
  Status: string;
  StatusCode: number;
  Summary: string;
  Timestamp: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
}

interface ApiUsageData {
  date: string;
  calls: number;
}

interface ApiUsageChartProps {
  adventures?: Adventure[];
  isLoading?: boolean;
}

const ChartSkeleton = () => (
  <div className="space-y-3">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-[200px] w-full" />
  </div>
);

export default function ApiUsageChart({ adventures = [], isLoading = false }: ApiUsageChartProps) {
  const chartData = useMemo(() => {
    const dailyUsage: { [key: string]: number } = {};
    
    adventures.forEach(adventure => {
      const date = new Date(adventure.Timestamp).toISOString().split('T')[0];
      dailyUsage[date] = (dailyUsage[date] || 0) + 1;
    });
    
    const sortedDates = Object.keys(dailyUsage).sort();
    return sortedDates.map(date => ({
      date,
      calls: dailyUsage[date]
    }));
  }, [adventures]);

  return (
    <Card className="bg-[#0B0D15] border-[#1F2333]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium text-white">
          API Usage Over Time 📈
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <CartesianGrid 
                  stroke="rgba(31, 35, 51, 0.7)"
                  strokeDasharray="3 3" 
                  vertical={false}
                />
                <XAxis 
                  dataKey="date"
                  stroke="rgba(255, 255, 255, 0.5)"
                  tickFormatter={(value) => new Date(value).toLocaleDateString()}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="rgba(255, 255, 255, 0.5)"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2333',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px'
                  }}
                  labelStyle={{ color: 'rgba(255, 255, 255, 0.7)' }}
                  itemStyle={{ color: '#3B82F6' }}
                  formatter={(value) => [`${value} calls`]}
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                />
                <Line
                  type="monotone"
                  dataKey="calls"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{
                    fill: '#3B82F6',
                    strokeWidth: 0,
                    r: 4
                  }}
                  activeDot={{
                    fill: '#3B82F6',
                    strokeWidth: 2,
                    stroke: '#0B0D15',
                    r: 6
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}