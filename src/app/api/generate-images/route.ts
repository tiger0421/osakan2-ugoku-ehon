import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const image = formData.get('image') as File | null
  const story = formData.get('story') as string | null

  if (!image || !story) {
    return NextResponse.json({ error: 'Missing image or story' }, { status: 400 })
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

  const prompt = `${story}\nIllustrate this scene for a children's picture book. The main character should resemble the uploaded child photo.`

  try {
    const res = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 4,
      size: '1024x1024'
    })

    const urls = (res.data ?? []).map(d => d.url)

    return NextResponse.json({ urls })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to generate images' }, { status: 500 })
  }
}
