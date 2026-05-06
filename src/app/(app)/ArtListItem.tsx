
import { cn } from "lazy-cn"
import Image from "next/image"
import Link from "next/link"
import { ImagesWithAuthor } from "./data"

export default function ArtListItem(props: {
  entry: ImagesWithAuthor[ 0 ],
  order?: number,
  opened?: boolean,
  variantCount?: number,
  onClick?: () => void
}) {
  const title = props.entry.title
  const author = props.entry.author
  const image = props.entry.images.find(img => img.src.endsWith('.png') || img.src.endsWith('.svg')) ?? props.entry.images[ 0 ]
  // const image = props.entry.images[ 0 ]
  if (!image) return null
  return (
    <div
      className="relative  rounded-lg flex flex-col group animate-in fade-in-0 duration-300 slide-in-from-bottom-5 cursor-pointer"
      style={{
        animationDelay: `${ (props.order ?? 0) * 50 }ms`,
        animationFillMode: 'both',
      }}
      onClick={(ev) => {
        props.onClick?.()
      }}
    >
      <div className="relative aspect-video w-full overflow-visible rounded-2xl"
        style={{
          overflow: image.style?.objectFit === 'cover' ? 'hidden' : 'visible',
        }}
      >
        <Image
          unoptimized src={image.src} alt={title} title={title}
          fill style={{ objectFit: image.style?.objectFit }}
          className={cn(`object-contain transition-all group-hover:scale-110 overflow-visible`)} />
      </div>
      <div className="text-xs font-mono px-2 pt-2 pb-1">
        {title} {(props.variantCount ?? 0) > 1 ? `(${ props.variantCount })` : ''}
      </div>
      <div className="p-2 pt-0 flex justify-between text-xs font-mono text-theme-strong">
        <div className="flex items-center gap-1">
          {
            author.pfp &&
            <div className="w-4 h-4 rounded-full bg-theme-text relative overflow-hidden"
            >
              <Image unoptimized src={author.pfp} fill className="object-cover" alt="" />
            </div>
          }
          <Link
            href={'/' + author.displayName}
            className="hover:underline grow"
          >{author?.displayName}</Link>
        </div>
        {
          image.references[ 0 ].url && (
            <Link href={image.references[ 0 ].url} target="_blank" className="hover:underline">
              source
            </Link>
          )
        }
      </div>
    </div>
  )
}