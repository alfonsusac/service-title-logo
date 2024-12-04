import { SVGProps } from "react"
import { Link } from "next-view-transitions"
import { getAuthors, getVariants } from "../data"
import { Author } from "kawaii-logos-data"
import { notFound } from "next/navigation"
import SuspensedArtList from "../ArtList.server"
import { stringSorter } from "@/util/sort"

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors?.map(author => ({ author: author.handleName }))
}

export default async function AuthorPage(context: { params: { author: string } }) {
  const variants = await getVariants()
  const authors = await getAuthors()
  const authorid = context.params.author

  if (authors?.findIndex(author => author.handleName === authorid) === -1) {
    return notFound()
  }

  const author = authors?.find(a => a.handleName === authorid) as Author
  const license = author.license as Author['license']
  const link = author.link as Author['link']

  return (
    <div className='tracking-widest'>
      <div className="flex gap-2 items-baseline">
        <h1 className="text-4xl text-theme-stronger z-[1] sticky top-2">
          {authorid}
        </h1>
        {link.github &&
          <a className="inline-flex text-theme-strong hover:underline" href={`https://github.com/${ link.github }`} target="_blank">
            <UimGithubAlt className="inline" />
          </a>
        }
        {link.bluesky &&
          <a className="inline-flex text-theme-strong hover:underline" href={`https://bsky.app/profile/${ link.bluesky }`} target="_blank">
            <SimpleIconsBluesky className="inline" />
          </a>
        }
        {link.twitter &&
          <a className="inline-flex text-theme-strong hover:underline" href={`https://twitter.com/${ link.twitter }`} target="_blank">
            <IconParkSolidTwitter className="inline" />
          </a>}
      </div>
      <div className=" py-1 *:my-2 leading-tight">
        <p className="text-pretty">This is a collection of images by <span>{authorid}</span></p>
        <p className="text-pretty">{`Please read the artist's license & readme before using!`}</p>
        <p className="">
          <span>license: </span>
          {
            license?.href
              ? <a className="text-theme-strong hover:underline" href={license.href} target="_blank">{license.label}</a>
              : <span className="">Unknown</span>
          }
        </p>
        {
          author.repository && <p className=""><span >links: </span>{' '}
            <a className="text-theme-strong hover:underline" href={author.repository} target="_blank">repository</a>{' '}
          </p>
        }
      </div>
      <section className="min-h-[50vh]">
        <SuspensedArtList variants={variants.filter(variant => variant.author.handleName === author.handleName).sort(stringSorter(variants[0], "name"))} />
      </section>
    </div>
  )
}


export function IconParkSolidTwitter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48" {...props}><path fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth="4" d="M5 35.762c1.929 1.067 15.891 9.115 25.82 2.912c9.928-6.203 9.38-16.89 9.38-21.788c.9-1.884 2.8-2.842 2.8-7.942c-1.866 1.724-3.721 2.31-5.565 1.76c-1.806-2.754-4.291-3.973-7.456-3.655c-4.746.477-6.482 5.133-5.971 11.158c-7.318 3.7-13.056-2.683-16.014-7.503c-.988 3.796-1.94 8.354 0 13.395c1.294 3.362 4.405 6.203 9.331 8.526C12.332 35.33 8.224 36.377 5 35.762Z"></path></svg>
  )
}

export function UimGithubAlt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M20.116 5.901a3.883 3.883 0 0 0-.26-.31a4.413 4.413 0 0 0 .21-.76a5.284 5.284 0 0 0-.35-2.8s-1.12-.35-3.69 1.38a12.477 12.477 0 0 0-3.35-.45a12.604 12.604 0 0 0-3.36.45c-2.57-1.75-3.69-1.38-3.69-1.38a5.263 5.263 0 0 0-.35 2.77a4.21 4.21 0 0 0 .22.79c-.09.1-.18.21-.26.31a5.14 5.14 0 0 0-1.12 3.3a7.686 7.686 0 0 0 .04.85c.32 4.43 3.27 5.46 6.08 5.78a2.558 2.558 0 0 0-.77 1.39a4.022 4.022 0 0 0-.13 1.09v1.31c-1.119.1-2.267-.063-2.623-1.061a5.695 5.695 0 0 0-1.834-2.413a1.179 1.179 0 0 1-.17-.112a1.001 1.001 0 0 0-.93-.645h-.005a1 1 0 0 0-1 .995c-.003.812.81 1.337 1.143 1.515a4.466 4.466 0 0 1 .923 1.359c.364 1.023 1.429 2.578 4.466 2.376l.002.098l.004.268a1 1 0 0 0 1 1h4.714a1 1 0 0 0 1-1s.008-3.16.008-3.69a4.024 4.024 0 0 0-.13-1.09l-.002-.006l.004.006c-.009-.035-.022-.063-.032-.097a2.532 2.532 0 0 0-.74-1.293l.012.021l-.02-.02c2.81-.32 5.74-1.37 6.06-5.78a7.687 7.687 0 0 0 .04-.85a5.23 5.23 0 0 0-1.11-3.3Z"></path></svg>
  )
}

export function SimpleIconsBluesky(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565C.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479c.815 2.736 3.713 3.66 6.383 3.364q.204-.03.415-.056q-.207.033-.415.056c-3.912.58-7.387 2.005-2.83 7.078c5.013 5.19 6.87-1.113 7.823-4.308c.953 3.195 2.05 9.271 7.733 4.308c4.267-4.308 1.172-6.498-2.74-7.078a9 9 0 0 1-.415-.056q.21.026.415.056c2.67.297 5.568-.628 6.383-3.364c.246-.828.624-5.79.624-6.478c0-.69-.139-1.861-.902-2.206c-.659-.298-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8"></path></svg>
  )
}