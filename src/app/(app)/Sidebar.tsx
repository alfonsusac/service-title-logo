import type { KawaiiLogosData } from "./data.types"
import { IcRoundHome, IcRoundPlus, IcRoundQuestionMark } from "./Icons"
import SidebarItem from "./SidebarItem"
import { cn } from "lazy-cn"

export const sidebar = (...o: any) => cn("hidden md:flex overflow-auto select-none flex-col gap-3 p-5 rounded-r-2xl lg:rounded-l-2xl bg-theme-card animate-in duration-300 fade-in-0 slide-in-from-left-10", ...o)

export function SidebarContent(props: {
  onItemClick?: () => void
}) {
  return (
    <>
      <SidebarItem
        href="/"
        label="Home"
        icon={<IcRoundHome className="text-xl" mode="" />}
        onClick={props.onItemClick}
        mode="exact"
      />
      <SidebarItem
        href="/about"
        label="About"
        icon={<IcRoundQuestionMark className="text-xl" mode="" />}
        onClick={props.onItemClick}
        mode="startsWith"
      />
      <SidebarItem
        href="/request"
        label="Request"
        icon={<IcRoundPlus className="text-xl" mode="" />}
        onClick={props.onItemClick}
        mode="startsWith"
      />
    </>
  )
}

export function SidebarContentAuthorList(props: {
  onItemClick?: () => void
  authors: KawaiiLogosData.Author[]
}) {
  return (
    <>
      {
        props.authors
          ?.sort((a, b) => (b.entryIds.length - a.entryIds.length))
          .map(author => {
            return (
              <SidebarItem
                key={author.id}
                href={"/" + author.id}
                label={author.displayName}
                icon={author.entryIds.length}
                mode="startsWith"
              />
            )
          })
      }
    </>
  )
}