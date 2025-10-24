'use client'

import { useState } from 'react'
import * as motion from 'motion/react-client'

type Props = {
  sysPrompt: string
}

export default function Main({ sysPrompt }: Props) {
  const [text, setText] = useState('')
  const [result, setResult] = useState<string | null>(null) // OpenAI 응답
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // 페이지 새로고침 막기
    setLoading(true)
    setResult(null)

    // 2️⃣ 서버 route로 전송
    try {
      const res = await fetch('/api/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, sysPrompt }),
      })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await res.json()
      setResult(data.apiResponse.choices[0].message.content)
      setLoading(false)
    } catch (error) {
      console.error('Error submitting form:', error)
      setLoading(false)
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="place-content-center">Main Component</h1>
        <form onSubmit={handleSubmit} className="w-64">
          <div className="relative">
            <motion.input
              type="text"
              value={text}
              initial={{ transform: 'translateX(-100px)', opacity: 0 }}
              animate={{ transform: 'translateX(0px)', opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type something..."
              className="border border-gray-300 rounded-full px-4 py-2 w-full pr-24"
            />
            <motion.button
              type="submit"
              initial={{ transform: 'translateX(-100px)', opacity: 0 }}
              animate={{ transform: 'translateX(0px)', opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="rounded-full absolute right-1 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1.5 hover:bg-blue-600 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? '■' : '↑'}
            </motion.button>
          </div>
        </form>
        {result && (
          <div className="mt-4 p-4 border border-gray-300 rounded w-64">
            <h2 className="font-bold mb-2">Response:</h2>
            <p>{result}</p>
          </div>
        )}
        <p className="mt-4">You typed: {text}</p>
      </main>
    </div>
  )
}
