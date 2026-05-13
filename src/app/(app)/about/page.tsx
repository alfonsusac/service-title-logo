import { appName } from '@/app-info'
import { ArticlePage, ArticleProse, ArticleTitle } from '@/components/article-page'
import type { Metadata } from 'next'
import { Link } from "next-view-transitions"
import { fetchData } from '../data'


export const metadata: Metadata = {
  title: "About",
  description: "Learn more about the purpose and technology behind this website",
}


export default async function AboutPage() {
  const data = await fetchData()
  const officialWebsites = data.data.officialLinks

  return (
    <ArticlePage>
      <ArticleTitle title="About This Site" />
      <ArticleProse>
        <p>
          This is a website that collects service icons (like programming languages or companies) in the style of the vtuber graphic design. It was a fun project that tries to implement all of Next.js features into a single website. I pretty much just want an excuse to make a website that employes the cute side of the art style.
        </p>
        <h3>
          History
        </h3>

        <p>
          The kawaii logo trend started when <a href="https://x.com/AisuAsai" target="_blank">Aisu Asai</a> posted <a href="https://x.com/AisuAsai/status/1780118754590179702" target="_blank">a series of cute logos</a> of commercial brand on Twitter. This got viral which then inspired many artists to make their own version of the logos. <a href="https://x.com/Aikoyori/status/1780709418189078954" target="_blank">Aikoyori</a> was the first to do it which then followed by the now popular repository made by <a href="https://x.com/sawaratsuki1004/status/1781866355295387846" target="_blank">Sawaratsuki</a>.
        </p>

        <p>
          Some time later, official brands starts noticing the trends and some of them incorporated "kawaii logos" into their official website as an easter eggs. Here are list of the websites that still have them (as of May 2026):
        </p>

        <ul>
          {officialWebsites.map((item, index) => {
            return (
              <li key={index}>
                <Link href={item.url} target="_blank">
                  {item.label}<span className="opacity-25"> {item.url}</span>
                </Link>
                <span className="opacity-50">
                  {' '}by{' '}
                </span>
                <Link href={`/${ item.authorid }`}>
                  {item.authorid}
                </Link>
              </li>
            )
          })}
        </ul>

        <h3>
          Technology Used
        </h3>
        <ul>
          {[
            "Next.js: App Router, static site generation",
            "React 19: use, suspense, view transitions",
            "TailwindCSS: theme, typography",
            "Vercel: hosting, serverless functions",
            "Github: version control, github actions, scraping, data storage",
            "Radix: dropdown, dialog",
          ].map((item, index) => {
            return <li key={index}>{item}</li>
          })}
        </ul>

        <p>
          This website currently periodically reads update from a <a href="https://github.com/alfonsusac/kawaii-logos-data" target="_blank">separate repository (alfonsusac/kawaii-logos-data)</a> that collects the logos from manual submission or scraped from another repository. The data is then stored in a JSON file in the same repository which is then read by this website to be displayed.
        </p>

        <h3>
          Contact
        </h3>

        <p>
          If you want to submit a logo, found a bug, or just want to say hi, you can contact me on <a href="https://discord.gg/hb9TapzhQe" target="_blank">My Discord Server</a>.
        </p>

      </ArticleProse>
    </ArticlePage>
  )
}