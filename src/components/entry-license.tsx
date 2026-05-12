import type { KawaiiLogosData } from "@/app/(app)/data.types"
import { MaterialSymbolsQuestionMarkRounded, MingcuteArrowRightUpFill, MingcuteAsteriskFill, MingcuteCheckCircleFill, MingcuteCloseFill, MingcuteLineFill, MingcuteThumbUp2Fill, type IconElement } from "@/app/(app)/Icons"
import { InlineLink } from "./ui-icon-button"
import { fetchStandardLicense, fetchStandardLicenses } from "@/app/(app)/data"
import { cn } from "lazy-cn"

export async function EntryLicenseDetailSection(props: {
  license: KawaiiLogosData.License
}) {
  const { license } = props
  if (license.type === "unknown")
    return <></>

  if (license.type === "custom")
    return <p>
      <InlineLink
        href={license.href}
        target="_blank">
        View License <MingcuteArrowRightUpFill
          className="inline align-[-0.16rem]" />
      </InlineLink>
    </p>

  const licenseInfo = await fetchStandardLicense(license.id)
  const permissionMap: Record<KawaiiLogosData.License.Permission, {
    label: string,
    icon: IconElement,
  }> = {
    allowed: { label: "Allowed", icon: MingcuteCheckCircleFill },
    disallowed: { label: "Disallowed", icon: MingcuteCloseFill, },
    depends: { label: "Depends", icon: MaterialSymbolsQuestionMarkRounded }
  }

  const conditionMap: Record<KawaiiLogosData.License.Condition, {
    label: string,
    icon: IconElement,
  }> = {
    required: { label: "Required", icon: MingcuteAsteriskFill },
    recommended: { label: "Recommended", icon: MingcuteThumbUp2Fill, },
    "not needed": { label: "Not needed", icon: MingcuteLineFill, }
  }

  function renderPermission(permission: KawaiiLogosData.License.Permission) {
    const info = permissionMap[ permission ]
    return (
      <p><info.icon className="inline align-[-0.16rem]" /> {info.label}</p>
    )
  }

  function renderCondition(condition: KawaiiLogosData.License.Condition) {
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
      <div className={cn("lg:grid grid-cols-[3fr_4fr] flex flex-col gap-x-2 gap-y-8 p-5 px-6 mt-2 rounded-2xl bg-theme-card")}>
        <div>
          <h3 className="text-theme-text/60">Permisisons:</h3>
          <div className="h-1" />
          <div className="grid grid-cols-[max-content_auto] gap-x-4">
            <p>Use:</p>
            <>{renderPermission(licenseInfo.permissions.use)}</>

            <p>Modify:</p>
            <>{renderPermission(licenseInfo.permissions.modify)}</>

            <p>Distribute:</p>
            <>{renderPermission(licenseInfo.permissions.distribute)}</>

            <p>Commercial Use:</p>
            <>{renderPermission(licenseInfo.permissions.commercial)}</>

            <div className="col-2 h-4" />

            <p>Liability:</p>
            <>{renderPermission(licenseInfo.permissions.misc.liability)}</>

            <p>Trademark Use:</p>
            <>{renderPermission(licenseInfo.permissions.misc.trademark)}</>
          </div>
        </div>
        <div>
          <h3 className="text-theme-text/60">Conditions:</h3>
          <div className="h-1" />
          <div className="grid grid-cols-[max-content_auto] gap-x-4">
            <p>Sale Requires Modification:</p>
            <>{renderCondition(licenseInfo.permissions.conditions.sale_requires_modification)}</>

            <p>Must Disclose Source:</p>
            <>{renderCondition(licenseInfo.permissions.conditions.disclose_source)}</>

            <p>Must Include License:</p>
            <>{renderCondition(licenseInfo.permissions.conditions.include_license)}</>

            <p>Must Include Copyright:</p>
            <>{renderCondition(licenseInfo.permissions.conditions.include_copyright)}</>

            <p>Must Give Credit:</p>
            <>{renderCondition(licenseInfo.permissions.conditions.give_credit)}</>
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