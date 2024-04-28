import { DataImage } from "../../../../types/types"

const apiUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000/revalidate'
  : `https://service-title-logo-backend.vercel.app/revalidate?key=${ process.env['REVALIDATE_KEY'] }`


export async function getData() {
  const response = await fetch(apiUrl, {
    next: {
      revalidate: 60 * 30 // half an hour
    }
  }).then(res => res.json()) as {
    updatedAt: string,
    data: DataImage[]
  }
  return response
}