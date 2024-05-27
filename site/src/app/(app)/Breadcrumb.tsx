import { Fragment } from "react"
import { IcRoundHome } from "./MobileSidebar"
import { cn } from "lazy-cn"
import Link from "next/link"

export default function BreadcrumbBase(props: {
  pathname: string
}) {
  return (
    <div className="flex gap-2">
      <div className="hidden">{props.pathname}</div>
      <BreadcrumbSeperator />
      <BreadcrumbItem href="/"><IcRoundHome className="block" />Home</BreadcrumbItem>
      {
        props.pathname.split('/').map((param, index, array) => {
          if (param === '') return null
          const href = array.slice(0, index + 1).join('/')
          return (
            <Fragment key={index}>
              <BreadcrumbSeperator />
              <BreadcrumbItem href={href} current={index === array.length - 1}>{param}</BreadcrumbItem>
            </Fragment>
          )
        })
      }
    </div>
  )
}

function BreadcrumbItem({ href, children, current }: { href: string; children: React.ReactNode, current?: boolean }) {
  return (
    <Link href={href} className={cn(
      "inline-flex items-center leading-none gap-1 -m-1 p-1 -mx-3 px-3 rounded-xl hover:bg-theme-card",
      current ? "pointer-events-none" : ""
    )}>
      {children}
    </Link>
  )
}

function BreadcrumbSeperator() {
  return (
    <span className="inline-block mx-1 text-theme-cardHover">/</span>
  )
}

