"use client"

import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MotivationRecord } from '../hooks/useMotivationData'
import MotivationRecordForm from './MotivationRecordForm'

interface MotivationGraphProps {
  data: MotivationRecord[]
  onRecordAdd: (record: MotivationRecord) => void
}

export default function MotivationGraph({ data, onRecordAdd }: MotivationGraphProps) {
  const [view, setView] = useState<'day' | 'year'>('day')
  const [startDate, setStartDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const generateEmptyDataPoints = (start: Date, isDay: boolean) => {
    const points = [];
    if (isDay) {
      for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        points.push({
          date,
          motivation: null
        });
      }
    } else {
      for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setFullYear(start.getFullYear() + i);
        points.push({
          date,
          motivation: null
        });
      }
    }
    return points;
  };

  const processedData = useMemo(() => {
    const validData = data
      .map(record => ({
        ...record,
        date: new Date(record.date),
      }))
      .filter(record => record.date instanceof Date && !isNaN(record.date.getTime()));
    
    const emptyPoints = generateEmptyDataPoints(startDate, view === 'day');
    
    return emptyPoints.map(empty => {
      const match = validData.find(record => {
        if (view === 'day') {
          return record.date.toDateString() === empty.date.toDateString();
        } else {
          return record.date.getFullYear() === empty.date.getFullYear();
        }
      });
      return match || empty;
    });
  }, [data, startDate, view]);

  const formatDate = (date: Date | string | number) => {
    const validDate = new Date(date);
    if (isNaN(validDate.getTime())) {
      return 'Invalid Date';
    }
    if (view === 'day') {
      const month = (validDate.getMonth() + 1).toString();
      const day = validDate.getDate().toString();
      return `${month}/${day}`;
    }
    return validDate.getFullYear().toString();
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newDate = new Date(startDate);
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'prev' ? -7 : 7));
    } else {
      newDate.setFullYear(newDate.getFullYear() + (direction === 'prev' ? -7 : 7));
    }
    setStartDate(newDate);
  };

  const getDateRange = () => {
    if (view === 'day') {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    } else {
      const endYear = startDate.getFullYear() + 6;
      return `${startDate.getFullYear()} - ${endYear}`;
    }
  };

  const handleGraphClick = (event: React.MouseEvent<SVGElement>) => {
    const svg = event.target instanceof SVGElement 
      ? event.target.closest('svg') 
      : null;

    if (svg) {
      const rect = svg.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const width = rect.width;
      const dayIndex = Math.floor((x / width) * 7);
      
      const clickedDate = new Date(startDate);
      if (view === 'day') {
        clickedDate.setDate(startDate.getDate() + dayIndex);
      } else {
        clickedDate.setFullYear(startDate.getFullYear() + dayIndex);
      }
      
      setSelectedDate(clickedDate);
      setIsFormOpen(true);
    }
  };

  return (
    <>
      <Card className="bg-[#FFF8DC] border-[#DEB887]">
        <CardHeader>
          <CardTitle className="text-[#8B4513]">Motivation Graph</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="day" onValueChange={(value) => {
            setView(value as 'day' | 'year');
            setStartDate(new Date());
          }}>
            <TabsList className="mb-4">
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
            <div className="flex justify-between items-center mb-4">
              <Button onClick={() => handleNavigate('prev')} variant="outline" className="bg-[#DEB887] text-[#8B4513] hover:bg-[#D2B48C]">
                <ChevronLeft className="h-4 w-4" />
                {view === 'day' ? 'Previous Week' : 'Previous 7 Years'}
              </Button>
              <span className="text-[#8B4513] font-bold">
                {getDateRange()}
              </span>
              <Button onClick={() => handleNavigate('next')} variant="outline" className="bg-[#DEB887] text-[#8B4513] hover:bg-[#D2B48C]">
                {view === 'day' ? 'Next Week' : 'Next 7 Years'}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div 
              className="cursor-pointer"
            >
              <ResponsiveContainer width="100%" height={400}>
                <LineChart 
                  data={processedData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                  onClick={handleGraphClick as React.MouseEventHandler<SVGElement>}
                >
                  <CartesianGrid 
                    strokeDasharray="0" 
                    stroke="#D2B48C" 
                    horizontal={true}
                    vertical={true}
                  />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate} 
                    stroke="#8B4513"
                    interval={0}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    domain={[1, 5]} 
                    stroke="#8B4513"
                    ticks={[1, 2, 3, 4, 5]}
                    interval={0}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    labelFormatter={(value) => formatDate(new Date(value))}
                    contentStyle={{ backgroundColor: '#FFF8DC', border: '1px solid #DEB887' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="motivation" 
                    stroke="#8B4513" 
                    activeDot={{ 
                      onClick: (_, payload) => {
                        setSelectedDate(new Date(payload.payload.date));
                        setIsFormOpen(true);
                      }
                    }} 
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      <MotivationRecordForm
        initialDate={selectedDate}
        isOpen={isFormOpen}
        onSubmit={(record) => {
          onRecordAdd(record);
          setIsFormOpen(false);
          setSelectedDate(null);
        }}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedDate(null);
        }}
      />
    </>
  );
}
