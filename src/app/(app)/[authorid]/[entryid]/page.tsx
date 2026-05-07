import { notFound } from "next/navigation"
import { getAllEntries, getAuthors, getData } from "../../data"
import NotFoundPage from "@/app/not-found"
import { ImageWithError } from "../../ArtListItemImage"
import Link from "next/link"

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
      <div className="w-full gap-2 grid grid-rows-[1fr_--spacing(24)] grid-cols-1 lg:grid-rows-1 lg:grid-cols-[1fr_--spacing(32)] ">
        <div className="rounded-2xl aspect-video bg-theme-card relative p-4">
          <div className="relative w-full h-full">
            <ImageWithError
              alt={entry.title}
              src={entry.images[ 0 ].src}
            />
          </div>
        </div>
        <div className="rounded-2xl bg-theme-card w-full h-full">
          asdfasdf
        </div>
      </div>

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