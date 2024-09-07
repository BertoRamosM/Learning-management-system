import { db } from "@/lib/db";

interface getChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const GetChapter = async ({
  userId,
  courseId,
  chapterId,
}: getChapterProps) => {
  try {
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      include: {
        muxData: true,
      },
    });

    if (!chapter || chapter.courseId !== courseId) {
      return null;
    }

    return chapter;
  } catch (error) {
    console.log("GetChapter error", error);
    return null;
  }
};