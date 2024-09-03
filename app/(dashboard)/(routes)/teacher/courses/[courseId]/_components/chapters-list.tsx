'use client'

import { Chapter } from "@prisma/client"
import { useEffect, useState } from "react"

import { 
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "@hello-pangea/dnd"

import { cn } from "@/lib/utils"

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
    <DragDropContext
      onDragEnd={()=>{})}>
        <Droppable droppableId="chapters">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {chapters.map((chapter, index) => (
                <Draggable key={chapter.id} draggableId={chapter.id} index={index}>
                  {(provided) => (
                    <div
                      className={cn(
                        "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                        chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ChapterItem chapter={chapter} />
                    </div>
                  )}
                </Draggable>
              ))}

            </div>
          )}
        </Droppable>

    </DragDropContext>
  )
}