import { stringSorter } from "@/util/sort"
import { fetchAuthor, fetchAuthors, fetchEntries, getMissingEntries } from "../data"
import { FundingsIconList } from "../../../components/author-fundings"
import { AuthorSocialsIconArray } from "@/components/author-socials"
import { AuthorInlineLicenseArray } from "@/components/author-license"
import { EntryList } from "@/components/entry-list"
import { ListOfReferences } from "@/components/references-ui"
import type { Metadata } from "next"
import { Suspense } from "react"
import { EntryListBase } from "@/components/entry-list-base"
import NotFoundPage from "@/components/not-found"

export async function generateStaticParams() {
  const authors = await fetchAuthors()
  return authors?.map(author => ({ authorid: author.id }))
}

export const dynamicParams = false

export async function generateMetadata(context: PageProps<'/[authorid]'>): Promise<Metadata> {
  const { authorid: _authorid } = await context.params
  const authorid = decodeURIComponent(_authorid)
  const author = await fetchAuthor(authorid)
  if (!author) {
    return {
      title: "Author Not Found",
      description: `No author found with id ${ authorid }`,
    }
  }
  return {
    title: author.displayName,
    description: `Explore kawaii icons created by ${ author.displayName }.`,
  }
}


export default async function AuthorPage(context: PageProps<'/[authorid]'>) {
  const { authorid: _authorid } = await context.params
  const authorid = decodeURIComponent(_authorid)

  const author = await fetchAuthor(authorid)
  if (!author)
    return <NotFoundPage what="Author" hideFooter />

  const { socials, fundings, personalSites } = author
  const hasFundings = fundings.length > 0
  const hasSocials = socials.length > 0 || personalSites.length > 0

  const entries = await fetchEntries(authorid)
  const missingEntries = getMissingEntries(entries)

  return (
    <div className='tracking-widest'>
      <div className="flex gap-2 items-baseline">
        <h1 className="text-4xl text-theme-stronger z-[1] sticky top-2 starting-bottom-fade-in-0">
          {authorid}
        </h1>
      </div>
      {(hasSocials || hasFundings) &&
        <div className="flex gap-2 pb-2 pt-1">
          socials:
          <div className="flex gap-2 items-center">
            <AuthorSocialsIconArray
              socials={socials}
              personalSites={personalSites}
            />
            {hasFundings && hasSocials && <div className="opacity-25">|</div>}
            {hasFundings && <div className="">fundings:</div>}
            {hasFundings && <FundingsIconList fundings={fundings} />}
          </div>
        </div>
      }
      <div className=" py-1 *:my-2 leading-tight">
        <p className="text-pretty">This is a collection of images by <span>{authorid}</span></p>
        <p className="text-pretty">{`Please read the artist's license & readme before using!`}</p>
        <p className="text-pretty">{`${ entries.length } Images found`}</p>
        <p className="">
          <span>License: </span>
          <AuthorInlineLicenseArray author={author} />
        </p>

      </div>
      <section className="min-h-[50vh] starting-bottom-fade-in-1">
        <Suspense fallback={
          <EntryListBase
            entries={entries.sort(stringSorter(entries[ 0 ], "id"))}
            authors={[ author ]}
          />
        }>
          <EntryList
            entries={entries.sort(stringSorter(entries[ 0 ], "id"))}
            authors={[ author ]}
          />
        </Suspense>
      </section>
      <section className="starting-bottom-fade-in-1 mt-24">
        <h2 className="text-2xl text-theme-strong mb-2">References</h2>
        {author.references.length > 0 && <>
          <ListOfReferences references={author.references} showUrl={true} />
        </>}
        {author.references.length === 0 && <p className="text-pretty">No references provided for the author. (Entries may be collected manually)</p>}
      </section>
      {missingEntries.length > 0 &&
        <section className="starting-bottom-fade-in-1 mt-24">
          <h2 className="text-2xl text-theme-strong">Missing Sources</h2>
          <p className="mt-2">These are entries added by me from other sources (e.g. Twitter, Pixiv, etc.) that are not included in the author's data.
            They may be added to the author's data in the future, but for now they are listed here for reference.
          </p>
          <Suspense fallback={
            <EntryListBase
              entries={entries.sort(stringSorter(entries[ 0 ], "id"))}
              authors={[ author ]}
              mode="missing-src-only"
            />
          }>
            <EntryList
              entries={entries.sort(stringSorter(entries[ 0 ], "id"))}
              authors={[ author ]}
              mode="missing-src-only"
            />
          </Suspense>
        </section>
      }
    </div>
  )
}

