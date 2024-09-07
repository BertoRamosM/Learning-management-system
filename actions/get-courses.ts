import { Category, Course } from "@prisma/client";


import { db } from "@/lib/db";
import { GetProgress } from "./get-progess";

type CourseWithProgressWithCategories = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
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
}: GetCoursesParams): Promise<CourseWithProgressWithCategories[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: title ? { contains: title } : undefined,
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress = await Promise.all(
      courses.map(async (course) => {
        const progress = await GetProgress(course.id, userId); 
        return {
          ...course,
          progress,
        };
      })
    );

    return coursesWithProgress;
  } catch (error) {
    console.log("GetCourses error", error);
    return [];
  }
};
