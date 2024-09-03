'use client'

import { Chapter } from "@prisma/client"
import { useEffect, useState } from "react"

interface ChaptersListProps {
  items: Chapter[]
  onEdit: (id: string) => void
  onReorder: (updateData: {id: string, position: number}[]) => void
}


export const ChaptersList = ({items, onEdit, onReorder} : ChaptersListProps) => {

  const [isMounted, setIsMounted] = useState(false)
  const [chapters, setChapters] = useState(items)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    setChapters(items)
  }, [items])
  
  if(!isMounted) return null


  return (
    <div>
      
    </div>
  )
}