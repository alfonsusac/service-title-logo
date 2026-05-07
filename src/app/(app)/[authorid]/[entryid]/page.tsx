import { notFound } from "next/navigation"
import { getAllEntries, getAuthors, getData } from "../../data"

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
    return notFound()
  }
  const allEntries = await getAllEntries()
  const entries = allEntries.filter(entry => entry.author.id === author.id)
  
  return (
    <></>
  )
}