import { cn } from "lazy-cn"
import Link from "next/link"
import type { ComponentProps } from "react"

export function InlineLink(props: ComponentProps<typeof Link>) {
  return (
    <Link {...props}
      className={cn(
        "text-theme-strong hover:underline",
        "inline-flex gap-2 items-center flex-nowrap",
        props.className
      )}
    >
      {props.children}
    </Link>
  )
}