"use client"

import { usePathname } from "next/navigation"
import BreadcrumbBase from "./Breadcrumb"

export default function BreadcrumbClient() {
  const pathname = usePathname()
  if (pathname === "/") return
  return <BreadcrumbBase pathname={pathname} />
}