import { Category, Course } from "@prisma/client";
import { GetProgress } from "./get-progess";

import { db } from "@/lib/db";

type CourseWithProgressWithCategories = Course & {
  category: Category || null;
  chapters: { id: string } [];
progress: number || null;
}

type GetCourses = {
  userId: string
  title?: string
  categoryId?: string
}

export const GetCourses = async ({ userId, title, categoryId }: GetCourses): Promise<CourseWithProgressWithCategories[]> => {

  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          }
        },
          purchases: {
            where: {
              userId
            }
          }
      },
      orderBy: {
        createdAt: "desc",
      }
      
    })
    
  }catch (error) {
    console.log("GetCourses error", error);
    return [];
  }
 }