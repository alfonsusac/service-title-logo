import Link from "next/link"
import SidebarItem from "./SidebarItem"
import { IconParkSolidTwitter, UimGithubAlt } from "./[author]/page"
import { Suspense } from "react"
import MobileSidebar from "./Sidebar"
import SearchBar from "./Searchbar"
import ArtList from "./ArtList"
import { authors } from "../../../../data/authors"
import { DataImage } from "../../../../types/types"




export default function GlobalLayout(props: any) {
  return (
    <div className="mx-auto max-w-screen-lg min-h-screen flex flex-col gap-8 font-mono tracking-tight text-slate-700 ">

      <MobileSidebar />
      <div className="grow flex items-stretch">
        <div className="flex flex-none flex-col md:w-48 gap-px p-1 pt-48 rounded-lg">

          {/* Sidebar */}
          <div
            style={{
              viewTransitionName: 'sidebar'
            }}
            className="hidden md:flex select-none flex-col gap-3 p-5 rounded-r-2xl lg:rounded-l-2xl bg-slate-100 sticky top-20 animate-in duration-300 fade-in-0 slide-in-from-left-10">

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
        <div className="grow overflow-auto pt-20 px-8">
          <main className="*:mb-2">
            <header style={{
              // viewTransitionName: 'header'
            }}>
              {props.children}
            </header>
            <Suspense>
              <ArtListServer />
            </Suspense>
          </main>
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

const apiUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000/revalidate'
  : `https://service-title-logo-backend.vercel.app/revalidate?key=${ process.env['REVALIDATE_KEY'] }`

async function ArtListServer() {
  const response = await fetch(apiUrl, {
    next: {
      revalidate: 60 * 30 // half an hour
    }
  }).then(res => res.json()) as {
    data: DataImage[]
  }

  return (
    <>
      <SearchBar className="" />
      <div
        style={{
          viewTransitionName: 'artlist'
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2 gap-y-8 mt-8">
        <ArtList images={(response.data).sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))} />
      </div>
    </>
  )
}