"use client"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuPortal, DropdownMenuContent, DropdownMenuItem, DropdownMenuArrow } from "@radix-ui/react-dropdown-menu"
import { useTheme } from "next-themes"
import { themes } from "../themes"
import { IconamoonArrowDown2Fill } from "./Searchbar"
import { SVGProps } from "react"

export function ThemeDropdown() {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex-none text-theme-text z-10 tracking-wider flex items-center justify-center px-3 md:px-4 rounded-lg hover:bg-theme-card gap-2"
        >
          {/* <div className="hidden md:block">Theme</div> */}
          <MaterialSymbolsPalette className="text-2xl"/>
          <IconamoonArrowDown2Fill />
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuPortal>
        <DropdownMenuContent
          collisionPadding={10}
          className="z-50 bg-theme-card rounded-xl p-3 font-display tracking-wider flex flex-col gap 
          *:cursor-pointer
          animate-in fade-in-0 zoom-in-50
          shadow-xl
          shadow-black/20
          min-w-48
          "
        >
          <DropdownMenuArrow width={30} height={10} className="fill-theme-card"/>
          {themes.map((itheme, i) => {
            return (
              <DropdownMenuItem
                onClick={() => setTheme(itheme)}
                key={i}
                className=
                "p-3 -m-1 hover:bg-theme-cardHover outline-none rounded-lg cursor-pointer data-[selected=true]:bg-theme-cardHover data-[selected=true]:text-theme-strong"
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


export function MaterialSymbolsPalette(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 22q-2.05 0-3.875-.788t-3.187-2.15t-2.15-3.187T2 12q0-2.075.813-3.9t2.2-3.175T8.25 2.788T12.2 2q2 0 3.775.688t3.113 1.9t2.125 2.875T22 11.05q0 2.875-1.75 4.413T16 17h-1.85q-.225 0-.312.125t-.088.275q0 .3.375.863t.375 1.287q0 1.25-.687 1.85T12 22m-5.5-9q.65 0 1.075-.425T8 11.5t-.425-1.075T6.5 10t-1.075.425T5 11.5t.425 1.075T6.5 13m3-4q.65 0 1.075-.425T11 7.5t-.425-1.075T9.5 6t-1.075.425T8 7.5t.425 1.075T9.5 9m5 0q.65 0 1.075-.425T16 7.5t-.425-1.075T14.5 6t-1.075.425T13 7.5t.425 1.075T14.5 9m3 4q.65 0 1.075-.425T19 11.5t-.425-1.075T17.5 10t-1.075.425T16 11.5t.425 1.075T17.5 13"></path></svg>
  )
}