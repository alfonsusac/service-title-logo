"use client"

import ArtCard from "./ArtCard";
import { VariantWithAuthor } from "./data";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "@radix-ui/react-dialog";
import { useState } from "react";
import VariantDialogContent from "./VariantDialogContent";

export default function VariantCard(props: {
  variant: VariantWithAuthor;
  order?: number;
}) {
  const firstImage = props.variant.files[0];

  const [open, setOpen] = useState(false);
  function changeOpen(open: boolean) {
    return setOpen(open)
    return makeTransition(() => {
      setOpen(open);
    })();
  }

  return (
    <>
      <ArtCard
        key={firstImage.imgSrc}
        image={{
          ...firstImage,
          title: `${props.variant.name}`,
          author: props.variant.author,
        }}
        order={props.order}
        variantCount={props.variant.files.length}
        opened={open}
        onClick={() => changeOpen(true)}
      />
      <Dialog open={open} onOpenChange={changeOpen}>
        <DialogPortal>
          <DialogOverlay
            className="z-[30] top-0 left-0 fixed w-screen h-screen bg-black/80 animate-in fade-in-0"
            style={{
              viewTransitionName: `variant-card-dialog-overlay`,
            }}
          />
          <VariantDialogContent
            variant={props.variant}
            onClose={() => {
              changeOpen(false);
            }}
          />
        </DialogPortal>
      </Dialog>
    </>
  );
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
        transition(...args);

        // flushSync(() => {
          // transition(...args);
        // });
      });
    } else {
      transition(...args);
    }
  };
}
