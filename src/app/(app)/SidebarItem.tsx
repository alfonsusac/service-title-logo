"use client"

import { cn } from "lazy-cn"
import Link from "next/link"
// import { Link } from "next-view-transitions"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

export function SidebarSeparator() {
  return (
    <div className="h-px bg-theme-cardHover flex-none" />
  )
}

export default function SidebarItem(props: {
  href: string,
  label: string,
  icon?: ReactNode,
  large?: string,
  onClick?: () => void,
  mode: "exact" | "startsWith"
}) {
  const pathname = usePathname()

  const isActive = props.mode === "exact"
    ? pathname === props.href
    : pathname.startsWith(props.href)

  return (
    <Link
      href={props.href}
      className={cn("cursor-pointer md:text-base leading-none -m-2 md:p-2.5 md:px-4 rounded-md font-medium",
        "hover:text-theme-strong hover:bg-theme-cardHover font-display tracking-widest first:rounded-t-xl last:rounded-b-xl",
        "data-[active=true]:text-theme-strong",
        "data-[active=true]:bg-theme-cardHover",
        props.mode === "exact" && "data-[active=true]:pointer-events-none",
        "overflow-hidden text-nowrap",
        "text-xl p-4 px-5",
        "transition-all",
        "flex-none",
        "flex items-center justify-between",
        "h-12 md:h-10",
      )}
      data-active={isActive}
      onClick={props.onClick}
    >
      <div className="flex-grow text-ellipsis overflow-hidden">
        {props.label}
      </div>
      <div className="flex-none shrink-0 w-5 -mr-2 rounded-full text-end opacity-40 scale-90">
        {props.icon}
      </div>
    </Link>
  )
}