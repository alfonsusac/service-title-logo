"use client"

import { useParams } from "next/navigation"
import ArtCard from "./ArtCard"
import { useQueryState } from "nuqs"
import { Image } from "kawaii-logos-data"
import { ImagesWithAuthor } from "./data"

export default function ArtList(props: {
  images: ImagesWithAuthor
}) {
  const [search, setSearch] = useQueryState('search')
  const param = useParams()

  const filter = (item: ImagesWithAuthor[0]) => {
    if (param.author !== undefined && item.author.handleName !== param.author) {
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
        <ArtCard key={image.imgSrc} image={image} order={index} />
      )
    })
  ) 
}