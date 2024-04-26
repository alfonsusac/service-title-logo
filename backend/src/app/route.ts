import { Octokit } from "@octokit/rest"
import { NextResponse } from "next/server"
import path from "path"
import fetch2 from "node-fetch"

// export const revalidate = 60 * 60 * 4 // 4 hour

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    data: await getImages()
  })
}

const octokit = new Octokit({
  auth: process.env.GH_KEY ?? undefined,
  request: {
    // Use Next.js's patched fetch to force cache :thumbsup:
    fetch: (input: any, init: any) => fetch(input, {
      ...init,
      // cache: 'no-cache'
    })
  }
})

type DataImage = {
  title: string
  src: string // displayed as thumbnail
  author: Author
  raw?: string // "source" link or something
  createdAt?: Date
  className?: string
}

const getImages = async (): Promise<DataImage[]> => [
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
    ownerRepoPath: 'Crysta1221/tech_logos',
    author: authors.cr1sta_dev,
    className: 'object-contain'
  }),
  // ...await getAuthorIcon({
  //   ownerRepoPath: 'Aikoyori/ProgrammingVTuberLogos',
  //   author: authors.aikoyori,
  //   className: 'object-contain'
  // }),
  // ...await getAuthorIcon({
  //   ownerRepoPath: 'SAWARATSUKI/ServiceLogos',
  //   author: authors.sawaratsuki,
  //   className: 'object-contain'
  // }),
  // ...await getAuthorIcon({
  //   ownerRepoPath: 'G2-Games/fun-logos',
  //   author: authors["g2-games"],
  //   className: 'object-contain'
  // }),

]

const getAuthorIcon = async (props: {
  ownerRepoPath: `${ string }/${ string }`,
  baseRepoPath?: string, // e.g. '' | '/src'
  className?: string,
  author: Author,
}) => {
  const owner = props.ownerRepoPath.split('/')[0]
  const repo = props.ownerRepoPath.split('/')[1]

  const icons: DataImage[] = []
  const res = await getContent(owner, repo, props.baseRepoPath)

  await printOctocatRateLimit(`${ owner }/${ repo }`)

  async function processIcons(dir: string) {
    console.log(`${ owner }/${ repo }/${ dir }`)
    const res = await getContent(owner, repo, props.baseRepoPath ? path.join(props.baseRepoPath, dir) : dir)

    await printOctocatRateLimit(`${ owner }/${ repo }/${ dir }`)

    for (const file of getIconFiles(res)) {
      icons.push({
        author: props.author,
        className: props.className,
        src: new URL(file.download_url).toString().replaceAll(dir, encodeURIComponent(dir)),
        raw: new URL(file.html_url).toString(),
        title: file.title,
      })
    }
  }

  // Sequential async await for each
  // for (const dir of getIconPaths(res)) {
  //   await processIcons(dir)
  // }

  await Promise.all(getIconPaths(res).map(processIcons))

  return icons
}

// Always Up to Date
async function printOctocatRateLimit(purpose: string) {
  const rl = await octokit.rateLimit.get({
    request: { fetch: (input: any, init: any) => fetch2(input, { ...init, }) }
  })
  console.log(`\n > fetching for ${ purpose } |`, rl.data.resources.core.remaining, 'requests remaining |', rl.data.resources.core.used, 'requests used |', rl.data.resources.core.limit, 'limit')
}

function isIconFolder(dir: Awaited<ReturnType<typeof getContent>>[0]) {
  return dir.type === 'dir' && !dir.path.startsWith('.')
}

function getIconPaths(dir: Awaited<ReturnType<typeof getContent>>) {
  return dir.filter(isIconFolder).map((dir) => dir.path)
}

function getIconFiles(dir: Awaited<ReturnType<typeof getContent>>) {
  const files: { title: string, download_url: string, html_url: string }[] = []

  for (const file of dir) {
    if (!file.download_url
      || !file.html_url
      || file.type !== 'file'
      || (
        !file.name.endsWith('.png')
        && !file.name.endsWith('.svg')
        && !file.name.endsWith('.jpg')
        && !file.name.endsWith('.jpeg')
        && !file.name.endsWith('.gif')
        && !file.name.endsWith('.webp')
        && !file.name.endsWith('.avif')
        && !file.name.endsWith('.apng')
        && !file.name.endsWith('.tiff')
      )
    ) continue
    files.push({
      title: file.name,
      download_url: file.download_url,
      html_url: file.html_url,
    })
  }

  return files
}


const getContent = async (owner: string, repo: string, path?: string, revalidate?: number) => {
  const res = await octokit.repos.getContent({
    owner, repo, path: path ?? '',
    request: {
      fetch: (input: any, init: any) => fetch(input, {
        ...init,
        next: {
          revalidate, 
          tags: [owner, `${owner}/${repo}`]
        }
      })
    }
  })
  if (!Array.isArray(res.data)) return []
  return res.data
}


type Author = {
  name: string,
  pfp?: string,
  link: {
    github?: string,
    twitter?: string,
  },
  repository: string,
  license: {
    label?: string,
    href?: string,
  },
}

const authors = {
  sawaratsuki: {
    name: 'sawaratsuki',
    pfp: 'https://avatars.githubusercontent.com/u/64746703?v=4',
    link: {
      github: 'https://github.com/SAWARATSUKI',
      twitter: 'https://twitter.com/sawaratsuki1004',
    },
    repository: 'https://github.com/SAWARATSUKI/ServiceLogos',
    license: {
      label: 'CC BY-NC-SA 4.0',
      href: 'https://github.com/SAWARATSUKI/ServiceLogos/blob/main/LICENSE',
    }
  },
  cr1sta_dev: {
    name: 'cr1sta_dev',
    pfp: 'https://avatars.githubusercontent.com/u/70198466?v=4',
    link: {
      github: 'https://github.com/Crysta1221',
      twitter: 'https://twitter.com/cr1sta_dev',
    },
    repository: "https://github.com/Crysta1221/tech_logos",
    license: {
      label: 'Custom',
      href: 'https://github.com/Crysta1221/tech_logos/blob/main/README.md#license'
    }
  },
  saltyaom: {
    name: 'saltyaom',
    pfp: 'https://avatars.githubusercontent.com/u/35027979?v=4',
    link: {
      github: 'https://github.com/SaltyAom',
      twitter: 'https://twitter.com/saltyaom',
    },
    license: {},
    repository: '',
  },
  disphing: {
    name: 'disphing',
    // pfp: 'https://pbs.twimg.com/profile_images/1755004716046864384/ZUdGbYVD_400x400.jpg',
    link: {
      twitter: 'https://twitter.com/dsphng',
    },
    license: {},
    repository: 'https://drive.google.com/drive/folders/1Hy1_pAWx95QTv1nZFKUl96GImq4iKdf8',
  },
  aikoyori: {
    name: 'aikoyori',
    pfp: 'https://avatars.githubusercontent.com/u/12034280?v=4',
    link: {
      twitter: 'https://twitter.com/Aikoyori',
      github: 'https://github.com/Aikoyori'
    },
    license: {
      label: 'CC BY-NC-SA 4.0',
      href: 'https://github.com/Aikoyori/ProgrammingVTuberLogos/blob/main/LICENSE.md'
    },
    repository: 'https://github.com/Aikoyori/ProgrammingVTuberLogos',
  },
  hvpexe: {
    name: 'hvpexe',
    link: {
      github: 'https://github.com/hvpexe',
      twitter: 'https://twitter.com/Manhkbrady',
    },
    pfp: 'https://avatars.githubusercontent.com/u/97070754',
    repository: 'https://github.com/hvpexe/ProgrammingVTuberLogos-VisualStudio/',
    license: {
      label: 'CC-BY-NC-SA-4.0',
      href: 'https://github.com/hvpexe/ProgrammingVTuberLogos-VisualStudio/blob/master/LICENSE.md'
    }
  },
  "g2-games": {
    name: 'g2-games',
    link: {
      github: 'https://github.com/G2-Games',
    },
    pfp: "https://avatars.githubusercontent.com/u/72430668",
    license: {
      label: 'CC BY-NC-SA 4.0',
      href: 'https://github.com/G2-Games/fun-logos/blob/main/LICENSE'
    },
    repository: "https://github.com/G2-Games/fun-logos"
  },
  "IDMDiamondl": {
    name: 'IDMDiamondl',
    link: {
      github: 'https://github.com/lDMDiamondl',
    },
    pfp: 'https://avatars.githubusercontent.com/u/100426562',
    license: {
      label: 'CC BY-NC-SA 4.0',
      href: 'https://github.com/lDMDiamondl/ProgrammingVTuberLogosKR/blob/main/LICENSE.md'
    },
    repository: "https://github.com/lDMDiamondl/ProgrammingVTuberLogosKR/"
  }
} satisfies {
  [key: string]: Author
}