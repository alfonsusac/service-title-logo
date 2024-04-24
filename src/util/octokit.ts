import { Octokit } from "@octokit/rest"
import { unstable_cache } from "next/cache"

const octokit = new Octokit({
  auth: process.env.GH_KEY ?? undefined,
})

export const getContent = unstable_cache(async function (owner: string, repo: string, path?: string) {
  const res = await octokit.repos.getContent({ owner, repo, path: path ?? '' })
  if (!Array.isArray(res.data)) return []
  return res.data
}, undefined, {
  revalidate: 60 * 60 * 4,// 4 hour 
  tags: ['all']
})

export function isIconFolder(dir: Awaited<ReturnType<typeof getContent>>[0]) {
  return dir.type === 'dir' && !dir.path.startsWith('.')
}

export function getIconPaths(dir: Awaited<ReturnType<typeof getContent>>) {
  return dir.filter(isIconFolder).map((dir) => dir.path)
}

export function getIconFiles(dir: Awaited<ReturnType<typeof getContent>>) {
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
