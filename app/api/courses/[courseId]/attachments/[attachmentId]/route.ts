import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.findUnique({
      where: {
        id: params.attachmentId,
      },
    });

    if (!attachment || attachment.courseId !== params.courseId) {
      return new NextResponse("Attachment not found", { status: 404 });
    }

    await db.attachment.delete({
      where: {
        id: params.attachmentId,
      },
    });

    return NextResponse.json({ message: "Attachment deleted successfully" });
  } catch (error) {
    console.log("[ATTACHMENTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
