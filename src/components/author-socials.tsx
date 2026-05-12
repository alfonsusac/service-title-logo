import type { KawaiiLogosData } from "@/app/(app)/data.types"
import { IconParkSolidTwitter, MaterialSymbolsGlobe, RiBehanceFill, SimpleIconsBluesky, SolarFigmaBold, TablerBrandDribbbleFilled, UimGithubAlt, type IconElement } from "@/app/(app)/Icons"
import type { SVGProps } from "react"
import { InlineLink } from "./ui-icon-button"

export function AuthorSocialsIconArray(props: {
  socials: KawaiiLogosData.Author.SocialLinks,
  personalSites: KawaiiLogosData.Author.PersonalSites
}) {
  return (
    <>
      {props.socials.map((social, i) => {
        const Icon = socialIconMap[ social.type ]
        return <InlineLink
          key={i}
          href={social.url}
          target="_blank"
        >
          <Icon />
        </InlineLink>
      })}
      {props.personalSites.map((url, i) => {
        return <InlineLink
          key={i}
          href={url}
          target="_blank"
        >
          <MaterialSymbolsGlobe />
        </InlineLink>
      })}
    </>
  )
}


const socialIconMap: Record<KawaiiLogosData.SocialTypes, IconElement> = {
  behance: RiBehanceFill,
  dribbble: TablerBrandDribbbleFilled,
  figma: SolarFigmaBold,
  github: UimGithubAlt,
  x: IconParkSolidTwitter,
  bsky: SimpleIconsBluesky
}