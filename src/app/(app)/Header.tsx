import { appDescription, appName } from "@/app-info"
import { UpdatedAt } from "@/components/updated-at"
import { cn } from "lazy-cn"

export function Header() {
  return (
    <>
      <h1 className={cn(
        "text-center text-5xl font-display tracking-wider text-theme-stronger relative z-[1] text-pretty mb-2",
        ""

      )}>
        {appName}
      </h1>
      <p className={cn(
        "text-center font-display tracking-widest text-xl text-pretty max-w-120 mx-auto",
        ""
      )}>
        {appDescription}
      </p>
      <p className="text-center font-display tracking-widest text-xl text-pretty mt-4 ">
        Last updated:{' '}<UpdatedAt />
      </p>
    </>
  )
}