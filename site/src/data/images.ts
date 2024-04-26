import { Author, authors } from "./authors"
import { cache } from "react"
import { getContent, getIconFiles, getIconPaths } from "../util/octokit"
import path from "path"

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
    src: 'https://raw.githubusercontent.com/elysiajs/documentation/6e13f140b53fb69d9a82993cd80a82df55325b9e/docs/public/assets/elysia_v.svg',
    raw: 'https://github.com/elysiajs/documentation/blob/main/docs/public/assets/elysia_v.svg'
  },


  {
    title: 'Skrillex',
    author: authors.disphing,
    src: 'https://raw.githubusercontent.com/alfonsusac/service-title-logo/main/src/assets/GLh5aGWakAAM3dk.jpeg',
    raw: 'https://drive.google.com/file/d/1mumHSFG6k8O1uKG29rYc9s0Wm_jQDSpP/view?usp=sharing',
  },
  {
    title: 'Porter Robinson',
    author: authors.disphing,
    src: 'https://raw.githubusercontent.com/alfonsusac/service-title-logo/main/src/assets/GLh9h3rbQAA7wik.jpeg',
    raw: 'https://drive.google.com/file/d/19bMQzV2ZseW-pyV8NSjDyitiuyeJNJ1G/view?usp=sharing',
  },
  {
    title: 'FL Studio',
    author: authors.disphing,
    src: 'https://raw.githubusercontent.com/alfonsusac/service-title-logo/main/src/assets/GLhep0Za8AAyBff.jpeg',
    raw: 'https://drive.google.com/file/d/1wMi3TOs-egixz6wuf4NNJpMfzArMcZZ2/view?usp=sharing',
  },
  {
    title: 'Bitwig Studio',
    author: authors.disphing,
    src: 'https://raw.githubusercontent.com/alfonsusac/service-title-logo/main/src/assets/GLhevYka0AAmU7e.jpeg',
    raw: 'https://drive.google.com/file/d/1Dc5icFqOCOm_6qyZh1MxsFN4QtmI6RcH/view?usp=sharing',
  },
  {
    title: 'Ableton Live',
    author: authors.disphing,
    src: 'https://raw.githubusercontent.com/alfonsusac/service-title-logo/main/src/assets/GLhesuxaYAAqS__.jpeg',
    raw: 'https://drive.google.com/file/d/1HkvgRiaexWQ2TssE2ZSatUsAm5ZhGLTh/view?usp=sharing',
  },
  {
    title: 'Logic Pro',
    author: authors.disphing,
    src: 'https://raw.githubusercontent.com/alfonsusac/service-title-logo/main/src/assets/GLm7MOob0AAimzf.jpeg',
  },

  {
    title: 'Visual Studio',
    author: authors.hvpexe,
    src: "https://github.com/hvpexe/ProgrammingVTuberLogos-VisualStudio/blob/master/VisualStudio/VisualStudioLogo.png?raw=true",
    raw: "https://github.com/hvpexe/ProgrammingVTuberLogos-VisualStudio/blob/master/VisualStudio/VisualStudioLogo.png",
  },
  {
    title: 'Visual Studio Code Korea',
    author: authors['IDMDiamondl'],
    src: "https://raw.githubusercontent.com/lDMDiamondl/ProgrammingVTuberLogosKR/main/VSCode/VSCode-Thick.png",
    raw: "https://github.com/lDMDiamondl/ProgrammingVTuberLogosKR/blob/main/VSCode/VSCode-Thick.png",
  },

  ...await getAuthorIcon({
    ownerRepoPath: 'Aikoyori/ProgrammingVTuberLogos',
    author: authors.aikoyori,
    className: 'object-contain'
  }),
  ...await getAuthorIcon({
    ownerRepoPath: 'Crysta1221/tech_logos',
    author: authors.cr1sta_dev,
    className: 'object-contain'
  }),
  ...await getAuthorIcon({
    ownerRepoPath: 'SAWARATSUKI/ServiceLogos',
    author: authors.sawaratsuki,
    className: 'object-contain'
  }),
  ...await getAuthorIcon({
    ownerRepoPath: 'G2-Games/fun-logos',
    author: authors["g2-games"],
    className: 'object-contain'
  }),

])

async function getAuthorIcon(props: {
  ownerRepoPath: `${ string }/${ string }`,
  baseRepoPath?: string, // e.g. '' | '/src'
  className?: string,
  author: Author,
}) {
  const owner = props.ownerRepoPath.split('/')[0]
  const repo = props.ownerRepoPath.split('/')[1]

  const icons: DataImage[] = []
  const res = await getContent(owner, repo, props.baseRepoPath)

  await Promise.all(getIconPaths(res).map(async (dir) => {
    const res = await getContent(owner, repo, props.baseRepoPath ? path.join(props.baseRepoPath, dir) : dir)

    for (const file of getIconFiles(res)) {
      icons.push({
        author: props.author,
        className: props.className,
        src: new URL(file.download_url).toString().replaceAll(dir, encodeURIComponent(dir)),
        raw: new URL(file.html_url).toString(),
        title: file.title,
      })
    }
  }))
  
  return icons
}
