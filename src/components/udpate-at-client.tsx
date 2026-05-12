"use client"

import ago from "s-ago"

export function UpdatedAtClient(props: {
  updatedAt: string
}) {
  return ago(new Date(props.updatedAt))
}