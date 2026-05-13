import { fetchAuthor, fetchAuthors, fetchEntry } from "../../data"
import NotFoundPage from "@/app/not-found"
import Link from "next/link"
import { EntryPageVariantDisplay } from "./client"
import { button } from "../../AppButton"
import { MingcuteArrowDownFill, MingcuteArrowLeftFill, MingcuteArrowRightUpFill, MingcuteArrowUpFill, MingcuteCheckCircleFill } from "../../Icons"
import { EntryLicenseDetailSection } from "@/components/entry-license"
import { ListOfReferences } from "@/components/references-ui"
import Image from "next/image"
import { InlineCreatedAt } from "@/components/created-at"
import type { Metadata } from "next"

export async function generateStaticParams() {
  const authors = await fetchAuthors()
  return authors.map(
    author => author.entryIds.map(
      entryId => ({ authorid: author.id, entryid: entryId })
    )
  ).flat()
}

export async function generateMetadata(context: PageProps<'/[authorid]/[entryid]'>): Promise<Metadata> {
  const { authorid: _authorid, entryid: _entryid } = await context.params
  const authorid = decodeURIComponent(_authorid)
  const entryid = decodeURIComponent(_entryid)
  const author = await fetchAuthor(authorid)
  if (!author) {
    return {
      title: "Author Not Found",
      description: `No author found with id ${ authorid }`,
    }
  }
  const entry = await fetchEntry(authorid, entryid)
  if (!entry) {
    return {
      title: "Entry Not Found",
      description: `No entry found with id ${ entryid } from author ${ author.displayName }`,
    }
  }
  return {
    title: `${ entry.title } by ${ author.displayName }`,
    description: `View ${ entry.title } by ${ author.displayName }. Created at ${ entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : "Unknown Date" }, licensed under ${ entry.license.labelShort }.`,
  }
}


export default async function AuthorEntryPage(context: PageProps<'/[authorid]/[entryid]'>) {
  const { authorid: _authorid, entryid: _entryid } = await context.params
  const authorid = decodeURIComponent(_authorid)
  const entryid = decodeURIComponent(_entryid)

  const author = await fetchAuthor(authorid)
  if (!author)
    return <NotFoundPage what="Author" />

  const entry = await fetchEntry(authorid, entryid)
  if (!entry)
    return <NotFoundPage what="Entry" back={{ href: `/${ authorid }`, what: "Author Page" }} />

  const currentIndex = author.entryIds.findIndex(id => id === entryid)
  const previousEntryId = author.entryIds[ currentIndex - 1 ]
  const nextEntryId = author.entryIds[ currentIndex + 1 ]
  const hasPrevious = !!previousEntryId
  const hasNext = !!nextEntryId

  return (
    <div className="tracking-widest ">
      <div className="flex gap-2 ">
        <Link
          href={`/${ author.id }`}
          className={button('inline-flex text-base p-2 px-4 mb-2 bg-theme-text/5')}>
          <MingcuteArrowLeftFill /> Back
        </Link>
        <div className="p-2" />
        <Link
          href={previousEntryId ? `/${ author.id }/${ previousEntryId }` : '#'}
          className={button(
            'inline-flex text-base p-2 px-4 mb-2 bg-theme-text/5 select-none',
            !hasPrevious && 'pointer-events-none opacity-50 '
          )}
        >
          <MingcuteArrowUpFill /> Previous
        </Link>
        <Link
          href={nextEntryId ? `/${ author.id }/${ nextEntryId }` : '#'}
          className={button(
            'inline-flex text-base p-2 px-4 mb-2 bg-theme-text/5 select-none',
            !hasNext && 'pointer-events-none opacity-50 '
          )}
        >
          <MingcuteArrowDownFill /> Next
        </Link>
      </div>

      <EntryPageVariantDisplay entry={entry} author={author} />

      <div className="pt-8
        [&_h2]:text-xl
        [&_h2]:pt-8
        [&_h2]:tracking-widest
      ">
        <h1 className="text-3xl text-theme-strong">
          {entry.title}
        </h1>
        <p>
          by{" "}
          <Link href={`/${ entry.authorId }`} className="hover:text-theme-strong">
            {author.displayName}
          </Link>
        </p>
        <p>
          Created at {entry.createdAt ? <InlineCreatedAt createdAt={entry.createdAt} /> : "Unknown Date"}
        </p>
        <p>
          {entry.images.length} file(s)
        </p>

        {(entry.references.length > 0) && <>
          <h2>References</h2>
          {entry.references.length > 0 && <>
            <p>
              {entry.references.length} reference(s)
            </p>
            <ListOfReferences references={entry.references} showUrl={true} />
          </>}
        </>
        }


        <h2>License</h2>
        <p className="text-2xl text-theme-strong">
          {entry.license.labelShort} {entry.license.type === "standard" && <MingcuteCheckCircleFill className="inline align-[-0.16rem]" />}
        </p>
        {entry.license.type === "unknown" ? <></> :
          entry.license.type === "custom" ? <>
            <p>
              <a href={entry.license.href} target="_blank" className="hover:text-theme-strong">
                View License <MingcuteArrowRightUpFill className="inline align-[-0.16rem]" />
              </a>
            </p>
          </> : <>
            <EntryLicenseDetailSection license={entry.license} />
          </>
        }
      </div>
    </div>
  )
}
