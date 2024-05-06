import ArtCard from "./ArtCard"
import { VariantWithAuthor } from "./data"

export default function VariantCard(props: {
  variant: VariantWithAuthor,
  order?: number
}) {
  const firstImage = props.variant.files[0]

  return (
    <ArtCard key={firstImage.imgSrc} image={{
      ...firstImage,
      title: `${props.variant.name} ${props.variant.files.length ? `(${props.variant.files.length} variants)` : ''}`,
      author: props.variant.author
    }} order={props.order} />
  )
}