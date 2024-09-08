"use client"
import axios from "axios"
import MuxPlayer from "@mux/mux-player-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Loader2, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useConfettiStore } from "@/hooks/use-confetti-store"

interface VideoPayerProps {
  chapterId: string;
  courseId: string;
  title: string;
  playbackId: string;
  nextChapter?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
}


const VideoPlayer = ({
  chapterId,
  courseId,
  title,
  playbackId,
  nextChapter,
  isLocked,
  completeOnEnd
}: VideoPayerProps) => {
  const router = useRouter()
  const confetti = useConfettiStore()

  const [isLoading, setIsLoading] = useState(false)

  const onPlaybackReady = async () => {
    setIsLoading(true)
    try {
      await axios.patch(`/api/chapters/${chapterId}/play`, {
        playbackId
      })
      toast.success("Playback ready")
      confetti.onOpen()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div>VideoPayer</div>
  )
}

export default VideoPlayer