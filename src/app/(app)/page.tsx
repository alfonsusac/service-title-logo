import { getImages } from "@/data/images"
import Image from "next/image"
import Link from "next/link"
import ArtCard from "./ArtCard"
import SearchBar from "./Searchbar"
import ArtList from "./ArtList"

export default async function Home() {
  return (
    <main className="*:mb-2">
      <h1 className="text-6xl font-display tracking-wider text-slate-600 relative z-[1]">VTuber Service Logo</h1>
      <p className="font-display tracking-widest text-slate-400 text-2xl">A collection of service logos with the VTuber style.</p>
      <p className="font-display tracking-widest text-slate-400">You may find other variation by clicking source.</p>
      <SearchBar className=""/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-2 gap-y-8 mt-8">
        <ArtList images={(await getImages()).sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))} />
        {/* {
          (await getImages()).sort((a, b) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)).map((image, index) => {
            return (
              <ArtCard key={index} image={image} order={index} />
            )
          })
        } */}
      </div>
    </main>
  )
}
