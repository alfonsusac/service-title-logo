import type { KawaiiLogosData } from "@/app/(app)/data.types"
import { stringSorter } from "@/util/sort"
import { cn } from "lazy-cn"
import { EntryCard } from "./entry-card"
import { getAuthor } from "@/app/(app)/data"

export function EntryListBase(props: {
  entries: KawaiiLogosData.Entries,
  authors: KawaiiLogosData.Author[],
  mode?: "all" | "exist-only" | "missing-src-only",
  sort?: "id",
}) {

  const mode = props.mode || "exist-only"
  const sortMode = props.sort || "id"

  const modeFilter = (item: KawaiiLogosData.Entry) => {
    if (mode === "all") return true
    if (mode === "exist-only") return item.imageCount > 0
    if (mode === "missing-src-only") return item.imageCount === 0
    return true
  }

  const resultEntries = props.entries
    .filter(modeFilter)
    .sort(stringSorter(props.entries[ 0 ], sortMode))

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