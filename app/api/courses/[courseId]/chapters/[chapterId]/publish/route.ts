import { NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";


export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {

  try {
    const {userId} = auth()
    
  }catch (error) {
    console.log("[CHAPTERS_PUBLISH_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}