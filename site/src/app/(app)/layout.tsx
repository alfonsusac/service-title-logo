import MobileSidebar, { } from "./MobileSidebar"
import { getAuthors, getVariants } from "./data"
import { stringSorter } from "@/util/sort"
import Footer from "./Footer"
import { sidebar, SidebarContent, SidebarContentAuthorList } from "./Sidebar"
import { DesktopNavBar } from "./Navbar"
import { Suspense } from "react"
import VariantCard from "./VariantCard"
import ArtListFiltered from "./ArtListFiltered"
import { ArtList } from "./ArtList"

export default async function GlobalLayout(props: any) {
  const authors = await getAuthors()
  return (
    <div className="mx-auto max-w-screen-lg min-h-screen flex flex-col gap-8 font-display tracking-tight">
      <Suspense>
        <MobileSidebar />
      </Suspense>
      <div className="grow flex items-stretch">
        <div className="flex flex-none flex-col md:w-48 gap-px pt-60 rounded-lg ">
          {/* Sidebar */}
          <div className="py-5 sticky top-0 max-h-screen flex flex-col h-full gap-4">
            <div
              style={{ viewTransitionName: "sidebar" }}
              className={sidebar("flex-none")}
            >
              <SidebarContent />
            </div>
            <div
              style={{ viewTransitionName: "sidebar" }}
              className={sidebar("h-full")}
            >
              <SidebarContentAuthorList authors={authors} />
            </div>
          </div>
        </div>
        <div className="grow px-4 md:px-8">
          <main className="*:mb-2 pt-32">
            <header>
              <Suspense>
                {props.children}
              </Suspense>
            </header>
            <Suspense>
              <DesktopNavBar />
            </Suspense>
            <section className="rounded-2xl min-h-[50vh]">
              <ArtListServer />
            </section>
          </main>
          <Footer />
        </div>
      </div>
    </div>
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

