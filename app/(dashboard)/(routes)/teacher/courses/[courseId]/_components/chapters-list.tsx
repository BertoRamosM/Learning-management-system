"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
import {  Grip } from "lucide-react";

interface ChaptersListProps {
  items: Chapter[];
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string; position: number }[]) => void;
}

export const ChaptersList = ({
  items,
  onEdit,
  onReorder,
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  if (!isMounted) return null;

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedChapters = Array.from(chapters);
    const [movedChapter] = reorderedChapters.splice(result.source.index, 1);
    reorderedChapters.splice(result.destination.index, 0, movedChapter);

    setChapters(reorderedChapters);

    const updateData = reorderedChapters.map((chapter, index) => ({
      id: chapter.id,
      position: index,
    }));

    onReorder(updateData);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 p-4 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      chapter.isPublished &&
                        "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Grip className="mr-2" />
                    <span>{chapter.title}</span>
                    <button
                      className="ml-auto text-blue-600 hover:underline"
                      onClick={() => onEdit(chapter.id)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
