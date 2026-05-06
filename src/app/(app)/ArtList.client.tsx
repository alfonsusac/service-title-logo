"use client"

import { useParams, usePathname } from "next/navigation"
import { useQueryState } from "nuqs"
import { ArtList } from "./ArtList"
import type { EntryWithAuthor } from "./data"

export default function ArtListFiltered(props: {
  entry: EntryWithAuthor[]
}) {
  const [search] = useQueryState('search')
  const param = useParams()

  const pathname = usePathname()
  if (pathname === "/about") return
  if (pathname === "/request") return

  const filter = (item: EntryWithAuthor) => {
    if (param.author !== undefined && item.author.id !== param.author) {
      return false
    }
    if (search === null) {
      return true
    }
    if (item.author.displayName.toLowerCase().includes(search.toLowerCase())) {
      return true
    }
    if (item.id.toLowerCase().includes(search.toLowerCase())) {
      return true
    }
    return false
  }
  
  return (
    <ArtList
      entries={props.entry.filter(filter)}
    />
  )
}