"use client"

import { use } from "react"
import { getData } from "./(app)/data"
import ago from "s-ago"
import Link from "next/link"
import { IconParkSolidTwitter, UimGithubAlt } from "./(app)/[author]/page"
import { ThemeDropdown } from "./(app)/ThemeChanger"
import { button } from "./(app)/AppButton"

const getDataPromise = getData()

export default function NotFoundPage() {
  const data = use(getDataPromise)
  return (
    <main className="font-display w-screen min-h-screen bg-theme-bg text-theme-text tracking-wider
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
          <Untidy text={`Page \nnot found`} />
        </div>
        <Link href="/" className={button()}>
          Back to Home
        </Link>
      </div>
      <section className="flex flex-col items-center">
        <h1 className="text-center text-xl font-display tracking-wider text-theme-strong relative z-[1] text-pretty mb-2">VTuber Service Logo</h1>
        <p className="text-center font-display tracking-widest text-lg text-pretty">A collection of service logos with the VTuber style.</p>
        <p className="text-center font-display tracking-widest text-lg text-pretty">Last updated:{' '}{ago(new Date(data.updatedAt))}</p>
        <div className="flex gap-2 text-2xl md:text-2xl mt-4">
          <a
            className="text-theme-strong hover:underline"
            href={"https://github.com/alfonsusac/service-title-logo"}
            target="_blank"
          >
            <UimGithubAlt className="inline" />
          </a>
          <a
            className="text-theme-strong hover:underline"
            href={"https://twitter.com/alfonsusac"}
            target="_blank"
          >
            <IconParkSolidTwitter className="inline" />
          </a>
        </div>
      </section>
    </main>
  )
}

export function Untidy(props: {
  text: string
}) {
  const chars = props.text.split('')


  return chars.map((char, i) => {
    if (char === '\n') return <br key={i} className="sm:hidden" />
    const stringifiedPI = Math.PI.toString().split('.')[1].split('').map(char => Number(char) - 5) 

    return (
      <span
        key={i}
        style={{
          display: char !== ' ' ? 'inline-block' : '',
          rotate: `${ stringifiedPI[i] * 3}deg`,
          translate: `0 ${ 
            Math.sin((i/chars.length) * Math.PI * 2 + 1/4 * Math.PI) * 0.6
           }rem`,
        }}
      >{char}</span>
    )
  })
}