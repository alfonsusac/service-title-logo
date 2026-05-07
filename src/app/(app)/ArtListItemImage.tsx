"use client"

import { cn } from "lazy-cn"
import Image from "next/image"
import { useState, type ComponentProps, type SVGProps } from "react"

export function ArtListItemImage(props: ComponentProps<typeof Image>) {
  const [ error, setError ] = useState(false)
  return (
    <>
      <Image
        unoptimized
        fill
        {...props}
        className={cn(
          `object-contain transition-[scale] group-hover:scale-110 overflow-visible`,
          error && "opacity-0",
          props.className
        )}
        onError={(ev) => {
          setError(true)
          props.onError?.(ev)
        }}
      />
      {error &&
        <div className={cn(
          "flex flex-col items-center justify-center absolute inset-0 gap-1 transition-[scale] group-hover:scale-110",
          "text-theme-text/50"
        )}>
          <MaterialSymbolsBrokenImage className="size-6"/>
          Broken Link
        </div>
      }
    </>
  )
}


export function MaterialSymbolsBrokenImage(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>{/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19v-6.6l3 3l4-4l4 4l4-4l3 3V19q0 .825-.587 1.413T19 21zM5 3h14q.825 0 1.413.588T21 5v6.575l-3-3l-4 4l-4-4l-4 4l-3-3V5q0-.825.588-1.412T5 3" /></svg>
  )
}