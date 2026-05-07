"use client"

import { usePathname } from "next/navigation"
import BreadcrumbBase from "./Breadcrumb.base"

export default function BreadcrumbClient() {
  const pathname = usePathname()
  
  // Hide if on homepage
  if (pathname === "/") return

  const decodedPathname = pathname.split('/').map(decodeURIComponent).join('/')

  return <BreadcrumbBase pathname={decodedPathname} />
}