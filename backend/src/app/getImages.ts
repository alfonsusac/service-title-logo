import path from "path"
import { Author, DataImage } from "../../../types/types"
import { Octokit } from "@octokit/rest"
import fetch2 from "node-fetch"

const octokit = new Octokit({
  auth: process.env.GH_KEY ?? undefined,
  request: {
    // Use Next.js's patched fetch to force cache :thumbsup:
    fetch: (input: any, init: any) => fetch(input, {
      ...init,
    })
  }
})

export const getAuthorIcon = async (props: {
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
    const res = await getContent(owner, repo, dir)

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
  console.log(`Owner: ${ owner } Repo: ${ repo } Path: ${ path }`)
  const res = await octokit.repos.getContent({
    owner, repo, path: path ?? '',
    request: {
      fetch: (input: any, init: any) => fetch(input, {
        ...init,
        next: {
          revalidate,
          tags: [owner, `${ owner }/${ repo }`]
        }
      })
    }
  })
  if (!Array.isArray(res.data)) return []
  return res.data
}


