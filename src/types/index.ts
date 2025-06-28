export interface StoryPage {
  id: string
  text: string
  imageUrl?: string
  animation?: AnimationType
}

export interface Story {
  id: string
  title: string
  pages: StoryPage[]
  childName: string
  parentName?: string
  createdAt: Date
}

export interface Character {
  id: string
  name: string
  imageUrl: string
  role: 'protagonist' | 'companion' | 'antagonist'
}

export type AnimationType = 
  | 'fadeIn'
  | 'slideLeft'
  | 'slideRight'
  | 'bounce'
  | 'zoom'
  | 'float'

export interface AppState {
  currentStory: Story | null
  currentPageIndex: number
  isGenerating: boolean
  uploadedImages: {
    child?: File
    parent?: File
  }
}
