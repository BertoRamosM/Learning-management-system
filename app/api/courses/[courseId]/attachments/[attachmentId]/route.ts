import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function DELETE(req: Request, { params }: { params: { courseId: string, attachmentId: string } }) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return new NextResponse("Unautherized", {status: 401})
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    })

    if(!courseOwner) {
      return new NextResponse("Unautherized", {status: 401})
    }

    await db.attachment.delete({
      where: {
        id: params.attachmentId,
      }
    })

    return NextResponse.json({})
    
  }catch (error) {
    console.log("[ATTACHMENTS]", error)
    return new NextResponse("Internal Error", {status: 500})
  }
}