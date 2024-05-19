import SidebarItem, { SidebarSeparator } from "./SidebarItem"
import { IconParkSolidTwitter, UimGithubAlt } from "./[author]/page"
import { Suspense } from "react"
import MobileSidebar, { IcRoundHome, IcRoundPlus, IcRoundQuestionMark } from "./MobileSidebar"
import { DesktopSearchBar } from "./Searchbar"
import ArtList from "./ArtList"
import { getAuthors, getVariants } from "./data"
import { stringSorter } from "@/util/sort"
import Footer from "./Footer"
import ImageDetailPage from "./ImageDetail"
import { sidebar, SidebarContent, SidebarContentAuthorList } from "./Sidebar"

export default async function GlobalLayout(props: any) {
  const authors = await getAuthors()
  return (
    <div className="mx-auto max-w-screen-lg min-h-screen flex flex-col gap-8 font-display tracking-tight">
      {/* <ImageDetailPage > */}
      <MobileSidebar />
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
              {props.children}
            </header>
            <DesktopSearchBar />
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

async function AuthorList() {
  const authors = await getAuthors()

  return authors?.sort(stringSorter(authors![0], "handleName"))
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

async function ArtListServer() {
  const variants = await getVariants()
  return (
    <>
      <div
        style={{
          viewTransitionName: "artlist",
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2 gap-y-8 mt-8"
      >
        <ArtList
          variants={variants.sort(stringSorter(variants[0], "name"))}
        />
      </div>
    </>
  )
}

