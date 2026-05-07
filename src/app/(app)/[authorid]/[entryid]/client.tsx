"use client"

import { useState, type JSX, type SVGProps } from "react"
import { ImageWithError } from "../../ArtListItemImage"
import type { AuthorOutput } from "../../data.types"
import { IconParkSolidTwitter, SimpleIconsBluesky, UimGithubAlt } from "../../Icons"
import { cn } from "lazy-cn"

export function EntryPageVariantDisplay(props: {
  entry: AuthorOutput[ 'entries' ][ number ],
  author: AuthorOutput,
}) {
  const entry = props.entry
  const author = props.author
  const images = entry.images

  const [ selectedImageIndex, setSelectedImageIndex ] = useState(0)
  const selectedImage = images[ selectedImageIndex ]

  return (
    <div className="w-full gap-2 flex flex-col lg:flex-row">

      {/* Image Variant Display */}
      <div className="rounded-2xl bg-theme-card relative flex flex-col w-full">

        {/* Image Part */}
        <div className="p-6 bg-theme-bg/50">
          <div className="relative w-full h-full aspect-video ">
            <ImageWithError
              key={selectedImageIndex}
              alt={entry.title}
              src={selectedImage.src}
            />
          </div>
        </div>

        {/* Image Info Part */}
        <div className="flex items-end justify-between -my-1 p-6">
          <div className="">
            <div className="text-theme-strong">{selectedImage.label}</div>
            <div>by {author.displayName}</div>
            <div>
              {entry.license.type === "standard" ? entry.license.id : entry.license.label}
            </div>
            <ul className="text-ellipsis">
              {selectedImage.references.map((ref, index) => {

                const iconMap = {
                  unknown: () => <></>,
                  "github-repo-text-content": UimGithubAlt,
                  "github-blob": UimGithubAlt,
                  "github-repo": UimGithubAlt,
                  "github-raw": UimGithubAlt,
                  "github-camo": UimGithubAlt,
                  "github-unknown": UimGithubAlt,
                  "gist-raw": UimGithubAlt,
                  "gist-page": UimGithubAlt,
                  "google-drive": () => <></>,
                  "twitter-post": IconParkSolidTwitter,
                  "bsky-post": SimpleIconsBluesky
                } satisfies Record<typeof ref.urlType.type, (props: SVGProps<SVGSVGElement>) => JSX.Element>

                const Icon = iconMap[ ref.urlType.type ] || (() => <></>)

                return <li key={index} className=" list-item list-disc list-inside truncate">
                  <Icon className="inline mr-1" /> {ref.urlType.label}
                </li>
              })}
            </ul>
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
                    src={image.src}
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