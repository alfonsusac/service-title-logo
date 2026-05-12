import type { KawaiiLogosData } from "@/app/(app)/data.types"
import { InlineLink } from "./ui-icon-button"
import { IconParkSolidTwitter, SimpleIconsBluesky, TokenSkeb, type IconElement, MingcuteArrowRightUpFill, UimGithubAlt, SolarFigmaBold, MaterialSymbolsGlobe, MaterialSymbolsShoppingCartRounded } from "@/app/(app)/Icons"
import { Link } from "next-view-transitions"
import type { SVGProps } from "react"

export function ReferenceLink(props: {
  reference: KawaiiLogosData.Reference,
}) {
  const ref = props.reference

  return (
    <InlineLink
      className="text-theme-strong hover:underline"
      href={ref.link.url}
      target="_blank">
      {referenceLabelMap[ ref.link.type ]}
    </InlineLink>
  )
}

export const referenceIconMap: Record<KawaiiLogosData.Reference[ 'link' ][ 'type' ], IconElement> = {
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
  "bsky-post": SimpleIconsBluesky,
  "skeb-creator-page": TokenSkeb,
  "skeb-creator-guideline-page": TokenSkeb,
  "figma-file": SolarFigmaBold,
  "official-website-usage": MaterialSymbolsGlobe,
  "shop-page": MaterialSymbolsShoppingCartRounded,
}

export const referenceLabelMap: Record<KawaiiLogosData.Reference[ 'link' ][ 'type' ], string> = {
  'unknown': "Unknown",
  "github-repo-text-content": "GitHub Repo (Text Content)",
  "github-blob": "GitHub Blob",
  "github-repo": "GitHub Repo",
  "github-raw": "GitHub Raw",
  "github-camo": "GitHub Camo",
  "github-unknown": "GitHub Unknown",
  "gist-raw": "Gist Raw",
  "gist-page": "Gist Page",
  "google-drive": "Google Drive",
  "twitter-post": "Twitter Post",
  "bsky-post": "Bluesky Post",
  "skeb-creator-page": "Skeb Creator Page",
  "skeb-creator-guideline-page": "Skeb Creator Guideline Page",
  "figma-file": "Figma File",
  "official-website-usage": "Official Website Usage Page",
  'shop-page': 'Shop Page',
}


export function ListOfReferences(props: {
  references: KawaiiLogosData.Reference[],
  showUrl?: boolean,
}) {
  return <ul className="text-ellipsis flex flex-col">
    {props.references.map((ref, index) => {
      const Icon = referenceIconMap[ ref.link.type ] || (() => <></>)
      return <li key={index} className=" list-item list-disc list-inside truncate block leading-loose">
        <Link href={ref.link.url} target="_blank" className="hover:text-theme-strong group py-4">
          <Icon className="inline mr-1" /> {referenceLabelMap[ ref.link.type ]}
          <MingcuteArrowRightUpFill className="inline align-[-0.16rem]" />
          {props.showUrl && <span className="ml-2 ml-1 text-theme-text/50 group-hover:text-theme-text/80 truncate">{ref.link.url}</span>}
        </Link>
      </li>
    })}
  </ul>
}