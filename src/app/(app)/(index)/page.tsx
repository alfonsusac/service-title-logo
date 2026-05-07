import { getAllEntries, getAuthors, getData } from "../data"
import { Header } from "../Header"
import { DesktopSearchBar } from "../Navbar"
import ArtListServer from "../ArtList.server"
import { SidebarContentAuthorList } from "../Sidebar"

export default async function Home() {
  const authors = await getAuthors()
  const entries = await getAllEntries()

  return (
    <>
      <header className="mb-8 starting-bottom-fade-in-1">
        <Header />
      </header>

      <noscript className="md:hidden block mx-auto max-w-md bg-theme-card p-8 rounded-3xl">
        <h2 className="text-center text-3xl mb-4 text-theme-strong">Authors</h2>
        <SidebarContentAuthorList authors={authors} />
      </noscript>

      <DesktopSearchBar />

      <section className="min-h-[50vh] starting-bottom-fade-in-3">
        <ArtListServer entries={entries} />
      </section>
    </>
  )
}
