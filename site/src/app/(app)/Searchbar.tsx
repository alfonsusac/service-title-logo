"use client"

import { cn } from "lazy-cn"
import { useQueryState } from 'nuqs'

export default function SearchBar(props: {
  className: string,
  style?: any
}) {
  const [search, setSearch] = useQueryState('search')

  return (
    <div
      style={{
        viewTransitionName: 'searchbar'
      }}
      className={cn(
        'p-1 px-3 mt-4 rounded-full bg-slate-100 sticky top-1',
        props.className)}>
      <input
        className="font-display tracking-widest text-slate-500 text-xl rounded-md p-2 w-full outline-none bg-transparent"
        placeholder="search..."
        onChange={(event) => {
          if (event.target.value === "") {
            setSearch(null)
          } else {
            setSearch(event.target.value)
          }
        }} />
    </div>

  )
}