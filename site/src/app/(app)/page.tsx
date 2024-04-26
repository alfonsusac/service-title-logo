import { getImages } from "../../data/images"
import Image from "next/image"
import Link from "next/link"
import ArtCard from "./ArtCard"
import SearchBar from "./Searchbar"
import ArtList from "./ArtList"
import { Suspense } from "react"

export default async function Home() {
  return (
    <>
      <h1 className="text-6xl font-display tracking-wider text-slate-600 relative z-[1]">VTuber Service Logo</h1>
      <p className="font-display tracking-widest text-slate-400 text-2xl">A collection of service logos with the VTuber style.</p>
      <p className="font-display tracking-widest text-slate-400">You may find other variation by clicking source.</p>
      <p className="font-display tracking-widest text-slate-400">Last updated:{' '}
        {Intl.DateTimeFormat('en-us', { dateStyle: "medium", timeStyle:'short' }).format(new Date())}{' '}
        {Intl.DateTimeFormat('en-us', { timeZoneName: "short" }).format(new Date()).split(' ').slice(1).join(' ')}{' '}
      </p>
    </>
  )
}
