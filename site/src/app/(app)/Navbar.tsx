import { Suspense } from "react"
import SearchBar from "./Searchbar"
import { ThemeDropdown } from "./ThemeChanger"

export function DesktopNavBar() {
  return (
    <div className="hidden md:flex gap-2 sticky top-5 z-10"
      style={{
        viewTransitionName: "desktop-searchbar",
      }}
    >
      <div className="transition-all absolute inset-0 -mt-5 -mx-4 h-16 rounded-b-3xl bg-theme-bg" />
      <div className="grow">
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>
      <Suspense>
        <ThemeDropdown />
      </Suspense>
      <div className="transition-all absolute left-0 right-0 top-16 h-12 rounded-t-xl shadow-[0_-40px_0_0_var(--bg)] bg-transparent" />
    </div>
  )
}