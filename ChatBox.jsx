import React, { useState } from 'react'

function Message({ from, text }) {
  const isUser = from === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`${isUser ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'} rounded-lg p-3 shadow max-w-[80%]`}>
        <div className="text-sm">{text}</div>
      </div>
    </div>
  )
}

export default function ChatBox(){
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Halo! Saya Gemini BK. Ceritakan perasaanmu hari ini atau pilih topik yang ingin dibahas.' }
  ])
  const send = () => {
    const trimmed = input.trim()
    if(!trimmed) return
    const userMsg = { from: 'user', text: trimmed }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    // Dummy AI response logic (placeholder for real API)
    setTimeout(() => {
      const botReply = generateDummyReply(trimmed)
      setMessages(prev => [...prev, { from: 'bot', text: botReply }])
    }, 700)
  }

  return (
    <div className="bg-transparent">
      <div className="bg-white rounded-2xl shadow-md p-4 h-[60vh] flex flex-col">
        <div className="flex-1 overflow-auto mb-4" id="chat-window">
          {messages.map((m, i) => <Message key={i} from={m.from} text={m.text} />)}
        </div>

        <div className="flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if(e.key === 'Enter') send() }}
            placeholder="Tulis perasaanmu... (contoh: saya cemas tentang ujian)"
            className="flex-1 p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button onClick={send} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Kirim</button>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-600">
        <strong>Catatan:</strong> Ini adalah demo dengan jawaban dummy. Integrasikan API Gemini/OpenAI di backend untuk respons AI nyata.
      </div>
    </div>
  )
}

function generateDummyReply(text){
  const lower = text.toLowerCase()
  if(lower.includes('stres') || lower.includes('cemas') || lower.includes('khawatir')){
    return 'Kedengarannya kamu sedang mengalami kecemasan. Coba tarik napas dalam-dalam, catat apa yang membuatmu cemas, dan pilih satu langkah kecil untuk mengatasinya minggu ini.'
  }
  if(lower.includes('bosan') || lower.includes('tidak termotivasi')){
    return 'Bosan adalah sinyal agar kamu mengganti pendekatan. Coba atur tujuan kecil harian dan rayakan kemajuan kecil itu.'
  }
  if(lower.includes('ujian') || lower.includes('nilai')){
    return 'Ujian bisa menimbulkan tekanan. Mari susun jadwal belajar dengan blok waktu singkat dan istirahat teratur.'
  }
  return 'Terima kasih sudah berbagi — boleh ceritakan lebih lanjut agar saya bisa membantu dengan lebih spesifik?'
}
