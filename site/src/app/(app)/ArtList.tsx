"use client"

import { useParams, usePathname } from "next/navigation"
import { useQueryState } from "nuqs"
import { VariantWithAuthor } from "./data"
import VariantCard from "./VariantCard"

export default function ArtList(props: {
  variants: VariantWithAuthor[]

}) {
  const [search, setSearch] = useQueryState('search')
  const param = useParams()

  const pathname = usePathname()
  if(pathname === "/about") return
  if(pathname === "/request") return

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
    props.variants.filter(filter).map((variant, index) => {
      return (
        <VariantCard key={variant.author.handleName + variant.name} variant={variant} order={index} />
      )
    })
  )
}