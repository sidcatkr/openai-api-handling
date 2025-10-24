'use client'

import { useState } from 'react'
import * as motion from 'motion/react-client'
import { AnimatePresence } from 'motion/react'

type Props = { sysPrompt: string; setSysPrompt: (prompt: string) => void }

export default function SideMenu({ sysPrompt, setSysPrompt }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // You can add functionality to handle the system prompt here

    try {
      const res = await fetch('/api/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sysPrompt }),
      })
      if (!res.ok) {
        throw new Error('Network response was not ok')
      }
      await res.json()
    } catch (error) {
      console.error('Error submitting system prompt:', error)
    }
  }

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="sidemenu bg-gray-800 p-40 float-left"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <h2>Side Menu</h2>
            <form onSubmit={handleSubmit}>
              <motion.input
                type="text"
                value={sysPrompt}
                onChange={(e) => setSysPrompt(e.target.value)}
                initial={{ transform: 'translateX(-100px)', opacity: 0 }}
                animate={{ transform: 'translateX(0px)', opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                placeholder="System Prompt"
                className="border border-gray-300 rounded-full px-4 py-2 w-64"
              />
            </form>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
