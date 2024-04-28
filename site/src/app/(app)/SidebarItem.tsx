"use client"

import { Link } from "next-view-transitions"
import { usePathname } from "next/navigation"

export default function SidebarItem(props: {
  href: string,
  label: string,
  large?: string,
  onClick?: () => void
}) {
  const pathname = usePathname()

  return (
    <Link
      href={props.href}
      className="cursor-pointer md:text-base leading-none -m-2 md:p-2 md:px-5 rounded-md font-medium 
      hover:text-theme-strong hover:bg-theme-cardHover font-display tracking-widest first:rounded-t-xl last:rounded-b-xl
      data-[active=true]:text-theme-strong
      data-[active=true]:bg-theme-cardHover
      data-[active=true]:pointer-events-none
      overflow-hidden text-nowrap
      text-xl p-4 px-6
      transition-all
      flex-none
" 
      data-active={props.href === pathname}
      onClick={props.onClick}
    >
      {props.label}
    </Link>
  )
}