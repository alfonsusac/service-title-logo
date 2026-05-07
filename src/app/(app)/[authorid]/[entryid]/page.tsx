import { getAllEntries, getAuthors, getData } from "../../data"
import NotFoundPage from "@/app/not-found"
import { ImageWithError } from "../../ArtListItemImage"
import Link from "next/link"
import { EntryPageVariantDisplay } from "./client"

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

  const images = entry.images

  return (
    <div className="tracking-widest">
      <EntryPageVariantDisplay entry={entry} author={author} />

      <div className="pt-8
        [&_h2]:text-2xl
        [&_h2]:pt-8
        [&_h2]:tracking-widest
      ">
        <h1 className="text-3xl text-theme-strong">
          {entry.title}
        </h1>
        <p>
          by{" "}
          <Link href={`/${ entry.author.id }`} className="hover:text-theme-strong">
            {entry.author.displayName}
          </Link>
        </p>


        <h2>References</h2>
        <p>
          {entry.references.length} reference(s)
        </p>

        <h2>License</h2>
        <p>
          {entry.license.label}
        </p>

        <h2>Images</h2>
        <p>
          {entry.images.length} file(s)
        </p>
      </div>
    </div>
  )
}