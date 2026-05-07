"use client"

import { useState, type JSX, type SVGProps } from "react"
import { ImageWithError } from "../../ArtListItemImage"
import type { AuthorOutput } from "../../data.types"
import { IconParkSolidTwitter, SimpleIconsBluesky, UimGithubAlt } from "../../Icons"

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
    <div className="w-full gap-2 grid grid-rows-[1fr_--spacing(24)] grid-cols-1 lg:grid-rows-1 lg:grid-cols-[1fr_--spacing(32)] ">
      <div className="rounded-2xl bg-theme-card relative flex flex-col">
        <div className="p-6 bg-theme-bg/50">
          <div className="relative w-full h-full aspect-video ">
            <ImageWithError
              key={selectedImageIndex}
              alt={entry.title}
              src={selectedImage.src}
            />
          </div>
        </div>

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
                } satisfies Record<typeof ref.urlType, (props: SVGProps<SVGSVGElement>) => JSX.Element>

                const Icon = iconMap[ ref.urlType ] || (() => <></>)

                return <li key={index} className=" list-item list-disc list-inside truncate">
                  <Icon className="inline mr-1" /> {ref.url}
                </li>
              })}
            </ul>
          </div>


        </div>
      </div>
      <div className="rounded-2xl bg-theme-card w-full h-full overflow-y-auto flex flex-col">
        <div className="flex flex-col basis-0 grow">
          {images.map((image, index) => {

            return <button
              key={index}
              className="aspect-[4/3] p-2 w-full shrink-0 hover:bg-theme-cardHover"
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
    </div>
  )
}