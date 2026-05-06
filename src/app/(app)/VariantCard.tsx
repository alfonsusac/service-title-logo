"use client"

import ArtListItem from "./ArtCard"
import {
  Dialog,
} from "radix-ui"
import { useState } from "react"
import VariantDialogContent from "./VariantDialogContent"
import type { EntryWithAuthor } from "./data"

export default function VariantCard(props: {
  entry: EntryWithAuthor
  order?: number
}) {
  const firstImage = props.entry.images[ 0 ]

  const [ open, setOpen ] = useState(false)
  function changeOpen(open: boolean) {
    return setOpen(open)
    // return makeTransition(() => {
    //   setOpen(open)
    // })()
  }

  return (
    <>
      <ArtListItem
        key={firstImage.src}
        entry={props.entry}
        // entry={{
        //   ...firstImage,
        //   title: `${ props.entry.name }`,
        //   author: props.entry.author,
        // }}
        order={props.order}
        variantCount={props.entry.images.length}
        opened={open}
        onClick={() => changeOpen(true)}
      />
      <Dialog.Root open={open} onOpenChange={changeOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            className="z-[30] top-0 left-0 fixed w-screen h-screen bg-black/80 animate-in fade-in-0"
            style={{
              viewTransitionName: `variant-card-dialog-overlay`,
            }}
          />
          <VariantDialogContent
            entry={props.entry}
            onClose={() => {
              changeOpen(false)
            }}
          />
        </Dialog.Portal>
      </Dialog.Root>
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
    // @ts-ignore
    if (document.startViewTransition) {
      // @ts-ignore
      document.startViewTransition(() => {
        transition(...args)

        // flushSync(() => {
        // transition(...args);
        // });
      })
    } else {
      transition(...args)
    }
  }
}
