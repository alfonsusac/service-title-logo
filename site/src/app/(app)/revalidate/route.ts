import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export const dynamic = 'force-dynamic'

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  if(searchParams.get('key') !== process.env.REVALIDATE_KEY) return redirect('/')
  revalidatePath('/')
  revalidateTag('all')
  redirect('/')
}