import { Suspense } from "react"
import ArtListFiltered from "./ArtList.client"
// import { VariantWithAuthor } from "./data"
import { stringSorter } from "@/util/sort"
import { ArtList } from "./ArtList"
import type { EntryWithAuthor } from "./data"

export default async function ArtListServer(props: {
  entries: EntryWithAuthor[]
}) {
  const sortedEntries = props.entries.sort(stringSorter(props.entries[ 0 ], "id"))
  return (
    <>
      <ArtListFiltered entry={sortedEntries} />

      <noscript>
        <ArtList entries={sortedEntries} />
      </noscript>
    </>
  )
}