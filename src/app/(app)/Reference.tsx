import Link from "next/link"
import { UimGithubAlt, IconParkSolidTwitter, SimpleIconsBluesky, TokenSkeb, type IconElement, MingcuteArrowRightUpFill } from "./Icons"
import type { Reference } from "./data.types"

export const referenceIconMap = {
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
  "skeb-creator-guideline-page": TokenSkeb
} satisfies Record<Reference[ 'urlType' ][ 'type' ], IconElement>

export function ListOfReferences(props: {
  references: Reference[]
}) {
  return <ul className="text-ellipsis">
    {props.references.map((ref, index) => {
      const Icon = referenceIconMap[ ref.urlType.type ] || (() => <></>)
      return <li key={index} className=" list-item list-disc list-inside truncate">
        <Link href={ref.url} target="_blank" className="hover:text-theme-strong">
          <Icon className="inline mr-1" /> {ref.urlType.label}<MingcuteArrowRightUpFill className="inline align-[-0.16rem]" />
        </Link>
      </li>
    })}
  </ul>
}