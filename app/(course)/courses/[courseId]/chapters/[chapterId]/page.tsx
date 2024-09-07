import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const ChapterIdPage = async ({params} : {params: {courseId: string, chapterId: string}}) => {
  const {userId} = auth()

  if(!userId) {
    return redirect('/')
  }

  return (
    <div>
      chapter
    </div>
  )
}

export default ChapterIdPage