import { Course } from "@prisma/client";
import { db } from "@/lib/db";
import { GetProgress } from "./get-progess";

type CourseWithProgress = Course & {
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
}: GetCoursesParams): Promise<CourseWithProgress[]> => {
  try {
    let courses: Course[] = [];

    // If a title is provided, use full-text search with raw SQL
    if (title) {
      courses = await db.$queryRaw<Course[]>`
        SELECT * FROM "Course"
        WHERE "isPublished" = true
        AND (${categoryId ? `"categoryId" = ${categoryId}` : "true"})
        AND to_tsvector('english', "title") @@ plainto_tsquery('english', ${title})
        ORDER BY "createdAt" DESC
      `;
    } else {
      // If no title is provided, fallback to normal findMany query
      courses = await db.course.findMany({
        where: {
          isPublished: true,
          categoryId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    // Map through the courses and add the progress for each course
    const coursesWithProgress = await Promise.all(
      courses.map(async (course) => {
        const progress = await GetProgress(course.id, userId); // Fetch user progress
        return {
          ...course,
          progress,
        };
      })
    );

    return coursesWithProgress; // Return courses with progress
  } catch (error) {
    console.error("GetCourses error", error);
    return [];
  }
};
