"use client"

import { Suspense } from "react"
import SearchBar from "./Searchbar"
import { ThemeDropdown } from "./ThemeChanger"
import { useMounted } from "./useMounted"
import { cn } from "lazy-cn"

export function DesktopSearchBar() {

  // const mounted = useMounted()

  return (
    <div className={cn(
      "hidden md:flex gap-2 z-10 transition-all",
      "starting-bottom-fade-in-2"
    )}
    >
      <div className="transition-all absolute inset-0 -mt-4 -mx-4 h-20 bg-theme-bg -ml-8" />
      <div className="grow">
        <SearchBar />
      </div>
      <ThemeSwitcher />
    </div>
  )
}

function ThemeSwitcher() {
  return (
    <ThemeDropdown />
  )
}
