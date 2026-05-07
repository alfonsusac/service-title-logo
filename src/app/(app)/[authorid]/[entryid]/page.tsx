import { getAllEntries, getAuthors, getData, getLicenseInfo } from "../../data"
import NotFoundPage from "@/app/not-found"
import { ImageWithError } from "../../ArtListItemImage"
import Link from "next/link"
import { EntryPageVariantDisplay } from "./client"
import { button } from "../../AppButton"
import { MaterialSymbolsQuestionMarkRounded, MingcuteArrowDownFill, MingcuteArrowLeftFill, MingcuteArrowRightUpFill, MingcuteArrowUpFill, MingcuteAsteriskFill, MingcuteCheckCircleFill, MingcuteCloseFill, MingcuteLineFill, MingcuteThumbUp2Fill, type IconElement } from "../../Icons"
import type { KawaiiLogoData, LicenseCondition, LicensePermission, StandardLicenseType } from "../../data.types"
import { cn } from "lazy-cn"
import type { JSX, SVGProps } from "react"
import { ListOfReferences } from "../../Reference"

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors?.flatMap(author => author.entries.map(entry => ({ authorid: author.id, entryid: entry.id }))) || []
}




export default async function AuthorEntryPage(context: PageProps<'/[authorid]/[entryid]'>) {
  const { authorid: _authorid, entryid: _entryid } = await context.params
  const authorid = decodeURIComponent(_authorid)
  const entryid = decodeURIComponent(_entryid)

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

        <Link href={previousEntry ? `/${ author.id }/${ previousEntry.id }` : '#'}
          className={
            button(
              'inline-flex text-base p-2 px-4 mb-2 bg-theme-text/5 select-none',
              !hasPrevious && 'pointer-events-none opacity-50 '
            )}
        ><MingcuteArrowUpFill /> Previous</Link>
        <Link href={nextEntry ? `/${ author.id }/${ nextEntry.id }` : '#'}
          className={
            button(
              'inline-flex text-base p-2 px-4 mb-2 bg-theme-text/5 select-none',
              !hasNext && 'pointer-events-none opacity-50 '
            )}
        ><MingcuteArrowDownFill /> Next</Link>

      </div>

      <EntryPageVariantDisplay entry={entry} author={author} />

      <div className="pt-8
        [&_h2]:text-lg
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
        <p>
          {entry.images.length} file(s)
        </p>

        {entry.references.length > 0 && <>
          <h2>References</h2>
          <p>
            {entry.references.length} reference(s)
          </p>
          <ListOfReferences references={entry.references} />
        </>
        }

        <h2>License</h2>
        <p className="text-2xl text-theme-strong">
          {entry.license.labelShort} {entry.license.type === "standard" && <MingcuteCheckCircleFill className="inline align-[-0.16rem]" />}
        </p>
        {
          entry.license.type === "unknown" ? <></> :
            entry.license.type === "custom" ? <>
              <p>
                <a href={entry.license.href} target="_blank" className="hover:text-theme-strong">
                  View License <MingcuteArrowRightUpFill className="inline align-[-0.16rem]" />
                </a>
              </p>
            </> : <>
              <DisplayStandardLicenseInfo standardLicense={entry.license.id} />
            </>
        }
        {/* 
        <h2>Images</h2>
        <p>
          {entry.images.length} file(s)
        </p> */}
      </div>
    </div>
  )
}

async function DisplayStandardLicenseInfo(props: {
  standardLicense: StandardLicenseType,
  className?: string,
}) {
  const response = await getData()
  const license = getLicenseInfo(response, props.standardLicense)

  const permissionMap: Record<LicensePermission, {
    label: string,
    icon: IconElement,
  }> = {
    allowed: {
      label: "Allowed",
      icon: MingcuteCheckCircleFill
    },
    disallowed: {
      label: "Disallowed",
      icon: MingcuteCloseFill,
    },
    depends: {
      label: "Depends",
      icon: MaterialSymbolsQuestionMarkRounded
    }
  }

  const conditionMap: Record<LicenseCondition, {
    label: string,
    icon: IconElement,
  }> = {
    required: {
      label: "Required",
      icon: MingcuteAsteriskFill
    },
    recommended: {
      label: "Recommended",
      icon: MingcuteThumbUp2Fill,
    },
    "not needed": {
      label: "Not needed",
      icon: MingcuteLineFill,
    }
  }

  function renderPermission(permission: LicensePermission) {
    const info = permissionMap[ permission ]
    return (
      <p><info.icon className="inline align-[-0.16rem]" /> {info.label}</p>
    )
  }

  function renderCondition(condition: LicenseCondition) {
    const info = conditionMap[ condition ]
    return (
      <p><info.icon className="inline align-[-0.16rem]" /> {info.label}</p>
    )
  }



  return (
    <>
      <a href={license.href} target="_blank" className="hover:text-theme-strong">
        View License <MingcuteArrowRightUpFill className="inline align-[-0.16rem]" />
      </a>
      <div className={cn("lg:grid grid-cols-[3fr_4fr] flex flex-col gap-x-2 gap-y-8 p-5 px-6 mt-2 rounded-2xl bg-theme-card", props.className)}>
        <div>
          <h3 className="text-theme-text/60">Permisisons:</h3>
          <div className="h-1" />
          <div className="grid grid-cols-[max-content_auto] gap-x-4">
            <p>Use:</p>
            <>{renderPermission(license.permissions.use)}</>

            <p>Modify:</p>
            <>{renderPermission(license.permissions.modify)}</>

            <p>Distribute:</p>
            <>{renderPermission(license.permissions.distribute)}</>

            <p>Commercial Use:</p>
            <>{renderPermission(license.permissions.commercial)}</>

            <div className="col-2 h-4" />

            <p>Liability:</p>
            <>{renderPermission(license.permissions.misc.liability)}</>

            <p>Trademark Use:</p>
            <>{renderPermission(license.permissions.misc.trademark)}</>
          </div>
        </div>
        <div>
          <h3 className="text-theme-text/60">Conditions:</h3>
          <div className="h-1" />
          <div className="grid grid-cols-[max-content_auto] gap-x-4">
            <p>Sale Requires Modification:</p>
            <>{renderCondition(license.permissions.conditions.sale_requires_modification)}</>

            <p>Must Disclose Source:</p>
            <>{renderCondition(license.permissions.conditions.disclose_source)}</>

            <p>Must Include License:</p>
            <>{renderCondition(license.permissions.conditions.include_license)}</>

            <p>Must Include Copyright:</p>
            <>{renderCondition(license.permissions.conditions.include_copyright)}</>

            <p>Must Give Credit:</p>
            <>{renderCondition(license.permissions.conditions.give_credit)}</>
          </div>
        </div>
        <p className="col-span-2 pt-2 text-sm text-theme-text/60">
          These are not legal terms, just a simplified summary of the license conditions.
          Public restrictions are not absolute, they are default rules, not universal limits.
        </p>
      </div>
    </>

  )
}