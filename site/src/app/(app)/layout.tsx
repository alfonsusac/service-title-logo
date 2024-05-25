import MobileSidebar, { } from "./MobileSidebar"
import { getAuthors, getVariants } from "./data"
import { stringSorter } from "@/util/sort"
import Footer from "./Footer"
import { sidebar, SidebarContent, SidebarContentAuthorList } from "./Sidebar"
import { DesktopNavBar } from "./Navbar"
import { Suspense } from "react"
import VariantCard from "./VariantCard"
import ArtListFiltered from "./ArtList.client"
import { ArtList } from "./ArtList"
import { SidebarSeparator } from "./SidebarItem"
import { cn } from "lazy-cn"

export default async function GlobalLayout(props: any) {
  const authors = await getAuthors()
  return (
    <div>
      <Suspense>
        <MobileSidebar />
      </Suspense>
      {/* Centered content */}
      <div className={cn(
        "grow flex",
        "max-w-screen-lg",
        "mx-auto"
      )}>
        <div className="hidden md:flex flex-none flex-col md:w-48 gap-px relative z-20">
          {/* Floating sidebar */}
          <div className="fixed md:w-48 top-0 max-h-screen flex flex-col h-[100svh]">
            {/* Sidebar list */}
            <div className={sidebar("flex-none h-full my-2 mt-0 pb-0 overflow-hidden rounded-none block ")}>
              <SidebarContent />
              <SidebarSeparator />
              <div className="overflow-auto overscroll-contain -m-2 p-2 h-0 grow pb-6 -mr-6 pr-6 -ml-3 pl-3 -mt-3 pt-3 flex flex-col gap-3" >
                <SidebarContentAuthorList authors={authors} />
              </div>
            </div>
            {/* Left grey padding */}
            <div className="bg-theme-card absolute right-0 w-[999rem] h-[999rem] origin-right -z-10" />
          </div>
        </div>
        {/* Tab content */}
        <div className="grow px-4 md:px-8">
          <main className="pt-20">
            {props.children}
          </main>
          <Footer />
        </div>
      </div>
    </div >
  )
}

async function ArtListServer() {
  const variants = await getVariants()
  return (
    <>
      <Suspense>
        <ArtListFiltered variants={variants.sort(stringSorter(variants[0], "name"))} />
      </Suspense>
      <noscript>
        <ArtList variants={variants} />
      </noscript>
    </>
  )
}

