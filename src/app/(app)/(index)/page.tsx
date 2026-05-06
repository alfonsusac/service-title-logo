import { Suspense } from "react"
import { getAllEntries, getAuthors, getData } from "../data"
import { Header } from "../Header"
import { DesktopNavBar } from "../Navbar"
import { stringSorter } from "@/util/sort"
import SuspensedArtList from "../ArtList.server"
import { SidebarContentAuthorList } from "../Sidebar"

export default async function Home() {
  const response = await getData()
  const authors = await getAuthors()
  const entries = await getAllEntries()

  return (
    <>
      <header className="mb-8">
        <Header updatedAt={response.updatedAt} />
      </header>
      <noscript className="md:hidden block mx-auto max-w-md bg-theme-card p-8 rounded-3xl">
        <h2 className="text-center text-3xl mb-4 text-theme-strong">Authors</h2>
        <SidebarContentAuthorList authors={authors} />
      </noscript>
      <Suspense>
        <DesktopNavBar />
      </Suspense>
      <section className="min-h-[50vh]">
        <SuspensedArtList entries={entries} />
      </section>
    </>
  )
}
