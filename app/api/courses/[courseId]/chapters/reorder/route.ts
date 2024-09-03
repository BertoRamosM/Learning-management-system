import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = auth();
    const { list } = await req.json();

    if (!userId) {
      return new NextResponse("Unautherized", {
        status: 401,
      });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unautherized", {
        status: 401,
      });

    }
  } catch (error) {
    console.log("[CHAPTERS]", error);
    return new NextResponse("Internal Error", {
      status: 500,
    })
  }
}