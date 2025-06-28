"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Home Iconは story/page.tsx に移動
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StoryPage } from '@/components/StoryPage'; // StoryPageコンポーネントのパスは正しい
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

interface StoryViewerProps {
  className?: string;
}

export default function StoryViewer({ className }: StoryViewerProps) { // default export に変更
  const { 
    story, // currentStory から story に変更
    currentPageIndex, 
    nextPage, 
    previousPage, 
    // setCurrentStory は clearStory に置き換えられ、上位の page.tsx で管理
  } = useStore();

  // キーボード操作のイベントリスナーを useEffect で設定
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!story) return;
      const canGoNext = currentPageIndex < story.pages.length - 1;
      const canGoPrevious = currentPageIndex > 0;

      if (event.key === 'ArrowRight' && canGoNext) {
        nextPage();
      } else if (event.key === 'ArrowLeft' && canGoPrevious) {
        previousPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [nextPage, previousPage, currentPageIndex, story]);


  if (!story) {
    // このコンポーネントは story がある前提で表示されるため、
    // story/page.tsx で story がない場合はリダイレクトされる。
    // 理論上ここには到達しないはずだが、念のためフォールバック。
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">物語のデータが見つかりません。</p>
      </div>
    );
  }

  const progressValue = ((currentPageIndex + 1) / story.pages.length) * 100;
  const canGoNext = currentPageIndex < story.pages.length - 1;
  const canGoPrevious = currentPageIndex > 0;

  return (
    <div 
      className={cn("flex flex-col h-full w-full bg-gradient-to-br from-yellow-50 via-pink-50 to-sky-50", className)}
      // onKeyDown は window event listener に置き換え
      tabIndex={-1} // フォーカス可能にするが、通常は不要
    >
      {/* Header: タイトルとプログレスバー */}
      <div className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-md shadow-sm">
        <div className="w-20" /> {/* 左側のスペース確保（ホームボタンは上位コンポーネントへ） */}
        
        <div className="flex-1 mx-4 text-center">
          <h1 className="text-xl md:text-2xl font-bold text-pink-600 truncate">
            {story.title}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <Progress value={progressValue} className="w-full h-2 bg-pink-200 [&>div]:bg-pink-500" />
            <span className="text-xs text-gray-600 min-w-fit">
              {currentPageIndex + 1} / {story.pages.length}
            </span>
          </div>
        </div>

        <div className="w-20" /> {/* 右側のスペース確保 */}
      </div>

      {/* Story Content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <StoryPage
            key={currentPageIndex} // page.id がないため currentPageIndex を key に
            page={story.pages[currentPageIndex]}
            // isActive は常に true として扱う（AnimatePresenceが制御）
            className="absolute inset-0"
          />
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-around p-4 bg-white/70 backdrop-blur-md shadow-sm">
        <Button
          variant="outline"
          size="lg"
          onClick={previousPage}
          disabled={!canGoPrevious}
          className="flex items-center gap-2 text-lg px-6 py-3 rounded-lg shadow hover:bg-pink-50 disabled:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6" />
          まえへ
        </Button>

        {/* ページドットインジケーターはシンプル化のため一旦削除、必要なら後で追加 */}
        {/* <div className="flex gap-2">
          {story.pages.map((_, index) => (
            <motion.div
              key={index}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors",
                index === currentPageIndex ? "bg-pink-500" : "bg-gray-300 hover:bg-gray-400"
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => useStore.setState({ currentPageIndex: index })} // 直接 state を更新するのは非推奨な場合がある
            />
          ))}
        </div> */}

        <Button
          variant="outline"
          size="lg"
          onClick={nextPage}
          disabled={!canGoNext}
          className="flex items-center gap-2 text-lg px-6 py-3 rounded-lg shadow hover:bg-pink-50 disabled:bg-gray-100"
        >
          つぎへ
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
