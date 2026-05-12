"use client"

import { cn } from "lazy-cn"
import { use, useState } from "react"
import { SidebarSeparator } from "./SidebarItem"
import SearchBar from "./Searchbar"
import { ThemeDropdown } from "./ThemeChanger"
import { fetchAuthors } from "./data"
import { SidebarContent, SidebarContentAuthorList } from "./Sidebar"
import { useMounted } from "./useMounted"
import { CharmChevronLeft, CharmMenuHamburger } from "./Icons"

const authorPromise = fetchAuthors()

export default function SidebarMobile() {
  const authors = use(authorPromise)
  const mounted = useMounted()

  const [ open, setOpen ] = useState(false)
  const close = () => setOpen(false)

  return (
    <div
      className={cn(
        "md:hidden top-0 left-0 fixed flex items-center justify-between bg-transparent isolate z-20 select-none",
        mounted ? "" : "opacity-0 pointer-events-none"
      )}
    // style={{ viewTransitionName: `mobile-sidebar` }}
    >
      <div className="flex relative p-3 gap-2 w-screen bg-theme-bg z-10"
      // style={{ viewTransitionName: "mobile-top-bar" }}
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
      <div className="absolute top-0 left-0 h-screen py-4 flex flex-col pointer-events-none">
        <div
          className={cn(
            // "rotate-12",
            "pointer-events-auto",
            "transition-all duration-300  right-0 z-20 origin-top-right shadow-2xl",
            open ? "rotate-0" : "-translate-x-full ",
            "relative flex flex-col gap-3 p-5 rounded-r-2xl lg:rounded-l-2xl bg-theme-card",
            "overflow-auto overscroll-contain"
          )}
        >
          <SidebarContent onItemClick={close} />
          <SidebarSeparator />
          <SidebarContentAuthorList onItemClick={close} authors={authors} />
        </div>
      </div>
      {open && (
        <div
          className="absolute inset-0 w-screen h-screen z-10 starting:opacity-0 opacity-100 transition-[opacity] bg-black/50"
          onClick={event => {
            event.stopPropagation()
            setOpen(false)
          }}
        ></div>
      )}
    </div>
  )
}

