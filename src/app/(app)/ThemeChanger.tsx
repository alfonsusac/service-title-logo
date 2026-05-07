"use client"

import {
  DropdownMenu,
  // DropdownMenuTrigger,
  // DropdownMenuPortal,
  // DropdownMenuContent,
  // DropdownMenuItem, DropdownMenuArrow
} from "radix-ui"
import { useTheme } from "next-themes"
import { themes } from "../themes"
import { useMounted } from "./useMounted"
import { cn } from "lazy-cn"
import { IconamoonArrowDown2Fill, MaterialSymbolsPalette } from "./Icons"

export function ThemeDropdown() {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div
          role="button"
          className={cn(
            "flex-none text-theme-text z-10 tracking-wider flex items-center justify-center px-3 md:px-4 rounded-lg hover:bg-theme-card gap-2"
            , mounted ? "" : "opacity-0 pointer-events-none"
          )}

        >
          {/* <div className="hidden md:block">Theme</div> */}
          <MaterialSymbolsPalette className="text-2xl" />
          <IconamoonArrowDown2Fill />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          collisionPadding={10}
          className="z-50 bg-theme-card rounded-xl p-3 font-display tracking-wider flex flex-col gap 
          *:cursor-pointer
          animate-in fade-in-0 zoom-in-50
          shadow-xl
          shadow-black/20
          min-w-48
          max-h-[var(--radix-dropdown-menu-content-available-height)]
          overflow-y-auto
          "
        >
          <DropdownMenu.Arrow width={30} height={10} className="fill-theme-card" />
          {themes.map((itheme, i) => {
            return (
              <DropdownMenu.Item
                onClick={() => setTheme(itheme)}
                key={i}
                className="p-3 -m-1 hover:bg-theme-cardHover outline-none rounded-lg cursor-pointer data-[selected=true]:bg-theme-cardHover data-[selected=true]:text-theme-strong 
                flex-none
                "
                data-selected={theme === itheme}
              >
                {itheme}
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}




// max-h-[var(--radix-dropdown-menu-content-available-height)]
// overflow-y-auto

// flex-none