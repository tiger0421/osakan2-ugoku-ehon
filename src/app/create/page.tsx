"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideBaby, LucideUserCircle } from 'lucide-react';

export default function CreateStoryPage() {
  const router = useRouter();
  const { childName, parentName, setChildName, setParentName, setStory } = useStore();
  const [childNameInput, setChildNameInput] = useState(childName || '');
  const [parentNameInput, setParentNameInput] = useState(parentName || '');
  const [error, setError] = useState('');

  const handleGenerateStory = () => {
    if (!childNameInput.trim()) {
      setError('子どもの名前を入力してください。');
      return;
    }
    setError('');
    setChildName(childNameInput);
    setParentName(parentNameInput);

    // README.md の generateSampleStory を参考に絵本データを生成
    const storyPages = [
      { text: `${childNameInput}は、冒険が大好き。` },
      { text: `ある日、${parentNameInput || '素敵な友達'}と一緒に、不思議な森へ出かけました。` },
      { text: "森の奥で、キラキラ光る不思議な花を見つけました。" },
      { text: `${childNameInput}はその花にそっと触れてみました。` },
      { text: "すると、花から優しい光があふれ出し、とっても良い香りがしました。" },
      { text: `「わあ、きれい！」${childNameInput}は目を輝かせました。` },
      { text: `${parentNameInput || '友達'}も一緒に喜びました。「素晴らしい発見だね！」` },
      { text: "二人はその美しい光景をいつまでも忘れませんでした。" },
      { text: `そして、${childNameInput}の冒険はまだまだ続くのでした。おしまい。` },
    ];
    setStory({
      title: `${childNameInput}の冒険`,
      pages: storyPages,
      childName: childNameInput,
      parentName: parentNameInput,
    });

    router.push('/story');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-pink-600">絵本をつくる</CardTitle>
          <CardDescription className="text-gray-600">主人公の名前を教えてね</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="childName" className="text-lg font-medium text-gray-700 flex items-center">
              <LucideBaby className="mr-2 h-5 w-5 text-pink-500" />
              子どもの名前 <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input
              id="childName"
              type="text"
              placeholder="例：さくら"
              value={childNameInput}
              onChange={(e) => setChildNameInput(e.target.value)}
              className="text-lg border-pink-300 focus:border-pink-500 focus:ring-pink-500"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="parentName" className="text-lg font-medium text-gray-700 flex items-center">
              <LucideUserCircle className="mr-2 h-5 w-5 text-purple-500" />
              保護者の名前 (任意)
            </Label>
            <Input
              id="parentName"
              type="text"
              placeholder="例：たろう"
              value={parentNameInput}
              onChange={(e) => setParentNameInput(e.target.value)}
              className="text-lg border-purple-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button
            onClick={handleGenerateStory}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 text-lg rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            絵本を生成する
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
