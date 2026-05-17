import { OpenAI } from 'openai'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey || apiKey.startsWith('REPLACE_WITH_')) {
    return NextResponse.json({ error: 'OpenAI API key is not configured.' }, { status: 503 })
  }

  const { message } = await req.json()
  if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 })
  const openai = new OpenAI({ apiKey })
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are Aurora Rayes Sleep Agent, an AI assistant. AI-powered sleep optimization. Be helpful, concise, and actionable.' },
      { role: 'user', content: message },
    ],
    max_tokens: 1024,
  })
  return NextResponse.json({ reply: completion.choices[0].message.content })
}
