"use client"

import { useParams } from "next/navigation"
import ArtCard from "./ArtCard"
import { useQueryState } from "nuqs"
import { DataImage } from "../../../../types/types"

export default function ArtList(props: {
  images: DataImage[]
}) {
  const [search, setSearch] = useQueryState('search')
  const param = useParams()

  const filter = (item: DataImage) => {
    if (param.author !== undefined && item.author.name !== param.author) {
      return false
    }
    if (search === null) {
      return true
    }
    if (item.title.toLowerCase().includes(search.toLowerCase())) {
      return true
    }
    return false
  }

  return (
    props.images.filter(filter).map((image, index) => {
      return (
        <ArtCard key={image.src} image={image} order={index} />
      )
    })
  ) 
}