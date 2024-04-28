"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { useTheme } from "next-themes"
import { themes } from "../themes"
import { IconamoonArrowDown2Fill } from "./Searchbar"

export default function ThemeChanger() {
    const { theme, setTheme } = useTheme();

    return (
      <div>
        {/* The current theme is: {theme}<br /> */}
        <button onClick={() => setTheme("light")}>Light Mode</button><br />
        <button onClick={() => setTheme("dark")}>Dark Mode</button><br />
        <button onClick={() => setTheme("catppuccin")}>Catpuccin Mode</button><br />
      </div>
    );
}

export function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex-none text-theme-text z-10 tracking-wider flex items-center justify-center px-4 rounded-lg hover:bg-theme-card gap-2"
        >
          <div>Theme</div>
          <IconamoonArrowDown2Fill />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className="z-50 bg-theme-card rounded-xl p-3 font-display tracking-wider flex flex-col gap 
          *:p-3 *:-m-1 hover:*:bg-theme-cardHover *:outline-none *:rounded-lg
          *:cursor-pointer
          animate-in fade-in-0 zoom-in-50
          "
        >
          {themes.map((itheme, i) => {
            return (
              <DropdownMenuItem
                onClick={() => setTheme(itheme)}
                key={i}
                className="data-[selected=true]:bg-theme-cardHover data-[selected=true]:text-theme-strong"
                data-selected={theme === itheme}
              >
                {itheme}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
}