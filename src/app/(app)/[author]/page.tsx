import { getImages } from "@/data/images"
import ArtCard from "../ArtCard"
import { authors } from "@/data/authors"
import Link from "next/link"

export default async function AuthorPage(context: {params: {author: string}}) {

  const authorid = context.params.author

  if (authorid in authors === false) {
    return <main>
      <div className='relative'>
        <h1 className="text-6xl font-display tracking-wider text-slate-600 relative z-[1]">Author Not Found!</h1>
      </div>
    </main>
  }


  

  return (
    <main className="*:mb-2">
      <div className='relative'>
        <Link
          href="/"
          className="font-display text-slate-400 tracking-widest">VTuber Service Logo</Link>
        <h1 className="text-4xl font-display tracking-wider text-slate-600 relative z-[1]">{authorid}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-2 gap-y-8 mt-8">
        {
          (await getImages()).filter(i => i.author.name === authorid).map((image, index) => {
            return (
              <ArtCard key={index} image={image} />
            )
          })
        }
      </div>
    </main>
  )
}