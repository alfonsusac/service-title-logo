"use client"

import { useParams } from "next/navigation"
import { useQueryState } from "nuqs"
import { VariantWithAuthor } from "./data"
import VariantCard from "./VariantCard"
import { Dialog, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from "@radix-ui/react-dialog"

export default function ArtList(props: {
  variants: VariantWithAuthor[]

}) {
  const [search, setSearch] = useQueryState('search')
  const param = useParams()

  const filter = (item: VariantWithAuthor) => {
    if (param.author !== undefined && item.author.handleName !== param.author) {
      return false
    }
    if (search === null) {
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
        <>
          <VariantCard key={variant.author.handleName + variant.name} variant={variant} order={index} />
        </>
      )
    })
  )
}