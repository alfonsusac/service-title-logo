import { Suspense } from "react"
import ArtListFiltered from "./ArtList.client"
import { VariantWithAuthor } from "./data"
import { stringSorter } from "@/util/sort"
import { ArtList } from "./ArtList"

export default async function SuspensedArtList(props: {
  variants: VariantWithAuthor[]
}) {
  const variants = props.variants.sort(stringSorter(props.variants[0], "name"))
  return (
    <>
      <Suspense>
        <ArtListFiltered variants={variants} />
      </Suspense>
      {/* <noscript>
        <ArtList variants={variants} />
      </noscript> */}
    </>
  )
}