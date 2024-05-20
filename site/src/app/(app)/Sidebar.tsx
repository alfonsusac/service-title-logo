import { stringSorter } from "@/util/sort"
import { IcRoundHome, IcRoundPlus, IcRoundQuestionMark } from "./MobileSidebar"
import SidebarItem, { SidebarSeparator } from "./SidebarItem"
import { Entries } from "kawaii-logos-data"
import { ReactNode } from "react"
import { cn } from "lazy-cn"

export const sidebar = (...o: any) => cn("hidden md:flex overflow-auto select-none flex-col gap-3 p-5 rounded-r-2xl lg:rounded-l-2xl bg-theme-card animate-in duration-300 fade-in-0 slide-in-from-left-10", ...o)

export function SidebarContent(props: {
  onItemClick?: () => void
}) {
  return (
    <>
      <SidebarItem href="/" label="Home" icon={<IcRoundHome className="text-xl" />} onClick={props.onItemClick} />
      <SidebarItem href="/about" label="About" icon={<IcRoundQuestionMark className="text-xl" />} onClick={props.onItemClick} />
      <SidebarItem href="/request" label="Request" icon={<IcRoundPlus className="text-xl" />} onClick={props.onItemClick} />
    </>
  )
}

export function SidebarContentAuthorList(props: {
  onItemClick?: () => void
  authors?: Entries
}) {
  return (
    <>
      {
        props.authors?.sort((a, b) => ((b.groups?.length ?? 0) + (b.images?.length ?? 0)) - ((a.groups?.length ?? 0) + (a.images?.length ?? 0)))
          .map(author => {
            return (
              <SidebarItem
                key={author.handleName}
                href={"/" + author.handleName}
                label={author.handleName}
                icon={(author.groups?.length ?? 0) + (author.images?.length ?? 0)}
              />
            )
          })
      }
    </>
  )
}