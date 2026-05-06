import { VariantWithAuthor } from "./data"
import VariantCard from "./VariantCard"

export function ArtList(props: {
  variants: VariantWithAuthor[]
}) {
  return (
    <div
      style={{
        viewTransitionName: "artlist",
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2 gap-y-8 mt-8"
    >
      {
        props.variants.map((variant, index) => {
          return (
            <VariantCard key={variant.author.handleName + variant.name} variant={variant} order={index} />
          )
        })
      }
    </div>
  )
}