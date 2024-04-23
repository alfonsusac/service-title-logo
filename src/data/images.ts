import { Octokit } from "@octokit/rest"
import { Author, authors } from "./authors"
import { unstable_cache } from "next/cache"
import { cache } from "react"

const octokit = new Octokit({
  auth: process.env.GH_KEY,
})

export type DataImage = {
  title: string
  src: string // displayed as thumbnail
  author: Author
  raw?: string // "source" link or something
  createdAt?: Date
  className?: string
}

export const getImages = cache(async (): Promise<DataImage[]> => [
  {
    title: 'Elysia',
    author: authors.saltyaom,
    src: 'https://pbs.twimg.com/media/GLl87akbUAAQC2o?format=jpg&name=4096x4096',
    raw: 'https://elysiajs.com/assets/elysia_v.webp'
  },


  {
    title: 'Skrillex',
    author: authors.disphing,
    src: 'https://pbs.twimg.com/media/GLh5aGWakAAM3dk?format=jpg&name=large',
    raw: 'https://drive.google.com/file/d/1mumHSFG6k8O1uKG29rYc9s0Wm_jQDSpP/view?usp=sharing',
  },
  {
    title: 'Porter Robinson',
    author: authors.disphing,
    src: 'https://pbs.twimg.com/media/GLh9h3rbQAA7wik?format=jpg&name=large',
    raw: 'https://drive.google.com/file/d/19bMQzV2ZseW-pyV8NSjDyitiuyeJNJ1G/view?usp=sharing',
  },
  {
    title: 'FL Studio',
    author: authors.disphing,
    src: 'https://pbs.twimg.com/media/GLhep0Za8AAyBff?format=jpg&name=large',
    raw: 'https://drive.google.com/file/d/1wMi3TOs-egixz6wuf4NNJpMfzArMcZZ2/view?usp=sharing',
  },
  {
    title: 'Bitwig Studio',
    author: authors.disphing,
    src: 'https://pbs.twimg.com/media/GLhevYka0AAmU7e?format=jpg&name=large',
    raw: 'https://drive.google.com/file/d/1Dc5icFqOCOm_6qyZh1MxsFN4QtmI6RcH/view?usp=sharing',
  },
  {
    title: 'Ableton Live',
    author: authors.disphing,
    src: 'https://pbs.twimg.com/media/GLhesuxaYAAqS__?format=jpg&name=large',
    raw: 'https://drive.google.com/file/d/1HkvgRiaexWQ2TssE2ZSatUsAm5ZhGLTh/view?usp=sharing',
  },
  {
    title: 'Logic Pro',
    author: authors.disphing,
    src: 'https://pbs.twimg.com/media/GLm7MOob0AAimzf?format=jpg&name=large',
  },

  {
    title: 'Visual Studio',
    author: authors.hvpexe,
    src: "https://github.com/hvpexe/ProgrammingVTuberLogos-VisualStudio/blob/master/VisualStudio/VisualStudioLogo.png?raw=true",
    raw: "https://github.com/hvpexe/ProgrammingVTuberLogos-VisualStudio/blob/master/VisualStudio/VisualStudioLogo.png",
  },

  {
    title: 'KATE',
    author: authors["g2-games"],
    src: "https://raw.githubusercontent.com/G2-Games/fun-logos/e17a9f8aba91f191a1cbbbac7d5b5b79e4910c92/kate/kate.svg",
    raw: "https://github.com/G2-Games/fun-logos/blob/main/kate/kate.svg",
  },

  {
    title: 'Visual Studio Code Korea',
    author: authors['IDMDiamondl'],
    src: "https://raw.githubusercontent.com/lDMDiamondl/ProgrammingVTuberLogosKR/main/VSCode/VSCode-Thick.png",
    raw: "https://github.com/lDMDiamondl/ProgrammingVTuberLogosKR/blob/main/VSCode/VSCode-Thick.png",
  },

  ...await (async () => {
    const icons: DataImage[] = []

    // const res = await octokit.rest.repos.getContent({
    //   owner: 'Aikoyori',
    //   repo: 'ProgrammingVTuberLogos',
    //   path: '',
    // })
    const res = await unstable_cache(async () => {
      return await octokit.rest.repos.getContent({
        owner: 'Aikoyori',
        repo: 'ProgrammingVTuberLogos',
        path: '',
      })
    })()

    if (!Array.isArray(res.data)) return []
    const aikoIconPaths = res.data.filter((d) => d.type === 'dir' && !d.path.startsWith('.')).map((dir) => {
      return dir.path
    })

    for (const dir of aikoIconPaths) {
      // const res = await octokit.rest.repos.getContent({
      //   owner: 'Aikoyori',
      //   repo: 'ProgrammingVTuberLogos',
      //   path: dir,
      // })
      const res = await unstable_cache(async () => {
        return await octokit.rest.repos.getContent({
          owner: 'Aikoyori',
          repo: 'ProgrammingVTuberLogos',
          path: dir,
        })
      }, [dir])()
      if (!Array.isArray(res.data)) continue
      console.log(res.data[0].download_url)
      icons.push({
        author: authors.aikoyori,
        src: res.data[0].download_url!,
        title: dir,
        raw: res.data[0].html_url!,
        className: 'object-contain'
      })
    }

    return icons
  })(),
  ...await (async () => {
    const icons: DataImage[] = []

    const res = await unstable_cache(async () => {
      return await octokit.rest.repos.getContent({
        owner: 'Crysta1221',
        repo: 'tech_logos',
        path: '',
      })
    })()

    if (!Array.isArray(res.data)) return []
    const aikoIconPaths = res.data.filter((d) => d.type === 'dir' && !d.path.startsWith('.')).map((dir) => {
      return dir.path
    })

    for (const dir of aikoIconPaths) {
      // const res = await octokit.rest.repos.getContent({
      //   owner: 'Aikoyori',
      //   repo: 'ProgrammingVTuberLogos',
      //   path: dir,
      // })
      const res = await unstable_cache(async () => {
        return await octokit.rest.repos.getContent({
          owner: 'Crysta1221',
          repo: 'tech_logos',
          path: dir,
        })
      }, [dir])()
      if (!Array.isArray(res.data)) continue
      console.log(res.data[0].download_url)
      icons.push({
        author: authors.cr1sta_dev,
        src: res.data[0].download_url!,
        title: dir,
        raw: res.data[0].html_url!,
        className: 'object-contain'
      })
    }

    return icons
  })()
])