import { DataImage } from "../../../types/types"
import { manuallyListedImages } from "../../../data/images-manual"
import { scrapedImages } from "../../../data/images-scraped"
import { getAuthorIcon } from "./getImages"

export const getImages = async (): Promise<DataImage[]> => [
  ...manuallyListedImages,
  
  ...await (async () => {
    const icons: DataImage[] = []

    await Promise.all(scrapedImages.map(async (scrapedImage) => {
      const author = scrapedImage.author
      const ownerRepoPath = scrapedImage.ownerRepoPath
      const className = scrapedImage.className
      const baseRepoPath = scrapedImage.path || ''
      const authoricons = await getAuthorIcon({ ownerRepoPath, baseRepoPath, className, author })
      icons.push(...authoricons)
    }))

    return icons

  })(),
]