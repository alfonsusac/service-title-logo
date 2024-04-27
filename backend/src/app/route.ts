import { NextResponse } from "next/server"
import { getImages } from "./images"

export const revalidate = 60 * 60 * 1 // 4 hour

// export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    data: await getImages()
  })
}
