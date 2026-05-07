import { cn } from "lazy-cn"
import { MaterialSymbolsBrokenImage } from "./Icons"
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
