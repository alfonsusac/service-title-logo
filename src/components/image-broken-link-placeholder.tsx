import { cn } from "lazy-cn"
import { MaterialSymbolsBrokenImage, MdiCheckboxBlankOffOutline } from "../app/(app)/Icons"
import type { ComponentProps } from "react"

export function BrokenLinkImagePlaceholder(props: ComponentProps<'div'>) {
  return (
    <div {...props} className={cn(
      "flex flex-col items-center justify-center absolute inset-0 gap-1",
      "text-theme-text/50",
      props.className
    )}>
      <MaterialSymbolsBrokenImage className="size-6" />
      Broken Link
    </div>
  )
}

export function MissingSourceImagePlaceholder(props: ComponentProps<'div'>) {
  return (
    <div {...props} className={cn(
      "flex flex-col items-center justify-center absolute inset-0 gap-1",
      "text-theme-text/50",
      props.className
    )}>
      <MdiCheckboxBlankOffOutline className="size-6" />
      Missing Source
    </div>
  )
}


