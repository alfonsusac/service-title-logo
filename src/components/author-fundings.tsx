import type { KawaiiLogosData } from "@/app/(app)/data.types"
import { CibKoFi, RiPaypalFill, SimpleIconsBuymeacoffee, TablerBrandPatreonFilled, TablerSquareRoundedLetterSFilled, TokenSkeb, UimGithubAlt, type IconElement } from "../app/(app)/Icons"
import { InlineLink } from "./ui-icon-button"


const fundingsIconMap: Record<KawaiiLogosData.FundingTypes, IconElement> = {
  patreon: TablerBrandPatreonFilled,
  "ko-fi": CibKoFi,
  buymeacoffee: SimpleIconsBuymeacoffee,
  github: UimGithubAlt,
  paypal: RiPaypalFill,
  skeb: TokenSkeb,
  saweria: TablerSquareRoundedLetterSFilled,
}




export function FundingsIconList(props: {
  fundings: KawaiiLogosData.Author.Fundings
}) {
  return (
    <>
      {
        props.fundings.map((funding, i) => {
          const Icon = fundingsIconMap[ funding.type ]
          return (
            <InlineLink key={i}
              href={funding.url}
              target="_blank">
              <Icon />
            </InlineLink>
          )
        })
      }
    </>
  )
}