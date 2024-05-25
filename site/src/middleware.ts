import { Logger } from "next-axiom";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  
  const logger = new Logger({ source: "middleware" }) // traffic, request
  logger.info("Request received", { url: request.url });
  if (!request.url.split('/').pop()?.includes('.')) {
    logger.info("Route accessed", { route: request.url });
  }
  event.waitUntil(logger.flush());

  return NextResponse.next();
}
// For more information, see Matching Paths below
export const config = {};
