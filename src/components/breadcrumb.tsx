"use client"

import { usePathname } from "next/navigation"
import BreadcrumbBase from "./breadcrumb-ui"

export function Breadcrumb() {
  const pathname = usePathname()

  // Hide if on homepage
  if (pathname === "/") return

  const decodedPathname = pathname.split('/').map(decodeURIComponent).join('/')

  return <BreadcrumbBase pathname={decodedPathname} />
}