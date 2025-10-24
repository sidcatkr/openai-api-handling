'use client'

import { useState } from 'react'
import Main from '@/ask/components/main'
import SideMenu from '@/ask/components/sidemenu'

export default function Home() {
  const [sysPrompt, setSysPrompt] = useState('')

  return (
    <>
      <SideMenu sysPrompt={sysPrompt} setSysPrompt={setSysPrompt} />
      <Main sysPrompt={sysPrompt} />
    </>
  )
}
