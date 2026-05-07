import { getAllEntries, getAuthors, getData } from "../../data"
import NotFoundPage from "@/app/not-found"
import { ImageWithError } from "../../ArtListItemImage"
import Link from "next/link"
import { EntryPageVariantDisplay } from "./client"
import { button } from "../../AppButton"
import { MingcuteArrowDownFill, MingcuteArrowLeftFill, MingcuteArrowUpFill } from "../../Icons"

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors?.flatMap(author => author.entries.map(entry => ({ authorid: author.id, entryid: entry.id }))) || []
}




export default async function AuthorEntryPage(context: PageProps<'/[authorid]/[entryid]'>) {
  const { authorid: _authorid, entryid: _entryid } = await context.params
  const authorid = decodeURIComponent(_authorid)
  const entryid = decodeURIComponent(_entryid)

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

  const currentIndex = author.entries.findIndex(e => e.id === entryid)
  const previousEntry = author.entries[ currentIndex - 1 ]
  const nextEntry = author.entries[ currentIndex + 1 ]
  const hasPrevious = !!previousEntry
  const hasNext = !!nextEntry

  return (
    <div className="tracking-widest">

      <div className="flex gap-2">
        <Link href={`/${ author.id }`} className={button('inline-flex text-base p-2 px-4 mb-2 bg-theme-text/5')}><MingcuteArrowLeftFill /> Back</Link>
        <div className="p-2" />
        <Link href={previousEntry ? `/${ author.id }/${ previousEntry.id }` : '#'} className={button('inline-flex text-base p-2 px-4 mb-2 bg-theme-text/5')}><MingcuteArrowUpFill /> Previous</Link>
        <Link href={nextEntry ? `/${ author.id }/${ nextEntry.id }` : '#'} className={button('inline-flex text-base p-2 px-4 mb-2 bg-theme-text/5')}><MingcuteArrowDownFill /> Next</Link>

      </div>

      <EntryPageVariantDisplay entry={entry} author={author} />

      <div className="pt-8
        [&_h2]:text-lg
        [&_h2]:text-theme-strong
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

        {entry.references.length > 0 && <>
          <h2>References</h2>
          <p>
            {entry.references.length} reference(s)
          </p>
        </>
        }

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