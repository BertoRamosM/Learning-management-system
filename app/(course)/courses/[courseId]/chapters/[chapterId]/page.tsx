import { GetChapter } from '@/actions/get-chapter'
import { Banner } from '@/components/banner'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const ChapterIdPage = async ({params} : {params: {courseId: string, chapterId: string}}) => {
  const {userId} = auth()

  if(!userId) {
    return redirect('/')
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase
   } = await GetChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId
   })
  
  if(!chapter || !course) {
    return redirect('/')
  }

  const isLocked = !chapter.isFree && !purchase
  const completeOnEnd = !!purchase && !userProgress?.isCompleted

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="You have completed this chapter" variant="success" />
      )}
      {isLocked && (
        <Banner label="You need to purchase this course to watch this chapter" variant="warning" />
      )}
    </div>
  );
}

export default ChapterIdPage