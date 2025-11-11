import React from 'react'
import Header from './components/Header'
import ChatBox from './components/ChatBox'

export default function App(){
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <Header />
        <ChatBox />
      </div>
    </div>
  )
}
