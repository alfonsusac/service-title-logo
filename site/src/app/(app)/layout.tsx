import SidebarItem from "./SidebarItem"
import { IconParkSolidTwitter, UimGithubAlt } from "./[author]/page"
import { Suspense } from "react"
import MobileSidebar from "./Sidebar"
import { DesktopSearchBar } from "./Searchbar"
import ArtList from "./ArtList"
import { getAuthors, getVariants } from "./data"
import { stringSorter } from "@/util/sort"
import Footer from "./Footer"
import ImageDetailPage from "./ImageDetail"

export default function GlobalLayout(props: any) {
  return (
    <div className="mx-auto max-w-screen-lg min-h-screen flex flex-col gap-8 font-display tracking-tight">
      {/* <ImageDetailPage > */}
      <Suspense>
        <MobileSidebar />
      </Suspense>
      <div className="grow flex items-stretch">
        <div className="flex flex-none flex-col md:w-48 gap-px pt-60 rounded-lg ">
          {/* Sidebar */}
          <div className="py-5 sticky top-0 max-h-screen flex flex-col">
            <div
              style={{
                viewTransitionName: "sidebar",
              }}
              className="hidden md:flex overflow-auto select-none flex-col gap-3 p-5 rounded-r-2xl lg:rounded-l-2xl bg-theme-card animate-in duration-300 fade-in-0 slide-in-from-left-10"
            >
              <SidebarItem href="/" label="Home" />
              <Suspense>
                <AuthorList />
              </Suspense>
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
              <DesktopSearchBar />
            </Suspense>
            <section className="rounded-2xl min-h-screen">
              <Suspense>
                <ArtListServer />
              </Suspense>
            </section>
          </main>
          <Footer />
        </div>
      </div>
      {/* </ImageDetailPage> */}
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
          count={(author.groups?.length ?? 0) + (author.images?.length ?? 0)}
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
