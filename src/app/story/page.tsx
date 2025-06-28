"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import StoryViewer from '@/components/StoryViewer';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function StoryPage() {
  const router = useRouter();
  const { story, clearStory } = useStore();

  useEffect(() => {
    // ストーリーデータがない場合は作成ページにリダイレクト
    if (!story || !story.pages || story.pages.length === 0) {
      router.replace('/create');
    }
  }, [story, router]);

  const handleGoHome = () => {
    clearStory();
    router.push('/');
  };

  if (!story || !story.pages || story.pages.length === 0) {
    // データがない場合、またはリダイレクトが完了するまでの間に何も表示しない
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-200 via-cyan-200 to-blue-200 p-4 relative">
      <StoryViewer />
      <Button
        onClick={handleGoHome}
        variant="outline"
        className="absolute top-4 left-4 bg-white/80 hover:bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md flex items-center"
      >
        <Home className="mr-2 h-5 w-5" />
        ホームに戻る
      </Button>
    </div>
  );
}
