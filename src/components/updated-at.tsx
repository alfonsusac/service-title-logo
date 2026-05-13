import { fetchUpdatedAt } from "@/app/(app)/data"
import { UpdatedAtClient } from "./udpate-at-client"
import { Suspense } from "react"

export async function UpdatedAt() {
  const updatedAt = await fetchUpdatedAt()

  return (
    <Suspense fallback={<span>{new Date(updatedAt).toLocaleString()}</span>}>
      <UpdatedAtClient updatedAt={updatedAt} />
    </Suspense>
  )
} 