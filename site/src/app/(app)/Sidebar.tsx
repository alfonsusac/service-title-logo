"use client"

import { cn } from "lazy-cn"
import { SVGProps, use, useState } from "react"
import SidebarItem from "./SidebarItem"
import SearchBar from "./Searchbar"
import { ThemeDropdown } from "./ThemeChanger"
import { stringSorter } from "@/util/sort"
import { getAuthors } from "./data"

const authorPromise = getAuthors()

export default function MobileSidebar() {
  const authors = use(authorPromise)

  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div
      className="md:hidden top-0 left-0 fixed flex items-center justify-between bg-transparent isolate z-20 select-none bg-red-500"
      style={{
        viewTransitionName: `mobile-sidebar`,
      }}
    >
      <div className="flex relative p-3 gap-2 w-screen bg-theme-bg z-10 "
        style={{
          viewTransitionName: "mobile-top-bar",
        }}
      >
        <div
          onClick={() => setOpen(!open)}
          className="flex-none bg-theme-card w-12 h-12 text-2xl text-theme-strong rounded-xl flex items-center justify-center"

        >
          <CharmMenuHamburger
            className={cn(
              "transition-all absolute",
              open && "rotate-90 opacity-0"
            )}
          />
          <CharmChevronLeft
            className={cn(
              "transition-all absolute -rotate-90 opacity-0",
              open && "rotate-0 opacity-100"
            )}
          />
        </div>
        <div className="grow flex">
          <SearchBar className="" />
        </div>
        <ThemeDropdown />
      </div>

      {/* Sidebar Swing */}
      <div className="absolute top-0 left-0 h-screen py-4 pt-20 flex flex-col">
        <div
          className={cn(
            "transition-all duration-300  right-0 z-20 rotate-12 origin-top-right shadow-2xl",
            open ? "rotate-0" : "-translate-x-full ",
            "relative flex flex-col gap-3 p-5 rounded-r-2xl lg:rounded-l-2xl bg-theme-card",
            "overflow-auto"
          )}
        >
          <SidebarItem href="/" label="Home" onClick={close} icon={<IcRoundHome className="text-xl" />} />

          {authors.sort(stringSorter(authors[0], "handleName"))
            .map(author => {
              return (
                <SidebarItem
                  key={author.handleName}
                  href={"/" + author.handleName}
                  label={author.handleName}
                  onClick={close}
                  icon={(author.groups?.length ?? 0) + (author.images?.length ?? 0)}
                />
              )
            })}

          <SidebarItem href="/about" label="About" onClick={close} icon={<IcRoundQuestionMark className="text-xl" />} />
          <SidebarItem href="/request" label="Request" onClick={close} icon={<IcRoundPlus className="text-xl" />} />

        </div>
      </div>
      {open && (
        <div
          className="absolute inset-0 w-screen h-screen z-10 animate-in fade-in-0 bg-black/50"
          onClick={event => {
            event.stopPropagation()
            setOpen(false)
          }}
        ></div>
      )}
    </div>
  )
}

function CharmMenuHamburger(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"></path></svg>
  )
}



export function CharmChevronLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.25 3.75L5.75 8l4.5 4.25"></path></svg>
  )
}



export function IcRoundHome(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"></path></svg>
  )
}

export function IcRoundQuestionMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M7.92 7.54c-.8-.34-1.14-1.33-.66-2.05C8.23 4.05 9.85 3 11.99 3c2.35 0 3.96 1.07 4.78 2.41c.7 1.15 1.11 3.3.03 4.9c-1.2 1.77-2.35 2.31-2.97 3.45c-.15.27-.24.49-.3.94c-.09.73-.69 1.3-1.43 1.3c-.87 0-1.58-.75-1.48-1.62c.06-.51.18-1.04.46-1.54c.77-1.39 2.25-2.21 3.11-3.44c.91-1.29.4-3.7-2.18-3.7c-1.17 0-1.93.61-2.4 1.34c-.35.57-1.08.75-1.69.5M14 20c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2"></path></svg>
  )
}

export function IcRoundPlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" {...props}><path d="M417.4 224H288V94.6c0-16.9-14.3-30.6-32-30.6s-32 13.7-32 30.6V224H94.6C77.7 224 64 238.3 64 256s13.7 32 30.6 32H224v129.4c0 16.9 14.3 30.6 32 30.6s32-13.7 32-30.6V288h129.4c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32z" fill="currentColor"></path></svg>
  )
}

export function IonPlusRound(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512" {...props}><path d="M417.4 224H288V94.6c0-16.9-14.3-30.6-32-30.6s-32 13.7-32 30.6V224H94.6C77.7 224 64 238.3 64 256s13.7 32 30.6 32H224v129.4c0 16.9 14.3 30.6 32 30.6s32-13.7 32-30.6V288h129.4c16.9 0 30.6-14.3 30.6-32s-13.7-32-30.6-32z" fill="currentColor"></path></svg>
  )
}