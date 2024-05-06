
import { cn } from "lazy-cn"
import Image from "next/image"
import Link from "next/link"
import { ImagesWithAuthor } from "./data"

export default function ArtCard(props: {
  image: ImagesWithAuthor[0],
  order?: number,
  opened?: boolean,
  onClick?: () => void
}) {
  const image = props.image
  return (
    <div
      className="relative  rounded-lg flex flex-col group animate-in fade-in-0 duration-300 slide-in-from-bottom-5"
      style={{
        // viewTransitionName: `art-card`,
        // viewTransitionName: `img-${ image.title.replace('.', '') }`,
        animationDelay: `${ (props.order ?? 0) * 50 }ms`,
        animationFillMode: 'both',
      }}
      onClick={props.onClick}
    >
      {
        !props.opened ? <div className="relative aspect-video w-full overflow-hidden rounded-2xl"
          style={{
            // position: props.opened ? 'fixed' : undefined,
            // zIndex: props.opened ? 999 : 0,
            overflow: image.objectFit === 'contain' ? 'visible' : 'hidden',
            // viewTransitionName: `art-card-img-${ image.author.handleName }-${ image.title.replaceAll('.', '').replaceAll(' ', '') }`,
          }}
        >
          <Image
            unoptimized src={image.imgSrc} alt={image.title} title={image.title}
            fill
            className={cn(`object-cover transition-all group-hover:scale-110`)}
            style={{
              objectFit: props.image.objectFit,
              // viewTransitionName: `art-card-img-${ image.author.handleName }-${ image.title.replaceAll('.', '').replaceAll(' ', '') }-img`
            }}
          />
        </div> : <div className="relative aspect-video w-full rounded-2xl">

        </div>
      }
      {/* <div className="relative aspect-video w-full overflow-hidden rounded-2xl"
        style={{
          overflow: image.objectFit === 'contain' ? 'visible' : 'hidden',
          viewTransitionName: `art-card-img-${image.author.handleName}-${image.title.replace('.', '')}`
        }}
      >
        <Image
          unoptimized src={image.imgSrc} alt={image.title} title={image.title}
          fill style={{ objectFit: props.image.objectFit }}
          className={cn(`object-cover transition-all group-hover:scale-110`)} />
      </div> */}
      <div className="text-xs font-mono px-2 pt-2 pb-1">
        {image.title}
      </div>
      <div className="p-2 pt-0 flex justify-between text-xs font-mono text-theme-strong">
        <div className="flex items-center gap-1">
          {
            image.author.pfp &&
            <div className="w-4 h-4 rounded-full bg-theme-text relative overflow-hidden"
            >
              <Image unoptimized src={image.author.pfp} fill className="object-cover" alt="" />
            </div>
          }
          <Link
            href={'/' + image?.author?.handleName}
            className="hover:underline grow">{image?.author?.handleName}</Link>
        </div>
        {
          image.source && (
            <Link href={image.source} target="_blank" className="hover:underline">
              source
            </Link>
          )
        }
      </div>
    </div>
  )
}