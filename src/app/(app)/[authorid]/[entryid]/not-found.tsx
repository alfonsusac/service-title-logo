import NotFoundPage from "@/components/not-found"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Entry Not Found",
  description: "No entry found with the specified ID.",
  openGraph: {
    images: [
      {
        url: "/entry-not-found-og-image.png",
      },
    ]
  }
}

export default function AuthorIdNotFoundPage() {
  return <NotFoundPage what="Entry" />
}