import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    // Authenticate user
    const { userId } = auth();

    // Log the authentication details
    console.log("User ID:", userId);
    console.log("Course ID:", params.courseId);
    console.log("Chapter ID:", params.chapterId);

    // Parse the request body to get the fields for update
    const { isPublished, ...values } = await req.json();
    console.log("Values to update:", values);

    // Ensure user is authenticated
    if (!userId) {
      console.log("Unauthorized: No user ID");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the course exists and belongs to the user
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId, // Check that the course belongs to the user
      },
    });

    if (!ownCourse) {
      console.log("Unauthorized: Course does not belong to the user");
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Update the chapter based on the unique chapterId
    const updatedChapter = await db.chapter.update({
      where: {
        id: params.chapterId, // Only the unique chapter ID should be used
      },
      data: {
        ...values, // Pass the updated values (e.g., title)
      },
    });

    console.log("Updated chapter:", updatedChapter);

    // Return the updated chapter as the response
    return NextResponse.json(updatedChapter);
  } catch (error) {
    // Log the error for debugging
    console.log("[CHAPTERS ERROR]", error);

    // Return a 500 Internal Server Error
    return new NextResponse("Internal Error", { status: 500 });
  }
}
