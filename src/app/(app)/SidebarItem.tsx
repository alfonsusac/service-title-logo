"use client"

import { Link } from "next-view-transitions"
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
  onClick?: () => void
}) {
  const pathname = usePathname()

  return (
    <Link
      href={props.href}
      className="cursor-pointer md:text-base leading-none -m-2 md:p-2 md:px-4 rounded-md font-medium 
      hover:text-theme-strong hover:bg-theme-cardHover font-display tracking-widest first:rounded-t-xl last:rounded-b-xl
      data-[active=true]:text-theme-strong
      data-[active=true]:bg-theme-cardHover
      data-[active=true]:pointer-events-none
      overflow-hidden text-nowrap
      text-xl p-4 px-5
      transition-all
      flex-none
      flex items-center justify-between
"
      data-active={props.href === pathname}
      onClick={props.onClick}
    >
      <div className="flex-grow text-ellipsis overflow-hidden">
        {props.label}
      </div>
      <div className="flex-none w-5 h-5 -mr-2 rounded-full text-end opacity-40 scale-90">
        {props.icon}
      </div>
    </Link>
  )
}