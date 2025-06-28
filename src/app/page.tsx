"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpenText, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-rose-100 to-sky-100 p-8 text-center">
      <header className="mb-12">
        <h1 className="text-6xl font-bold text-pink-600 mb-4 animate-bounce">
          動く絵本アプリ
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          ようこそ！お子さまの名前でオリジナルの絵本を簡単に作成できます。
          世界にひとつだけの物語を、素敵なアニメーションとともにお楽しみください。
        </p>
      </header>

      <div className="mb-12">
        <Sparkles className="h-24 w-24 text-yellow-400 mx-auto animate-pulse" />
      </div>

      <Link href="/create" passHref>
        <Button
          size="lg"
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-8 text-2xl rounded-full shadow-xl transition-transform transform hover:scale-110 focus:ring-4 focus:ring-pink-300"
        >
          <BookOpenText className="mr-3 h-8 w-8" />
          絵本を作る
        </Button>
      </Link>

      <footer className="mt-16 text-gray-600">
        <p>&copy; {new Date().getFullYear()} 動く絵本アプリ. All rights reserved.</p>
      </footer>
    </div>
  );
}
