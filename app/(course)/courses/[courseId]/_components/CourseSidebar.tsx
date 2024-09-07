import { Chapter, Course, UserProgress } from '@prisma/client'
import React from 'react'

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[]
  }
  progressCount: number
}

const CourseSidebar = ({course, progressCount} : CourseSidebarProps) => {
  return (
    <div>

      
    </div>
  )
}

export default CourseSidebar