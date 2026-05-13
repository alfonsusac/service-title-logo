import { revalidatePath, revalidateTag, updateTag } from "next/cache"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export const dynamic = 'force-dynamic'

export function GET() {
  return new Response([
    "Revalidate Route for Kawaii Logos.",
    "",
    "",
    "Routes:",
    "",
    " - GET  /revalidate",
    "     Shows this page",
    "",
    " - POST /revalidate",
    "     Revalidates all routes and tags, requires a token for authentication",
    "     {",
    "       token: string      // must match process.env.REVALIDATE_KEY",
    "     }",
  ].join('\n'), { status: 200 })
}

export async function POST(request: NextRequest) {
  const json = await request.json()
  // In development, we allow revalidation without a token for easier testing.
  if (process.env.NODE_ENV !== "development") {
    if (!json.token)
      return new Response('Unauthorized', { status: 401 })
    if (json.token !== process.env.REVALIDATE_KEY)
      return new Response('Unauthorized', { status: 401 })
  }
  revalidatePath('/')
  revalidateTag('all', "max")
  return Response.json({
    message: 'Revalidated all routes and tags.'
  })
}