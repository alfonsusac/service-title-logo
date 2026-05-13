import { appName } from "@/app-info"
import { cn } from "lazy-cn"
import Link from "next/link"
import type { ComponentProps } from "react"

export function ArticlePage(props: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("starting-bottom-fade-in-0", props.className)} />
  )
}

export function ArticleTitle(props: {
  title: string
}) {
  return (
    <div className='relative overflow-hidden'>
      <Link
        href="/"
        className="font-display text-theme-strong tracking-widest"
      >{appName}</Link>
      <h1 className="text-4xl font-display tracking-wider text-theme-stronger z-[1] sticky top-2">
        {props.title}
      </h1>
    </div>
  )
}

export function ArticleProse(props: ComponentProps<"div">) {
  return (
    <div {...props} className={cn(
      "font-display tracking-widest py-1 *:my-5 leading-relaxed",
      "*:text-pretty",
      "[&_a]:underline ",
      "[&_a]:text-theme-strong/80",
      "[&_a]:cursor-pointer",
      "[&_a]:hover:text-theme-strong",
      "[&_a]:underline-offset-4  ",
      "[&_a]:decoration-theme-text/50",
      "[&_h3]:text-theme-stronger",
      "[&_h3]:text-xl",
      "[&_h3]:pt-6",
      "[&_li]:list-item",
      "[&_li]:list-disc",
      "[&_li]:list-inside",
      props.className
    )} />
  )
}