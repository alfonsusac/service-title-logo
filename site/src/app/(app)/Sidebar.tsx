"use client"

import { cn } from "lazy-cn"
import { SVGProps, useState } from "react"
import SidebarItem from "./SidebarItem"
import { authors } from "../../../../data/authors"
import SearchBar from "./Searchbar"
import { ThemeDropdown } from "./ThemeChanger"

export default function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <div
      className="md:hidden transform-gpu top-0 left-0 fixed flex items-center justify-between bg-transparent isolate z-50 select-none bg-red-500"
      style={{
        viewTransitionName: `mobile-sidebar`,
      }}
    >
      <div className="flex relative p-3 gap-2 w-screen bg-theme-bg z-10">
        <div
          onClick={() => setOpen(!open)}
          className="bg-theme-card w-12 h-12 text-2xl text-theme-strong rounded-xl flex items-center justify-center"
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
          <SidebarItem href="/" label="Home" onClick={close} />
          {Object.values(authors)
            .sort((a, b) =>
              a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
            )
            .map(author => {
              return (
                <SidebarItem
                  key={author.name}
                  href={"/" + author.name}
                  label={author.name}
                  onClick={close}
                />
              );
            })}
        </div>
      </div>
      {open && (
        <div
          className="absolute inset-0 w-screen h-screen z-10"
          onClick={event => {
            event.stopPropagation();
            setOpen(false);
          }}
        ></div>
      )}
    </div>
  );
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