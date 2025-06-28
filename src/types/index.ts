export interface StoryPage {
  // id: string; // 生成時に動的に割り振るか、必須でなくすことを検討
  text: string;
  imageUrl?: string; // 今回の最小要件では使用しないが、拡張性のため残す
  animation?: AnimationType; // 同上
}

export interface Story {
  // id: string; // 生成時に動的に割り振るか、必須でなくすことを検討
  title: string;
  pages: StoryPage[];
  childName: string;
  parentName?: string;
  // createdAt: Date; // 生成時に設定する想定だが、今回の最小要件では必須としない
}

export interface Character {
  id: string;
  name: string;
  imageUrl: string;
  role: 'protagonist' | 'companion' | 'antagonist';
}

export type AnimationType =
  | 'fadeIn'
  | 'slideLeft'
  | 'slideRight'
  | 'bounce'
  | 'zoom'
  | 'float';

// AppState は useStore.ts の EhonStoreState に統合・置き換えられたためコメントアウト
// export interface AppState {
//   currentStory: Story | null;
//   currentPageIndex: number;
//   isGenerating: boolean;
//   uploadedImages: {
//     child?: File;
//     parent?: File;
//   };
// }

// EhonStoreState で使用する型をエクスポート (重複を避ける)
// Story と StoryPage は上で定義済み
