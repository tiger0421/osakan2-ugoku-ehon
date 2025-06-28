"use client"

import { useCallback } from 'react'
import { StoryViewer } from '@/components/StoryViewer'
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
  const { currentStory, setCurrentStory } = useStore()

  const handleCreate = useCallback(() => {
    const story = generateSampleStory()
    setCurrentStory(story)
  }, [setCurrentStory])

  if (currentStory) {
    return <StoryViewer className="h-screen" />
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333', fontSize: '32px', marginBottom: '20px' }}>
        動く絵本アプリ
      </h1>
      <p style={{ color: '#666', fontSize: '18px', marginBottom: '20px' }}>
        子ども向けの動きのあるイラスト付き絵本をWebアプリとして提供するサービスです。
      </p>
      <button
        onClick={handleCreate}
        style={{
          backgroundColor: '#8B5CF6',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        絵本を作る
      </button>
    </div>
  )
}
