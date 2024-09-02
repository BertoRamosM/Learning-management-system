import { NextRequest, NextResponse } from "next/server";
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

const handler = createRouteHandler({ router: ourFileRouter });

export async function POST(req: NextRequest) {
  return handler.POST(req);
}

export async function GET(req: NextRequest) {
  return handler.GET(req);
}
