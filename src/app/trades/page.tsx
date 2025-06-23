'use client'
import React from 'react'
import Sidebar from '../components/layout/Sidebar'
import Navbar from '../components/layout/Navbar'

const page = () => {
  return (
    <div className="flex min-h-screen">
      <div className="fixed left-0 top-0 h-full w-64">
      <Sidebar />
      </div>
      <div className="flex-1 flex flex-col ml-64">
      <Navbar />
      <main className="flex-1 bg-[#FAFAFE] dark:bg-[#0D1B47] p-8 overflow-auto">Trades Page</main>
    </div>
    </div>
  )
}

export default page