import { notFound } from "next/navigation"
import { getAllEntries, getAuthors, getData } from "../../data"
import NotFoundPage from "@/app/not-found"

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors?.flatMap(author => author.entries.map(entry => ({ authorid: author.id, entryid: entry.id }))) || []
}




export default async function AuthorEntryPage(context: PageProps<'/[authorid]/[entryid]'>) {
  const { authorid, entryid } = await context.params
  const response = await getData()
  const authors = await getAuthors()
  const author = authors?.find(a => a.id === authorid)
  if (!author) {
    return <NotFoundPage what="Author" />
  }
  const allEntries = await getAllEntries()
  const entry = allEntries.find(entry => entry.id === entryid && entry.author.id === authorid)
  if (!entry) {
    return <NotFoundPage what="Entry" back={{ href: `/${ authorid }`, what: "Author Page" }} />
  }

  return (
    <div className="tracking-widest">
      <div className="">
        {entry.author.id}
      </div>
    </div>
  )
}