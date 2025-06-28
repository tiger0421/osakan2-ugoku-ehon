import { create } from 'zustand';
import { Story } from '@/types'; // AppState を直接使わず、必要な型を個別にインポート

// 新しい絵本作成フローに合わせた状態の型定義
interface EhonStoreState {
  childName: string | null;
  parentName: string | null;
  story: Story | null; // 生成された絵本のデータ
  currentPageIndex: number; // 絵本表示時の現在のページインデックス
  // uploadedImages と isGenerating は README の主な機能にはあるが、今回の直接の要求ではないため一旦コメントアウト
  // isGenerating: boolean;
  // uploadedImages: {
  //   child?: File;
  //   parent?: File;
  // };

  setChildName: (name: string) => void;
  setParentName: (name: string) => void;
  setStory: (storyData: Story | null) => void; // setCurrentStory から setStory に名称変更
  setCurrentPageIndex: (index: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  clearStory: () => void; // 絵本データをクリアするアクション
  // setIsGenerating: (isGenerating: boolean) => void;
  // setUploadedImages: (images: { child?: File; parent?: File }) => void;
  resetCreateForm: () => void; // 絵本作成フォームの状態をリセット
}

const initialEhonState = {
  childName: null,
  parentName: null,
  story: null,
  currentPageIndex: 0,
  // isGenerating: false,
  // uploadedImages: {},
};

export const useStore = create<EhonStoreState>((set, get) => ({
  ...initialEhonState,

  setChildName: (name) => set({ childName: name }),
  setParentName: (name) => set({ parentName: name }),
  
  setStory: (storyData) => set({ story: storyData, currentPageIndex: 0, childName: storyData?.childName || null, parentName: storyData?.parentName || null }),
  
  setCurrentPageIndex: (index) => set({ currentPageIndex: index }),
  
  nextPage: () => {
    const { story, currentPageIndex } = get();
    if (story && currentPageIndex < story.pages.length - 1) {
      set({ currentPageIndex: currentPageIndex + 1 });
    }
  },
  
  previousPage: () => {
    const { currentPageIndex } = get();
    if (currentPageIndex > 0) {
      set({ currentPageIndex: currentPageIndex - 1 });
    }
  },

  clearStory: () => set({ story: null, currentPageIndex: 0 }),

  // setIsGenerating: (isGenerating) => set({ isGenerating }),
  // setUploadedImages: (images) => set({ uploadedImages: images }),

  resetCreateForm: () => set({ childName: null, parentName: null}),
}));

// 元の AppState との互換性のため、currentStory を story にマッピングするゲッターを追加することも検討できますが、
// 今回の修正では新しい状態構造に統一します。
// 必要であれば、以下のようなゲッターを useStore の外側や、コンポーネント側で定義できます。
// export const selectCurrentStory = (state: EhonStoreState) => state.story;
