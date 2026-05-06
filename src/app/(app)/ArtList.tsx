// import { VariantWithAuthor } from "./data"
import type { EntryWithAuthor } from "./data"
import VariantCard from "./VariantCard"

export function ArtList(props: {
  entries: EntryWithAuthor[]
}) {
  // console.log("Rendering Artlist")
  // console.log(props.entries)
  return (
    <div
      style={{
        viewTransitionName: "artlist",
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2 gap-y-8 mt-8"
    >
      {
        props.entries.map((entry, index) => {
          return (
            <VariantCard key={entry.author.displayName + entry.title} entry={entry} order={index} />
          )
        })
      }
    </div>
  )
}