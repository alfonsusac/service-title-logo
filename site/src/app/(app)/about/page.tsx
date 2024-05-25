import { Link } from "next-view-transitions"

export default function AboutPage() {

  return (
    <>
      <div className=''>
        <Link
          href="/"
          className="font-display text-theme-strong tracking-widest"
        // style={{ viewTransitionName: 'title-text' }}
        >VTuber Service Logo</Link>
        <h1 className="text-4xl font-display tracking-wider text-theme-stronger z-[1] sticky top-2">
          About This Site
        </h1>
      </div>
      <div className="font-display tracking-widest py-1 *:my-2 leading-relaxed">
        <p className="text-pretty">This is a website that collects service icons (like programming languages or companies) in the style of the vtuber graphic design. It was a fun project that tries to implement all of Next.js features into a single website. I pretty much just want an excuse to make a website that employes the cute side of the art style.</p>
        <h3 className="text-theme-stronger text-lg pt-4">Technology Used</h3>
        <ul>
          {
            [
              "Next.js: App Router, static site generation",
              "React 19: use, suspense, view transitions",
              "TailwindCSS: theme, typography",
              "Vercel: hosting, serverless functions",
              "Github: version control, github actions, scraping, data storage",
              "Radix: dropdown, dialog",
            ].map((item, index) => {
              return <li key={index} className="list-item list-disc list-inside">{item}</li>
            })
          }
        </ul>
      </div>
    </>
  )
}