
import { DataImage } from "@/data/images"
import { cn } from "lazy-cn"
import Image from "next/image"
import Link from "next/link"

export default function ArtCard(props: {
  image: DataImage
}) {
  const image = props.image
  return (
    <div
      className="relative  rounded-lg flex flex-col  group ">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
        <Image unoptimized src={image.src} alt={image.title} fill className={cn(`object-cover ${ image.className } transition-all group-hover:scale-110`)} />
      </div>
      <div className="p-2 flex justify-between text-xs font-mono text-slate-500">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 rounded-full bg-slate-400 relative overflow-hidden">
            <Image unoptimized src={image.author.pfp} fill className="object-cover" alt="" />
          </div>
          <Link
            href={'/' + image?.author?.name}
            className="hover:underline grow">{image?.author?.name}</Link>
        </div>
        {
          image.raw && (
            <Link href={image.raw} target="_blank" className="hover:underline">
              source
            </Link>
          )
        }
      </div>
    </div>
  )
}