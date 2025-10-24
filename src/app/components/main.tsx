'use client'

import * as motion from 'motion/react-client'
import Link from 'next/link'

export default function Main() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="justify-items-center place-content-center text-center">
          Main Component
        </h1>
        <Link href="/ask">
          <motion.button
            className="bg-blue-500 text-white px-4 py-2 rounded-full place-self-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Click Me
          </motion.button>
        </Link>
      </main>
    </div>
  )
}
