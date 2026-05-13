'use client'

import { button } from "@/app/(app)/AppButton"
import { TdesignAttach, TdesignShare1Filled } from "@/app/(app)/Icons"
import { cn } from "lazy-cn"
import toast from "react-hot-toast"

export function AuthorShareButton() {

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        "hover:text-theme-strong",
        "cursor-pointer",
      )}
      onClick={async () => {
        if (navigator.share) {
          try {
            await navigator.share({
              title: document.title,
              url: window.location.href,
            })
          } catch (error) {
            if (error instanceof Error && error.message === "Share canceled") { }
            else {
              toast.error("Failed to share. URL copied to clipboard.")
              navigator.clipboard.writeText(window.location.href)
            }
          }
        } else {
          toast.error("Sharing is not supported in this browser. URL copied to clipboard.")
          navigator.clipboard.writeText(window.location.href)
        }
      }}
    >
      <span>Share</span>
      <TdesignShare1Filled className="" />
    </div>
  )
}


export function AuthorCopyURLButton() {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        "hover:text-theme-strong",
        "cursor-pointer",
      )}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href)
          toast.success("URL copied to clipboard.")
        } catch (error) {
          toast.error("Failed to copy URL.")
        }
      }}
    >
      <span>Copy URL</span>
      <TdesignAttach />
    </div>
  )
}

export function EntryCopyURLButton() {
  return (
    <button
      className={cn(
        button('inline-flex text-base p-2 px-4 mb-2 bg-theme-text/5'),
        "cursor-pointer"
      )}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href)
          toast.success("URL copied to clipboard.")
        } catch (error) {
          toast.error("Failed to copy URL.")
        }
      }}
    >
      <TdesignAttach />
      <span>Copy URL</span>
    </button>
  )
}