import { getLicenseInfo } from "./data"
import type { AuthorOutput, KawaiiLogoData } from "./data.types"

export function LicenseLink(props: {
  license: AuthorOutput.EntryItem[ 'license' ],
  response: KawaiiLogoData
}) {

  const license = props.license

  switch (license.type) {
    case "unknown":
      return <span>Unknown</span>
    case "custom":
      return <a className="text-theme-strong hover:underline" href={license.href} target="_blank">{license.label}</a>
    case "standard":
      const licenseInfo = getLicenseInfo(props.response, license.id)
      // todo: add more UI for license info later.
      return <a className="text-theme-strong hover:underline" href={licenseInfo.href} target="_blank">{license.id}</a>
  }
}