import { ImageWithError } from "@/components/image-with-error"
import { MissingSourceImagePlaceholder } from "@/components/image-broken-link-placeholder"
import type { KawaiiLogosData } from "@/app/(app)/data.types"
import Image from "next/image"
import Link from "next/link"

export function EntryCard(props: {
  entry: KawaiiLogosData.Entry,
  author: KawaiiLogosData.Author | undefined,
}) {
  const title = props.entry.title
  const author = props.author

  const image = props.entry.images.find(img => img.src.url.endsWith(".png") || img.src.url.endsWith('.svg')) || props.entry.images.at(0)
  const imageCount = props.entry.images.length

  // if (!image) {
  //   // Entry with missing src! Some entries exists but have no idea how to get the src.
  //   return <></>
  // }

  return (
    <>
      <div
        className="relative rounded-lg flex flex-col group animate-in fade-in-0 duration-300 slide-in-from-bottom-5 cursor-pointer"
        style={{
          // animationDelay: `${ (props.order ?? 0) * 50 }ms`,
          animationFillMode: 'both',
        }}
      // onClick={(ev) => {
      //   props.onClick?.()
      // }}
      >
        {author &&
          <Link
            href={`/${ author.id }/${ props.entry.id }`}
            className="absolute inset-0 z-10"
          />
        }

        <div className="relative aspect-video w-full overflow-visible rounded-2xl group-hover:scale-110 transition-[scale]"
          style={{
            overflow: image?.style?.objectFit === 'cover' ? 'hidden' : 'visible',
          }}
        >
          {image ?
            <ImageWithError
              src={image.src.url} alt={title} title={title}
              style={{ objectFit: image.style?.objectFit }}
            />
            : <MissingSourceImagePlaceholder />
          }
        </div>
        <div className="text-[0.9rem] px-2 pt-2 pb-0">
          {title} {(imageCount) > 1 ? `(${ imageCount })` : ''}
        </div>
        <div className="text-[0.9rem] p-2 pt-0 flex justify-between text text-theme-strong">
          {author &&
            <div className="flex items-center gap-1">
              {
                // Avatar
                author?.pfp &&
                <div className="w-4 h-4 rounded-full bg-theme-text relative overflow-hidden">
                  <Image unoptimized src={author.pfp} fill className="object-cover" alt="" />
                </div>
              }
              <Link
                href={'/' + author.displayName}
                className="hover:underline grow"
              >{author?.displayName}</Link>
            </div>
          }
        </div>
      </div>
    </>
  )

}