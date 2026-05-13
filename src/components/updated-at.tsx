import { fetchUpdatedAt } from "@/app/(app)/data"
import { UpdatedAtClient } from "./udpate-at-client"
import { Suspense } from "react"

export async function UpdatedAt() {
  const updatedAt = await fetchUpdatedAt()

  return (
    <Suspense fallback={<span className="starting-bottom-fade-in-5">{new Date(updatedAt).toLocaleString()}</span>}>
      <span className="starting-bottom-fade-in-0">
        <UpdatedAtClient updatedAt={updatedAt} />
      </span>
    </Suspense>
  )
} 