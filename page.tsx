"use client"

import { useMotivationData } from './hooks/useMotivationData'
import MotivationGraph from './components/MotivationGraph'

export default function Home() {
  const { motivationData, addMotivationRecord } = useMotivationData()

  return (
    <main className="min-h-screen bg-[#F5E6D3] p-8">
      <h1 className="text-3xl font-bold text-[#8B4513] mb-8">Motivation Tracker</h1>
      <MotivationGraph 
        data={motivationData} 
        onRecordAdd={addMotivationRecord}
      />
    </main>
  )
}

