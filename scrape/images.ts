import { DataImage } from "../types/types"
import { manuallyListedImages } from "../data/images-manual"
import { scrapedImages } from "../data/images-scraped"
import { } from "bun"
import { existsSync } from "node:fs"

export const getImages = async (): Promise<DataImage[]> => [
    ...manuallyListedImages,
  
    ...await (async () => {
        const i = await Promise.all(scrapedImages.map(async (scrapedImage) => {
            const cwd = `${import.meta.dir}/cloned/${scrapedImage.ownerRepoPath}`
            if (!existsSync(cwd)) {
                await Bun.$`git clone https://github.com/${scrapedImage.ownerRepoPath}.git ${import.meta.dir}/cloned/${scrapedImage.ownerRepoPath}`
                    .cwd("./scrape")
            } else {
                await Bun.$`git pull`.cwd(cwd)
            }

            const branch = (await Bun.$`git branch --show-current`.cwd(cwd).text())
                .replace("\n", "")

            const glob = new Bun.Glob('**/*.{png,svg,jpg,jpeg,gif,webp,avif,apng,tiff}')

            const files = Array.from(glob.scanSync({ cwd }))
            return Promise.all(files.map(async file => {
                const createdAt = await Bun.$`git log --diff-filter=A --format=%cD --date=short -- ${file}`
                    .cwd(cwd)
                    .text()

                return {
                    author: scrapedImage.author,
                    className: scrapedImage.className,
                    createdAt: new Date(createdAt),
                    title: file.split("/").pop()!,
                    src: `https://raw.githubusercontent.com/${scrapedImage.ownerRepoPath}/${branch}/${file}`,
                    raw: `https://github.com/${scrapedImage.ownerRepoPath}/blob/${branch}/${file}`,
                }
            }))
        }))

        return i.flat()
    })(),
]


const time = new Date().toISOString()

const data = JSON.stringify({
    updatedAt: time,
    data: (await getImages())
}, null, 2)

await Bun.write(`${import.meta.dir}/data/images.json`, data)

// check if "data" orphan branch exists
let branch = await Bun.$`git branch -a`.text()
if (!branch.includes("data")) {
    // create "data" orphan branch
    await Bun.$`git switch --orphan data`
} else {
    await Bun.$`git switch data`
    await Bun.$`git pull`
}

// add data/images.json to "data" orphan branch
await Bun.write("images.json", data)
await Bun.write(".gitignore", "*\n!images.json\n!.gitignore")

await Bun.$`git add images.json .gitignore`
await Bun.$`git commit -m "Update data \`${time}\`"`
await Bun.$`git push -u origin data`
await Bun.$`git switch main`
