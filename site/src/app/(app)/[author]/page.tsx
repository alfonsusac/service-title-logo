import { getImages } from "../../../data/images"
import ArtCard from "../ArtCard"
import { Author, authors } from "../../../data/authors"
import { SVGProps } from "react"
import { Link } from "next-view-transitions"

export async function generateStaticParams() {
  return Object.keys(authors).map(author => ({ author }))
}

export default async function AuthorPage(context: { params: { author: string } }) {

  const authorid = context.params.author

  if (authorid in authors === false) {
    return <main>
      <div className='relative'>
        <h1 className="text-6xl font-display tracking-wider text-slate-600 relative z-[1]">Author Not Found!</h1>
      </div>
    </main>
  }

  const author = authors[authorid as keyof typeof authors]
  const license = author.license as Author['license']
  const link = author.link as Author['link']

  return (
    <>
      <div className='relative'>
        <Link
          href="/"
          className="font-display text-slate-400 tracking-widest"
          // style={{ viewTransitionName: 'title-text' }}
        >VTuber Service Logo</Link>
        <h1 className="text-4xl font-display tracking-wider text-slate-600 relative z-[1]">
          {authorid}{' '}
          <span className="text-xl align-middle">
            {
              link.github && <a className="text-slate-500 hover:underline" href={link.github} target="_blank"><UimGithubAlt className="inline" /></a>
            }
            {' '}
            {
              link.twitter && <a className="text-slate-500 hover:underline" href={link.twitter} target="_blank"><IconParkSolidTwitter className="inline" /></a>
            }
          </span>
        </h1>
      </div>
      <div className="font-display tracking-widest text-slate-400 *:my-1">
        <p style={{
          // viewTransitionName: 'author-info'
        }}>This is a collection of images by <span
            // style={{ viewTransitionName: `author-info-${ authorid }` }}
          >{authorid}</span></p>
        {
          license && license.label &&
          <>
            <p
              // style={{ viewTransitionName: `author-license-disclaimer` }}
            >{`Please read the artist's license & readme before using!`}</p>
            <p className="">
              <span
                // style={{ viewTransitionName: `author-license-label` }}
              >license: </span>
              <a className="text-slate-500 hover:underline" href={license?.href} target="_blank"
                // style={{ viewTransitionName: `author-license-label-${ license.label }` }}
              >{license.label}</a>
            </p>
          </>
        }
        {
          author.repository && <p className=""
            // style={{ viewTransitionName: `author-links-label` }}
          ><span >links: </span>{' '}
            <a className="text-slate-500 hover:underline" href={author.repository} target="_blank">repository</a>{' '}
          </p>
        }
      </div>
    </>
  )
}

export const dynamicParams = false


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
