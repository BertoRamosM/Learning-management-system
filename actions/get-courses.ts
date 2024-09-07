import { db } from "@/lib/db";
import { GetProgress } from "./get-progess";
import { Prisma } from "@prisma/client"; // Import Prisma

type CourseWithProgressWithCategory = Prisma.CourseGetPayload<{
  include: {
    category: true;
    chapters: {
      select: { id: true };
    };
  };
}> & {
  progress: number | null; // Add progress field
};

type GetCoursesParams = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const GetCourses = async ({
  userId,
  title,
  categoryId,
}: GetCoursesParams): Promise<CourseWithProgressWithCategory[]> => {
  try {
    let courses = await db.course.findMany({
      where: {
        isPublished: true,
        categoryId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true, // Include the category relation
        chapters: {
          // Include chapters relation
          select: { id: true }, // Only get the chapter ids
        },
      },
    });

    // Add progress to each course
    const coursesWithProgress = await Promise.all(
      courses.map(async (course) => {
        const progress = await GetProgress(course.id, userId); // Fetch progress
        return {
          ...course,
          progress, // Add the progress field to the course
        };
      })
    );

    return coursesWithProgress;
  } catch (error) {
    console.error("GetCourses error", error);
    return [];
  }
};
