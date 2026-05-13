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
    "",
    "",
    "Note to future self:",
    "",
    " - How to test",
    "     Go to https://github.com/alfonsusac/kawaii-logos-data > Actions > 'Update Data' (on sidebar)",
    "     Click 'Run workflow' and select main-2 branch. (Making commits to main-2 branch also works)",
    "     Go to https://vercel.com/alfonsusacs-projects/service-title-logo > Logs",
    "     Search for '/revalidate' and see if request is 200",
    "     Go to https://kawaiilogos.alfon.dev/ and homepage's Last Updated should be 'Just Now'",
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