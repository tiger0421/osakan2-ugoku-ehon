import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: NextRequest) {
  let data: { keywords?: string }
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const keywords = data.keywords?.trim()
  if (!keywords) {
    return NextResponse.json({ error: 'Missing keywords' }, { status: 400 })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 })
  }

  const openai = new OpenAI({ apiKey })
  const prompt = `あなたは絵本作家です。次のキーワードから3~4文程度で子ども向けの短い絵本のあらすじを日本語で書いてください。キーワード: ${keywords}`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 150
    })
    const summary = completion.choices[0]?.message?.content?.trim() || ''
    return NextResponse.json({ summary })
  } catch (error) {
    console.error('generate-summary error:', error)
    if (error instanceof OpenAI.APIError) {
      const message = error.error?.message || error.message
      return NextResponse.json({ error: message }, { status: error.status })
    }
    const message = error instanceof Error ? error.message : 'Failed to generate summary'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
