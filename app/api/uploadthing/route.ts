import { NextRequest, NextResponse } from "next/server";
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

const handler = createRouteHandler({ router: ourFileRouter });

export async function POST(req: NextRequest) {
  console.log("POST Request Received:", req.url);
  return handler.POST(req);
}

export async function GET(req: NextRequest) {
  console.log("GET Request Received:", req.url);
  return handler.GET(req);
}
