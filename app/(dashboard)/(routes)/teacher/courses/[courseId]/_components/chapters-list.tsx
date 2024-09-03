'use client'

import { Chapter } from "@prisma/client"

interface ChaptersListProps {
  items: Chapter[]
  onEdit: (id: string) => void
  onReorder: (updateData: {id: string, position: number}[]) => void
}


export const ChaptersList = ({items, onEdit, onReorder} : ChaptersListProps) => {
  return (
    <div>
      
    </div>
  )
}