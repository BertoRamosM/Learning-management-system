import React from 'react'

interface CourseSidebarItemProps {
  id: string;
  label: string;
  isCompleted: boolean;
  courseId: string;
  isLoked: boolean;
}

const CourseSidebarItem = ({
  id,
  label,
  isCompleted,
  courseId,
  isLoked
}: CourseSidebarItemProps) => {

  return (
    <div>CourseSidebarItem</div>
  )
}

export default CourseSidebarItem