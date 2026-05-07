import type { AuthorOutput } from "./data.types"
import { CibKoFi, RiPaypalFill, SimpleIconsBuymeacoffee, TablerBrandPatreonFilled, TablerSquareRoundedLetterSFilled, TokenSkeb, UimGithubAlt, type IconElement } from "./Icons"


const fundingsIconMap: Record<AuthorOutput.FundingType, IconElement> = {
  patreon: TablerBrandPatreonFilled,
  "ko-fi": CibKoFi,
  buymeacoffee: SimpleIconsBuymeacoffee,
  github: UimGithubAlt,
  paypal: RiPaypalFill,
  skeb: TokenSkeb,
  saweria: TablerSquareRoundedLetterSFilled,
}




export function FundingsIconList(props: {
  fundings: AuthorOutput.Fundings
}) {
  return (
    <>
      {
        props.fundings.map((funding, i) => {
          const Icon = fundingsIconMap[funding.type]
          return (
            <a key={i} className="inline-flex text-theme-strong hover:underline"
              href={funding.url}
              target="_blank">
              <Icon className="inline" />
            </a>
          )
        })
      }
    </>
  )
}