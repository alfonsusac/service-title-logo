import { useQueryState } from "nuqs"
import ArtCard from "./ArtCard"
import { VariantWithAuthor } from "./data"
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from "@radix-ui/react-dialog"
import { flushSync } from "react-dom"
import { useState } from "react"
import Image from "next/image"
import { cn } from "lazy-cn"
import { useImageView } from "./ImageDetail"
import { Link } from "next-view-transitions"
import VariantDialogContent from "./VariantDialogContent"



export default function VariantCard(props: {
  variant: VariantWithAuthor,
  order?: number
}) {
  const firstImage = props.variant.files[0]

  const [open, setOpen] = useState(false)
  function changeOpen(open: boolean) {
    return makeTransition(() => {
      setOpen(open)
    })()
  }

  return (
    <>
      <Dialog open={open} onOpenChange={changeOpen}>
        <DialogTrigger>
          <ArtCard key={firstImage.imgSrc} image={{
            ...firstImage,
            title: `${ props.variant.name }`,
            author: props.variant.author
          }} order={props.order}
            opened={open}
            onClick={() => changeOpen(true)}
          />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay
            className="z-[30] top-0 left-0 fixed w-screen h-screen bg-black/80 animate-in fade-in-0"
            style={{
              viewTransitionName: `variant-card-dialog-overlay`,
            }}
          />
          <VariantDialogContent variant={props.variant} onClose={() => {
            changeOpen(false)
          }} />
        </DialogPortal>
      </Dialog>
    </>
  )
}

// https://www.kvin.me/posts/transitions-example
export function makeTransition<T extends any[]>(
  transition: (...args: T) => void
) {
  // Check if the browser supports the view transitions API
  // if not, just call the transition
  return (...args: T) => {
    console.log("HELLO")
    // @ts-ignore
    if (document.startViewTransition) {
      // @ts-ignore
      document.startViewTransition(() => {
        flushSync(() => {
          transition(...args)
        })
      })
    } else {
      transition(...args)
    }
  }
}

