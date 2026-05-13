import NotFoundPage from "@/components/not-found"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Author Not Found",
  description: "No author found with the specified ID.",
  openGraph: {
    images: [
      {
        url: "/author-not-found-og-image.png",
      },
    ]
  }
}

export default function AuthorIdNotFoundPage() {
  return <NotFoundPage what="Author" />
}