"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { StoryPage as StoryPageType, AnimationType } from '@/types';
import { cn } from '@/lib/utils';
import { BookText } from 'lucide-react'; // アイコンを追加

interface StoryPageProps {
  page: StoryPageType;
  // isActive は AnimatePresence で管理されるため不要に
  className?: string;
}

// アニメーションの定義は README に記載のものをベースに調整
const animationVariants = {
  fadeIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  slideLeft: { // 右から入って左に抜ける
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  slideRight: { // 左から入って右に抜ける
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  bounce: { // 少し跳ねる感じ
    initial: { y: 50, opacity: 0, scale: 0.8 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: { y: -50, opacity: 0, scale: 0.8 },
    transition: { type: "spring", stiffness: 300, damping: 20, duration: 0.6 }
  },
  zoom: { // ズームイン・アウト
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  float: { // ふわっと浮き上がる
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -30, opacity: 0 },
    transition: { duration: 0.7, ease: "circOut" }
  }
};

export function StoryPage({ page, className }: StoryPageProps) {
  // animation プロパティがない場合や、定義にないアニメーションタイプが指定された場合のフォールバック
  const selectedAnimation: AnimationType = (page.animation && animationVariants[page.animation]) ? page.animation : 'fadeIn';
  const variant = animationVariants[selectedAnimation];

  // page.id がオプショナルになったため、存在しない場合のフォールバックキー (実際にはStoryViewerでindexをkeyにしている)
  // const pageKey = page.id || `page-${Math.random()}`;

  return (
    <motion.div
      // key={pageKey} // StoryViewerで key={currentPageIndex} が設定されているのでここでは不要
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variant} // variants を直接指定
      transition={variant.transition} // 各アニメーション定義に transition を含める
      className={cn(
        "flex flex-col items-center justify-center h-full p-6 md:p-10 text-center",
        className
      )}
    >
      {/* Illustration Area: 今回の最小要件では画像表示は必須ではないため、テキスト中心の表示を優先 */}
      {page.imageUrl ? (
        <div className="flex-1 flex items-center justify-center mb-6 w-full max-w-lg">
          <motion.img
            src={page.imageUrl}
            alt={`物語の挿絵`} // altテキストは汎用的に
            className="max-w-full max-h-[50vh] object-contain rounded-xl shadow-2xl bg-white p-2"
            // 画像自体のアニメーションはシンプルに
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        </div>
      ) : (
        // 画像がない場合は、テキストがより中央に来るように調整
        <div className="flex-1 flex items-center justify-center w-full">
          {/* 画像がない場合のプレースホルダー (例: アイコン) */}
           <BookText className="w-24 h-24 text-pink-300 opacity-50" />
        </div>
      )}

      {/* Text Area */}
      <motion.div
        className="w-full max-w-2xl mt-auto" // 画面下部にテキストを配置
        // テキストエリア用のアニメーション（ページ遷移とは独立して良い）
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (page.imageUrl ? 0.3 : 0.1), duration: 0.6 }} // 画像があれば少し遅れて表示
      >
        <p
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 leading-relaxed
                     bg-white/80 backdrop-blur-lg rounded-xl p-6 md:p-8 shadow-xl"
          style={{ lineHeight: '1.8' }} // 行間を広めに
        >
          {page.text}
        </p>
      </motion.div>
    </motion.div>
  );
}
