import { fetchUpdatedAt } from "@/app/(app)/data"
import { UpdatedAtClient } from "./udpate-at-client"
import { Suspense } from "react"

export async function UpdatedAt() {
  const updatedAt = await fetchUpdatedAt()

  return (
    <Suspense fallback={new Date(updatedAt).toLocaleString()}>
      <UpdatedAtClient updatedAt={updatedAt} />
    </Suspense>
  )
}