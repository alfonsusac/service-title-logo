"use client"

import ago from "s-ago"

export function InlineCreatedAt(props: {
  createdAt: string
}) {
  const date = new Date(props.createdAt)

  return (
    <>
      <span>{date.toLocaleDateString()}</span>
      <span className="text-theme-text/50 ml-2">({ago(date)})</span>
    </>
  )
}