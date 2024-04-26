"use client"

import { Link } from "next-view-transitions"
import { usePathname } from "next/navigation"

export default function SidebarItem(props: {
  href: string,
  label: string,
  large?: string,
}) {
  const pathname = usePathname()

  return (
    <Link
      href={props.href}
      className="cursor-pointer md:text-base leading-none -m-2 md:p-2 md:px-5 rounded-md font-medium text-slate-400 
      hover:text-slate-500 hover:bg-slate-200 font-display tracking-widest first:rounded-t-xl last:rounded-b-xl
      data-[active=true]:text-slate-500
      data-[active=true]:bg-slate-200
      overflow-hidden text-nowrap
      text-xl p-4 px-6
              "
      data-active={props.href === pathname}
    >
      {props.label}
    </Link>
  )
}