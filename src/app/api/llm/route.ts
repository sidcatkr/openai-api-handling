import { NextResponse } from 'next/server'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export async function POST(request: Request) {
  const { text, sysPrompt } = await request.json()
  console.log('Received sysPrompt:', sysPrompt)
  const AKASH_API_KEY = process.env.AKASH_API_KEY
  const client = axios.create({
    baseURL: 'https://chatapi.akash.network/api/v1',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${AKASH_API_KEY}`,
    },
  })

  async function chat() {
    try {
      const response = await client.post('/chat/completions', {
        model: 'gpt-oss-120b',
        messages: [
          {
            role: 'system',
            content: sysPrompt,
          },
          {
            role: 'user',
            content: text,
          },
        ],
      })
      return response.data
    } catch (error) {
      console.error('Error communicating with Akash API:', error)
      throw error
    }
  }

  const apiResponse = await chat()
  return NextResponse.json({ apiResponse })
}
