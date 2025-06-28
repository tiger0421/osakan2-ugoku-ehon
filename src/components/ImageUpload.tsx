"use client"

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, User, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStore } from '@/store/useStore'

interface ImageUploadProps {
  type: 'child' | 'parent'
  className?: string
}

export function ImageUpload({ type, className }: ImageUploadProps) {
  const { uploadedImages, setUploadedImages } = useStore()
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedImages({
        ...uploadedImages,
        [type]: file
      })
    }
  }, [type, uploadedImages, setUploadedImages])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  })

  const currentFile = uploadedImages[type]
  const isChild = type === 'child'

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors",
        isDragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400",
        className
      )}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center justify-center space-y-3">
        {currentFile ? (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-green-100 flex items-center justify-center">
              {isChild ? (
                <User className="w-8 h-8 text-green-600" />
              ) : (
                <Users className="w-8 h-8 text-green-600" />
              )}
            </div>
            <p className="text-sm font-medium text-gray-900">
              {currentFile.name}
            </p>
            <p className="text-xs text-gray-500">
              クリックして変更
            </p>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p className="text-sm font-medium text-gray-900">
              {isChild ? '子どもの写真をアップロード' : '保護者の写真をアップロード（任意）'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {isDragActive ? 'ここにドロップ' : 'クリックまたはドラッグ&ドロップ'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
