"use client"

import { useState } from "react"
import { ImageWithError } from "../../../../components/image-with-error"
import { IcRoundDownload, IcRoundFileCopy } from "../../Icons"
import { cn } from "lazy-cn"
import toast from "react-hot-toast"
import { button } from "../../AppButton"
import type { KawaiiLogosData } from "../../data.types"
import { ListOfReferences } from "@/components/references-ui"
import { MissingSourceImagePlaceholder } from "../../../../components/image-broken-link-placeholder"

export function EntryPageVariantDisplay(props: {
  entry: KawaiiLogosData.Entry,
  author: KawaiiLogosData.Author,
}) {
  const entry = props.entry
  const author = props.author
  const images = entry.images

  const [ selectedImageIndex, setSelectedImageIndex ] = useState(0)
  const selectedImage = images.at(selectedImageIndex)

  return (
    <div className="w-full gap-2 flex flex-col lg:flex-row starting-bottom-fade-in-0">

      {/* Image Variant Display */}
      <div className="rounded-2xl bg-theme-card relative flex flex-col w-full">

        {/* Image Part */}
        <div className="p-6 bg-theme-bg/50">
          <div className="relative w-full h-full aspect-video ">
            {
              selectedImage ?
                <ImageWithError
                  key={selectedImageIndex}
                  alt={entry.title}
                  src={selectedImage?.src.url ?? ""}
                />
                : <MissingSourceImagePlaceholder />
            }
          </div>
        </div>

        {/* Image Info Part */}
        <div className="flex items-end justify-between -my-1 p-6">
          {/* Left */}
          <div className="">
            <div className="text-theme-strong">{selectedImage?.label}</div>
            <div>by {author.displayName}</div>
            <div>
              {entry.license.type === "standard" ? entry.license.id : entry.license.label}
            </div>
            <ListOfReferences references={selectedImage?.references ?? []} />
          </div>

          {/* Right */}
          <div className="flex flex-col gap-2">
            {selectedImage &&
              <button
                className={button('group flex-1 bg-theme-text/10 hover:bg-theme-text/15 px-5 py-3 text-base cursor-pointer')}
                onClick={async () => {
                  try {
                    // TODO: show toaster 
                    const img = await fetch(selectedImage.src.url)
                    const imgBlob = await img.blob()
                    const clipboardData = [ new ClipboardItem({ [ imgBlob.type ]: imgBlob }) ]
                    await navigator.clipboard.write(clipboardData)
                    toast.success('Image copied to clipboard!')
                  } catch (error) {
                    console.log(error)
                    toast.error('Failed to copy image to clipboard!')
                  }
                }}
              >
                <IcRoundFileCopy className="flex-none text-xl group-hover:text-theme-strong" />
                Copy
              </button>
            }
            {selectedImage &&
              <button
                className={button('group flex-1 bg-theme-text/10 hover:bg-theme-text/15 px-5 py-3 text-base cursor-pointer')}
                onClick={async () => {
                  // TODO: actually download the image
                  async function toDataURL(url: string) {
                    const blob = await fetch(url).then(res => res.blob())
                    return URL.createObjectURL(blob)
                  }
                  const a = document.createElement("a")
                  a.href = await toDataURL(selectedImage.src.url)
                  a.download = selectedImage.label ?? props.entry.title
                  document.body.appendChild(a)
                  a.click()
                  document.body.removeChild(a)
                }}
              >
                <IcRoundDownload
                  className="flex-none text-xl group-hover:text-theme-strong" />
                Download
              </button>
            }
          </div>

        </div>
      </div>

      {/* Image Variant Selector */}
      {images.length > 1 &&
        <div className="shrink-0 rounded-2xl bg-theme-card h-28 lg:h-auto lg:w-36 bg-red-500 overflow-y-auto flex flex-col self-stretch">
          <div className="flex flex-row lg:flex-col basis-0 grow">
            {images.map((image, index) => {

              return <button
                key={index}
                className={cn(
                  "aspect-[4/3] p-2 shrink-0 hover:bg-theme-cardHover",
                  index === selectedImageIndex && "bg-theme-cardHover/50"
                )}
                onClick={() => setSelectedImageIndex(index)}
              >
                <div className="relative w-full h-full">
                  <ImageWithError
                    key={index}
                    alt={`${ entry.title } - ${ index + 1 }`}
                    src={image.src.url}
                  />
                </div>
              </button>
            })}
          </div>
        </div>
      }
    </div>
  )
}