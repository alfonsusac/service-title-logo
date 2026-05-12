import { EntryList } from "@/components/entry-list"
import { Header } from "../Header"
import { DesktopSearchBar } from "../Navbar"
import { fetchAllEntries, fetchAuthors } from "../data"
import { Suspense } from "react"
import { EntryListBase } from "@/components/entry-list-base"
import { SidebarContentAuthorList } from "../Sidebar"


export default async function Home() {
  const entries = await fetchAllEntries()
  const authors = await fetchAuthors()

  return (
    <>
      <header className="mb-8 starting-bottom-fade-in-1">
        <Header />
      </header>

      <noscript className="md:hidden block mx-auto max-w-md bg-theme-card p-8 rounded-3xl">
        <h2 className="text-center text-3xl mb-4 text-theme-strong">Authors</h2>
        <SidebarContentAuthorList authors={authors} />
      </noscript>

      <Suspense>
        <DesktopSearchBar />
      </Suspense>

      <section className="min-h-[50vh] starting-bottom-fade-in-3">
        <Suspense fallback={
          <EntryListBase entries={entries} authors={authors} mode="exist-only" />
        }>
          <EntryList entries={entries} authors={authors} />
        </Suspense>
        {/* <noscript>
          <EntryListBase entries={entries} authors={authors} mode="exist-only" />
        </noscript> */}
      </section>
    </>
  )
}
