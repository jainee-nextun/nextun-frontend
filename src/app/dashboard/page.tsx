'use client'
import React from 'react'
import Sidebar from '../components/layout/Sidebar'

const page = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#FAFAFE] p-8">Dashboard Page</main>
    </div>
  )
}

export default page