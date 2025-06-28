"use client"

import { useCallback, useState } from 'react'
import { StoryViewer } from '@/components/StoryViewer'
import { ImageUpload } from '@/components/ImageUpload'
import { useStore } from '@/store/useStore'
import type { Story } from '@/types'

function generateSampleStory(): Story {
  const id = Date.now().toString()
  return {
    id,
    title: 'サンプル絵本',
    childName: 'たろう',
    createdAt: new Date(),
    pages: [
      {
        id: `${id}-1`,
        text: 'こんにちは！これはサンプルページ１です。',
        imageUrl: '/globe.svg',
        animation: 'fadeIn'
      },
      {
        id: `${id}-2`,
        text: 'ページ２では次のシーンが登場します。',
        imageUrl: '/window.svg',
        animation: 'slideLeft'
      },
      {
        id: `${id}-3`,
        text: 'おしまい。見てくれてありがとう！',
        imageUrl: '/file.svg',
        animation: 'zoom'
      }
    ]
  }
}

export default function HomePage() {
  const [storyText, setStoryText] = useState('')
  const {
    currentStory,
    setCurrentStory,
    uploadedImages,
    isGenerating,
    setIsGenerating
  } = useStore()

  const handleCreate = useCallback(() => {
    const story = generateSampleStory()
    setCurrentStory(story)
  }, [setCurrentStory])

  const handleGenerate = useCallback(async () => {
    if (!uploadedImages.child || !storyText.trim()) return

    setIsGenerating(true)
    const formData = new FormData()
    formData.append('image', uploadedImages.child)
    formData.append('story', storyText)

    const res = await fetch('/api/generate-images', {
      method: 'POST',
      body: formData
    })

    if (!res.ok) {
      setIsGenerating(false)
      return
    }

    const data = await res.json()
    const urls: string[] = data.urls || []
    const lines = storyText.split('\n').filter(Boolean)
    const id = Date.now().toString()
    const pages = urls.map((url, i) => ({
      id: `${id}-${i}`,
      text: lines[i] || '',
      imageUrl: url,
      animation: 'fadeIn' as const
    }))

    const story: Story = {
      id,
      title: 'AI絵本',
      childName: 'child',
      createdAt: new Date(),
      pages
    }

    setCurrentStory(story)
    setIsGenerating(false)
  }, [uploadedImages.child, storyText, setCurrentStory, setIsGenerating])

  if (currentStory) {
    return <StoryViewer className="h-screen" />
  }

  return (
    <div
      style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}
    >
      <h1 style={{ color: '#333', fontSize: '32px', marginBottom: '20px' }}>
        動く絵本アプリ
      </h1>
      <p style={{ color: '#666', fontSize: '18px', marginBottom: '20px' }}>
        子ども向けの動きのあるイラスト付き絵本をWebアプリとして提供するサービスです。
      </p>

      <div style={{ marginBottom: '20px' }}>
        <ImageUpload type="child" />
      </div>

      <textarea
        value={storyText}
        onChange={(e) => setStoryText(e.target.value)}
        rows={4}
        placeholder="1行ずつ4ページ分の物語を入力してください"
        style={{
          width: '100%',
          padding: '8px',
          marginBottom: '20px',
          borderRadius: '6px'
        }}
      />

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        style={{
          backgroundColor: '#8B5CF6',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          opacity: isGenerating ? 0.6 : 1
        }}
      >
        {isGenerating ? '生成中...' : '絵本を生成'}
      </button>

      <div style={{ marginTop: '40px' }}>
        <button
          onClick={handleCreate}
          style={{
            backgroundColor: '#aaa',
            color: 'white',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          サンプルを表示
        </button>
      </div>
    </div>
  )
}
