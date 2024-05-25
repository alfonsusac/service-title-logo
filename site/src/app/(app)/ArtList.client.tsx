"use client"

import { useParams, usePathname } from "next/navigation"
import { useQueryState } from "nuqs"
import { VariantWithAuthor } from "./data"
import VariantCard from "./VariantCard"
import { ArtList } from "./ArtList"

export default function ArtListFiltered(props: {
  variants: VariantWithAuthor[]

}) {
  const [search, setSearch] = useQueryState('search')
  const param = useParams()

  const pathname = usePathname()
  if (pathname === "/about") return
  if (pathname === "/request") return

  const filter = (item: VariantWithAuthor) => {
    if (param.author !== undefined && item.author.handleName !== param.author) {
      return false
    }
    if (search === null) {
      return true
    }
    if (item.author.handleName.toLowerCase().includes(search.toLowerCase())) {
      return true
    }
    if (item.name.toLowerCase().includes(search.toLowerCase())) {
      return true
    }
    return false
  }

  return (
    <ArtList
      variants={props.variants.filter(filter)}
    />
  )
}