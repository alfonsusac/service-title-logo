import { authors } from "@/data/authors"
import Link from "next/link"
import SidebarItem from "./SidebarItem"
import { IconParkSolidTwitter, UimGithubAlt } from "./[author]/page"
import { SVGProps } from "react"
import MobileSidebar from "./Sidebar"




export default function GlobalLayout(props: any) {
  return (
    <div className="mx-auto max-w-screen-lg min-h-screen flex flex-col gap-8 font-mono tracking-tight text-slate-700 ">

      <div className="grow flex items-stretch">
        <div className="flex flex-col md:w-48 gap-px p-1 pt-48 rounded-lg">


          <MobileSidebar />
          {/* Sidebar */}
          <div className="hidden md:flex  flex-col gap-3 p-5 rounded-r-2xl lg:rounded-l-2xl bg-slate-100 sticky top-20 animate-in duration-300 fade-in-0 slide-in-from-left-10">

            <SidebarItem href="/" label="Home" />
            {
              Object.values(authors).sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)).map(author => {
                return (
                  <SidebarItem key={author.name} href={'/' + author.name} label={author.name} />
                )
              })
            }
          </div>

        </div>
        <div className="grow overflow-auto pt-20 px-8 bg-white">
          {props.children}
          <footer className="my-20 py-16 bg-slate-50 rounded-3xl flex flex-col gap-3 items-center justify-center text-sm text-slate-400 font-display tracking-widest text-center">
            <p>All rights reserved to the respective artists © {new Date().getFullYear()}</p>
            <p>Contributions are welcome!</p>
            <div className="flex gap-2 text-2xl">
              <a className="text-slate-500 hover:underline" href={"https://github.com/alfonsusac/service-title-logo"} target="_blank"><UimGithubAlt className="inline" /></a>
              <a className="text-slate-500 hover:underline" href={"https://twitter.com/alfonsusac"} target="_blank"><IconParkSolidTwitter className="inline" /></a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}