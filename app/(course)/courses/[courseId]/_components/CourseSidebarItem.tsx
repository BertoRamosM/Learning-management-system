'use client'

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

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

  const pathname = usePathname()
  const router = useRouter()

  const Icon = isLoked ? Lock : (isCompleted ? CheckCircle : PlayCircle)

  const isActive = pathname.includes(id)

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`)
}

  return (
    <div>

    </div>
  )
}

export default CourseSidebarItem