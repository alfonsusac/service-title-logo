import { fetchStandardLicenses, getLicenseInfo } from "@/app/(app)/data"
import type { KawaiiLogosData } from "@/app/(app)/data.types"
import { Fragment } from "react/jsx-runtime"
import { InlineLink } from "./ui-icon-button"

export async function AuthorInlineLicenseArray(props: {
  author: KawaiiLogosData.Author,
}) {
  const author = props.author

  const isMultiple = author.licenses.length > 1

  return (
    <>
      {isMultiple
        ? <>
          Mixed (
          {author.licenses.map((license, i) => {

            const licenseLink = <LicenseInlineLink license={license} />

            return <Fragment key={i}>
              {(i === author.licenses.length - 1)
                ? licenseLink
                : <>{licenseLink},{' '}</>}
            </Fragment>
          })})
        </>
        : <>
          <LicenseInlineLink
            license={author.licenses[ 0 ]}
          />
        </>
      }
    </>
  )
}


export async function LicenseInlineLink(props: {
  license: KawaiiLogosData.License,
}) {
  const license = props.license
  const standardLicenses = await fetchStandardLicenses()

  if (license.type === "unknown")
    return <span>Unknown</span>

  if (license.type === "custom")
    return (
      <InlineLink
        href={license.href}
        target="_blank"
      >
        {license.label}
      </InlineLink>
    )

  const licenseInfo = getLicenseInfo(standardLicenses, license.id)
  return (
    <InlineLink
      href={licenseInfo.href}
      target="_blank"
    >
      {license.id}
    </InlineLink>
  )
}