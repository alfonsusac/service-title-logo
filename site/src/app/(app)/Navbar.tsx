"use client"

import { Suspense } from "react"
import SearchBar from "./Searchbar"
import { ThemeDropdown } from "./ThemeChanger"
import { useMounted } from "./useMounted"
import { cn } from "lazy-cn"

export function DesktopNavBar() {

  const mounted = useMounted()

  return (
    <div className={cn(
      "hidden md:flex gap-2 z-10 transition-all",
      "bg-red-500",
      mounted ? "sticky top-4" : "opacity-0 pointer-events-none"
    )}
      style={{
        viewTransitionName: "desktop-searchbar",
      }}
    >
      <div className="transition-all absolute inset-0 -mt-4 -mx-4 h-20 bg-theme-bg -ml-8" />
      <div className="grow">
        <SearchBar />
      </div>
      <ThemeSwitcher />
      {/* <div className="transition-all absolute left-0 right-0 top-16 h-12 rounded-t-xl shadow-[0_-40px_0_0_var(--bg)] bg-transparent" /> */}
    </div>
  )
}

function ThemeSwitcher() {
  return (
    <ThemeDropdown />
  )
}