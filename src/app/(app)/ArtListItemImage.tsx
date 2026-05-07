"use client"

import { cn } from "lazy-cn"
import Image from "next/image"
import { useState, type ComponentProps, type SVGProps } from "react"
import { BrokenLinkImagePlaceholder } from "./BrokenLink"

export function ArtListItemImage(props: ComponentProps<typeof Image>) {
  const [ error, setError ] = useState(false)
  return (
    <>
      <Image
        unoptimized
        fill
        {...props}
        className={cn(
          `object-contain overflow-visible`,
          error && "opacity-0",
          props.className
        )}
        onError={(ev) => {
          setError(true)
          props.onError?.(ev)
        }}
      />
      {error &&
        <BrokenLinkImagePlaceholder />
      }
    </>
  )
}


