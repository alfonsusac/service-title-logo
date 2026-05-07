import ago from "s-ago"
import Link from "next/link"
import { IconParkSolidTwitter, UimGithubAlt } from "./(app)/[authorid]/page"
import { ThemeDropdown } from "./(app)/ThemeChanger"
import { button } from "./(app)/AppButton"
import { UpdatedAt } from "./(app)/Footer"
import type { SVGProps } from "react"


export default function NotFoundPage(props: {
  what?: string,
  back?: {
    what: string,
    href: string,
  }
}) {
  return (
    <main className="font-display min-h-screen bg-theme-bg text-theme-text tracking-wider
      flex flex-col gap-4 justify-center items-center
      text-center px-4 overflow-hidden
    ">
      <div className="fixed top-0 right-0 h-16 p-2 flex">
        <ThemeDropdown />
      </div>
      <div className="mt-20 mb-8">
        <div className="text-xl">
          {`404 :(`}
        </div>
        <div className="text-theme-stronger text-5xl md:text-6xl tracking-wide mb-8 leading-snug">
          <Untidy text={`${ props.what ?? "Page" } \nnot found`} />
        </div>
        <Link href={props.back?.href ?? "/"} className={button()}>
          <MaterialSymbolsArrowLeftAltRounded className="size-8" />
          Back to {props.back?.what ?? "Home"}
        </Link>
      </div>

    </main>
  )
}

export function Untidy(props: {
  text: string
}) {
  const chars = props.text.split('')


  return chars.map((char, i) => {
    if (char === '\n') return <br key={i} className="sm:hidden" />
    const stringifiedPI = Math.PI.toString().split('.')[ 1 ].split('').map(char => Number(char) - 5)

    return (
      <span
        key={i}
        style={{
          display: char !== ' ' ? 'inline-block' : '',
          rotate: `${ stringifiedPI[ i ] * 3 }deg`,
          translate: `0 ${ Math.sin((i / chars.length) * Math.PI * 2 + 1 / 4 * Math.PI) * 0.6
            }rem`,
        }}
      >{char}</span>
    )
  })
}


export function MaterialSymbolsArrowLeftAltRounded(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="m7.85 13l2.85 2.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L4.7 12.7q-.3-.3-.3-.7t.3-.7l4.575-4.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7L7.85 11H19q.425 0 .713.288T20 12t-.288.713T19 13z" /></svg>
  )
}