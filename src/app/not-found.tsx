import NotFoundPage from "@/components/not-found"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Not Found",
  description: "The page you are looking for does not exist.",
  openGraph: {
    images: [
      {
        url: "/not-found-og-image.png",
      },
    ]
  }
}

export default function RootNotFoundPage() {
  return <NotFoundPage />
}

