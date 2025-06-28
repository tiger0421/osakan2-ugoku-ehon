import { create } from 'zustand'
import { AppState, Story } from '@/types'

interface StoreState extends AppState {
  setCurrentStory: (story: Story | null) => void
  setCurrentPageIndex: (index: number) => void
  nextPage: () => void
  previousPage: () => void
  setIsGenerating: (isGenerating: boolean) => void
  setUploadedImages: (images: { child?: File; parent?: File }) => void
  resetState: () => void
}

const initialState: AppState = {
  currentStory: null,
  currentPageIndex: 0,
  isGenerating: false,
  uploadedImages: {}
}

export const useStore = create<StoreState>((set, get) => ({
  ...initialState,
  
  setCurrentStory: (story) => set({ currentStory: story, currentPageIndex: 0 }),
  
  setCurrentPageIndex: (index) => set({ currentPageIndex: index }),
  
  nextPage: () => {
    const { currentStory, currentPageIndex } = get()
    if (currentStory && currentPageIndex < currentStory.pages.length - 1) {
      set({ currentPageIndex: currentPageIndex + 1 })
    }
  },
  
  previousPage: () => {
    const { currentPageIndex } = get()
    if (currentPageIndex > 0) {
      set({ currentPageIndex: currentPageIndex - 1 })
    }
  },
  
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  
  setUploadedImages: (images) => set({ uploadedImages: images }),
  
  resetState: () => set(initialState)
}))
