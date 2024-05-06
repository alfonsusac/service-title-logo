import SidebarItem from "./SidebarItem"
import { IconParkSolidTwitter, UimGithubAlt } from "./[author]/page"
import { Suspense } from "react"
import MobileSidebar from "./Sidebar"
import { DesktopSearchBar } from "./Searchbar"
import ArtList from "./ArtList"
import { getAuthors, getImages } from "./data"
import { stringSorter } from "@/util/sort"

export default async function GlobalLayout(props: any) {
  const authors = await getAuthors()

  return (
    <div className="mx-auto max-w-screen-lg min-h-screen flex flex-col gap-8 font-display tracking-tight">
      <Suspense>
        <MobileSidebar />
      </Suspense>
      <div className="grow flex items-stretch">
        <div className="flex flex-none flex-col md:w-48 gap-px pt-48 rounded-lg ">
          {/* Sidebar */}

          <div className="py-5 sticky top-0 max-h-screen flex flex-col">
            <div
              style={{
                viewTransitionName: "sidebar",
              }}
              className="hidden md:flex overflow-auto select-none flex-col gap-3 p-5 rounded-r-2xl lg:rounded-l-2xl bg-theme-card animate-in duration-300 fade-in-0 slide-in-from-left-10"
            >
              <SidebarItem href="/" label="Home" />
              {
                authors
                  .sort(stringSorter(authors[0], "handleName"))
                  .map(author => {
                    return (
                      <SidebarItem
                        key={author.handleName}
                        href={"/" + author.handleName}
                        label={author.handleName}
                      />
                    )
                  })
              }
            </div>
          </div>
        </div>
        <div className="grow px-8">
          <main className="*:mb-2 pt-20">
            <header
              style={
                {
                  // viewTransitionName: 'header'
                }
              }
            >
              {props.children}
            </header>
            <Suspense>
              <DesktopSearchBar />
            </Suspense>
            <section className="rounded-2xl">
              <Suspense>
                <ArtListServer />
              </Suspense>
            </section>
          </main>
          <footer className="my-20 py-16 bg-theme-card rounded-3xl flex flex-col gap-3 items-center justify-center text-base md:text-sm px-4 font-display tracking-widest text-center">
            <p className="text-pretty">
              All rights reserved to the respective artists ©{" "}
              {new Date().getFullYear()}
            </p>
            <p className="text-pretty">Contributions are welcome!</p>
            <div className="flex gap-2 text-4xl md:text-2xl">
              <a
                className="text-theme-strong hover:underline"
                href={"https://github.com/alfonsusac/service-title-logo"}
                target="_blank"
              >
                <UimGithubAlt className="inline" />
              </a>
              <a
                className="text-theme-strong hover:underline"
                href={"https://twitter.com/alfonsusac"}
                target="_blank"
              >
                <IconParkSolidTwitter className="inline" />
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

async function ArtListServer() {
  const images = await getImages()
  return (
    <>
      <div
        style={{
          viewTransitionName: "artlist",
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2 gap-y-8 mt-8"
      >
        <ArtList images={images.sort(stringSorter(images[0], "title"))} />
      </div>
    </>
  )
}
