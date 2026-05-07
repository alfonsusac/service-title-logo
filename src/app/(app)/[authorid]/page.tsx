import ArtListServer from "../ArtList.server"
import { stringSorter } from "@/util/sort"
import { getAllEntries, getAuthors, getData, getLicenseInfo } from "../data"
import NotFoundPage from "@/app/not-found"
import { IconParkSolidTwitter, MaterialSymbolsGlobe, SimpleIconsBluesky, UimGithubAlt } from "../Icons"

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors?.map(author => ({ authorid: author.id }))
}

export default async function AuthorPage(context: PageProps<'/[authorid]'>) {
  const { authorid: _authorid } = await context.params
  const authorid = decodeURIComponent(_authorid)

  const response = await getData()
  const authors = await getAuthors()
  const author = authors?.find(a => a.id === authorid)
  if (!author) {
    return <NotFoundPage what="Author" />
  }

  const socials = author.social

  const allEntries = await getAllEntries()
  const entries = allEntries.filter(entry => entry.author.id === author.id)

  return (
    <div className='tracking-widest'>
      <div className="flex gap-2 items-baseline">
        <h1 className="text-4xl text-theme-stronger z-[1] sticky top-2 starting-bottom-fade-in-0">
          {authorid}
        </h1>
      </div>
      <div className="flex gap-2 pb-2 pt-1">
        socials:
        <div className="flex gap-2 items-center">
          {socials.github &&
            <a className="inline-flex text-theme-strong hover:underline"
              href={socials.github.url}
              target="_blank">
              <UimGithubAlt className="inline" />
            </a>
          }
          {socials.bsky &&
            <a className="inline-flex text-theme-strong hover:underline"
              href={socials.bsky.url}
              target="_blank">
              <SimpleIconsBluesky className="inline" />
            </a>
          }
          {socials.x &&
            <a className="inline-flex text-theme-strong hover:underline"
              href={socials.x.url}
              target="_blank">
              <IconParkSolidTwitter className="inline" />
            </a>}
          {socials.site &&
            <a className="inline-flex text-theme-strong hover:underline"
              href={socials.site}
              target="_blank">
              <MaterialSymbolsGlobe className="inline" />
            </a>
          }
        </div>
      </div>
      <div className=" py-1 *:my-2 leading-tight">
        <p className="text-pretty">This is a collection of images by <span>{authorid}</span></p>
        <p className="text-pretty">{`Please read the artist's license & readme before using!`}</p>
        <p className="text-pretty">{`${ entries.length } Images found`}</p>
        <p className="">
          <span>license: </span>
          {author.licenses.map((license, i) => {
            switch (license.type) {
              case "unknown":
                return <span key={i}>Unknown</span>
              case "custom":
                return <a key={i} className="text-theme-strong hover:underline" href={license.href} target="_blank">{license.label}</a>
              case "standard":
                const licenseInfo = getLicenseInfo(response, license.id)
                // todo: add more UI for license info later.
                return <a key={i} className="text-theme-strong hover:underline" href={licenseInfo.href} target="_blank">{license.id}</a>
            }
          })}
          {
            author.licenses.length === 0 && <span className="">Unknown</span>
          }
        </p>
        {author.references.length > 0 && <p className="">
          <span >links: </span>
          {author.references.map((ref, i) => {
            return <a key={i} className="text-theme-strong hover:underline" href={ref.url} target="_blank">{ref.urlType.label}</a>
          })}
        </p>
        }
      </div>
      <section className="min-h-[50vh] starting-bottom-fade-in-1">
        <ArtListServer entries={entries.sort(stringSorter(entries[ 0 ], "id"))} />
      </section>
    </div>
  )
}

