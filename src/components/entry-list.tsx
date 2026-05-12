"use client"

import type { KawaiiLogosData } from "@/app/(app)/data.types"
import { stringSorter } from "@/util/sort"
import { getAuthor } from "@/app/(app)/data"
import { EntryCard } from "./entry-card"
import { cn } from "lazy-cn"
import { useQueryState } from "nuqs"

// EntryList

export function EntryList(props: {
  entries: KawaiiLogosData.Entries,
  authors: KawaiiLogosData.Author[],
  mode?: "all" | "exist-only" | "missing-src-only",
}) {
  const [ search ] = useQueryState('search')

  const mode = props.mode || "exist-only"

  const searchFilter = (item: KawaiiLogosData.Entry) => {
    const author = getAuthor(props.authors, item.authorId)
    if (
      search === null
      || item.id.toLowerCase().includes(search.toLowerCase())
      || item.title.toLowerCase().includes(search.toLowerCase())
      || author?.displayName.toLowerCase().includes(search.toLowerCase())
      || author?.id.toLowerCase().includes(search.toLowerCase())
      || item.images.some(image => image.label.toLowerCase().includes(search.toLowerCase()))
      || item.license.id?.toLowerCase().includes(search.toLowerCase())
      || item.license.label?.toLowerCase().includes(search.toLowerCase())
    )
      return true
    return false
  }

  const modeFilter = (item: KawaiiLogosData.Entry) => {
    if (mode === "all") return true
    if (mode === "exist-only") return item.imageCount > 0
    if (mode === "missing-src-only") return item.imageCount === 0
    return true
  }

  const resultEntries = props.entries
    .filter(searchFilter)
    .filter(modeFilter)
    .sort(stringSorter(props.entries[ 0 ], "id"))

  return <>
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        "gap-2 gap-y-8",
        "mt-8",
      )}
    >
      {resultEntries.map(entry => {
        return (
          <EntryCard
            key={entry.authorId + entry.id}
            entry={entry}
            author={getAuthor(props.authors, entry.authorId)}
          />
        )
      })}
      {resultEntries.length === 0 && <p className="text-theme-text/50 text-xl col-span-full">
        {mode === "missing-src-only" ? "No missing sources found!" : "No entries found!"}
      </p>
      }
    </div>
  </>
}

// would a no-js list even be beneficial?
// the site is ideally, SSG, so every page should already
// have a no-js version from client components.
// one exception is probably the search bar
// which needs to be hidden on no-js