'use client'

import { cn } from "@/lib/utils";
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
    <button type="button"
      className={cn("flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "bg-slate-200/20 text-slate-700 hover:bg-slate-200/20 hover:text-slate-700", isCompleted && "text-emerald-700 hover:text-emerald-700",
        isCompleted && isActive && "bg-emerald-200/20"
    )} onClick={onClick}>
      <div className="flex items-center gap-x-2 justify-center">
        <Icon />
        {label}
      </div>
    </button>
  );
}

export default CourseSidebarItem