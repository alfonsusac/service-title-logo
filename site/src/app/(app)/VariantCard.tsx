import { useQueryState } from "nuqs"
import ArtCard from "./ArtCard"
import { VariantWithAuthor } from "./data"
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTrigger } from "@radix-ui/react-dialog"
import { flushSync } from "react-dom"
import { useState } from "react"
import Image from "next/image"
import { cn } from "lazy-cn"
import { useImageView } from "./ImageDetail"



export default function VariantCard(props: {
  variant: VariantWithAuthor,
  order?: number
}) {
  const firstImage = props.variant.files[0]

  const { view, setView } = useImageView()
  // const [view, setView] = useQueryState('view')


  const [open, setOpen] = useState(false)
  function changeOpen(open: boolean) {
  makeTransition(() => {
    setOpen(open)
  })
  }

  // return (
  //   <>
  //     <ArtCard key={firstImage.imgSrc} image={{
  //       ...firstImage,
  //       title: `${ props.variant.name }`,
  //       author: props.variant.author
  //     }} order={props.order}
  //       onClick={() => {
  //         setView(props.variant.name)
  //       }}
  //     />
  //   </>
  // )

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
          />
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay
            className="z-[60] top-0 left-0 fixed w-screen h-screen bg-black/80 animate-in fade-in-0"
            style={{
              viewTransitionName: `variant-card-dialog-overlay`,
            }}
          />
          <DialogContent className="z-[60] top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2 
          bg-theme-bg w-full max-w-screen-lg p-8 
          h-full lg:h-auto
          lg:rounded-2xl
          flex flex-col justify-center items-start
          font-display text-theme-text tracking-wider
          "
            style={{
              viewTransitionName: `art-card-img-${ props.variant.author.handleName }-${ props.variant.name.replaceAll('.', '').replaceAll(' ', '') }-dialog`,
            }}
          >
            <DialogClose className="top-0 absolute right-0 m-4 p-3 px-5 text-lg rounded-xl hover:bg-theme-card">
              Back
            </DialogClose>
            <div className="flex flex-row gap-2 w-full">
              <div className="flex flex-col flex-1">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl"
                  style={{
                    overflow: firstImage.objectFit === 'contain' ? 'visible' : 'hidden',
                  }}
                >
                  <Image
                    unoptimized src={firstImage.imgSrc} alt={firstImage.title} title={firstImage.title}
                    fill style={{
                      objectFit: firstImage.objectFit,
                      // viewTransitionName: `art-card-img-${ props.variant.author.handleName }-${ props.variant.name.replaceAll('.', '').replaceAll(' ', '') }-img-dialog`
                    }}
                    className={cn(`object-cover transition-all group-hover:scale-110`)}
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div>{props.variant.name}</div>
                <div>by {props.variant.author.handleName}</div>
              </div>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}

// https://www.kvin.me/posts/transitions-example
function makeTransition(transition: () => void) {
  // Check if the browser supports the view transitions API
  // if not, just call the transition
  // @ts-ignore
  if (document.startViewTransition) {
    // @ts-ignore
    document.startViewTransition(() => {
      flushSync(() => {
        transition()
      })
    })
  } else {
    transition()
  }
}

