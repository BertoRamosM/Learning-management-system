import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, {params} : {params: {courseId: string}}) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401
      })
    }

    const {courseId} = params
  } catch (error) {
    console.log("[COURSE_ID]", error)
    return new NextResponse("Internal Error", {status: 400})
  }
}