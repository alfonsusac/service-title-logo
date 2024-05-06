"use client"

import { Data, Entries } from "kawaii-logos-data"
import { useQueryState } from "nuqs"
import { ReactNode, use } from "react"
import { flushSync } from "react-dom"
import { getAuthors } from "./data"

const authorPromise = getAuthors()

export default function ImageDetailPage(props: {
  children: ReactNode,
}) {
  const authors = use(authorPromise)
  const { view, setView } = useImageView()

  if (view) {
    return (
      <main>
        {view}
        <button onClick={() => {
          setView(null)
        }}>
          Back
        </button>
      </main>
    )
  }

  return (
    <>
      {props.children}
    </>
  )
}

export function useImageView() {
  const [view, setView] = useQueryState('view', {
    history: 'push',
    
  })
  return {
    view, setView: (id: string | null) => {
      makeTransition(() => {
        setView(id)
      })
    }
  }
}

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

