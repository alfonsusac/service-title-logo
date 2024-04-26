import { Octokit } from "@octokit/rest"
import { NextResponse } from "next/server"
import path from "path"
import fetch2 from "node-fetch"
import { getImages } from "./images"
import { Author, DataImage } from "../../../types/types"

export const revalidate = 60 * 60 * 4 // 4 hour

// export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    data: await getImages()
  })
}
