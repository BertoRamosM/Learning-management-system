import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

  

    const { isPublished, ...values } = await req.json();
    console.log("Values to update:", values);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
      },
      data: {
        ...values, 
      },
    });


    return NextResponse.json(updatedChapter);
  } catch (error) {
    console.log("[CHAPTERS ERROR]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
