"use client"

import { cn } from "lazy-cn"
import { useQueryState } from "nuqs"
import { SVGProps } from "react"
import { usePathname } from "next/navigation"

export function IconamoonArrowDown2Fill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7 9a1 1 0 0 0-.707 1.707l5 5a1 1 0 0 0 1.414 0l5-5A1 1 0 0 0 17 9z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export default function SearchBar(props: { className?: string; style?: any }) {
  const [search, setSearch] = useQueryState("search")

  const pathname = usePathname()
  if (pathname === "/about") return
  if (pathname === "/request") return

  return (
    <div
      style={{
        viewTransitionName: "searchbar",
      }}
      className={cn(
        "transition-all p-1 px-3 h-12 rounded-full bg-theme-card relative z-10 flex",
        props.className,
      )}
    >
      <input
        className="font-display tracking-widest text-theme-stronger placeholder:text-theme-text text-xl rounded-md p-2 w-full outline-none bg-transparent"
        placeholder="search..."
        value={search || ""}
        onChange={event => {
          if (event.target.value === "") {
            setSearch(null)
          } else {
            setSearch(event.target.value)
          }
        }}
      />
      <div className="flex-none items-center justify-center h-full aspect-square rounded-full -mr-2
        select-none cursor-pointer text-xl
        pointer-events-none data-[display=true]:pointer-events-auto
        text-transparent 
        hidden
        data-[display=true]:flex
        data-[display=true]:text-theme-text
        hover:data-[display=true]:text-theme-strong
      "
        data-display={search ? true : false}
        onClick={() => setSearch(null)}
      >
        x
      </div>
    </div>
  )
}
