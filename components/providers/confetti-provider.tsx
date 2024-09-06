'use client'

import ReactConfetti from "react-confetti"
import { useConfettiStore } from "../../hooks/use-confetti-store"

export const ConfettiProvider = () => {
  const confetti = useConfettiStore()

  if (!confetti.isOpen)return null

  return (
    <ReactConfetti
      className="pointer-events-none z-100 w-screen h-screen fixed top-0 left-0"
      numberOfPieces={500}
      recycle={false}
      run={true}
      width={window.innerWidth}
      height={window.innerHeight}
      onConfettiComplete={confetti.onClose}
    />
  ) 
 }