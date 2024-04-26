import { Author } from "../types/types"
import { authors } from "./authors"

type ScrapedImages = {
  ownerRepoPath: `${ string }/${ string }`,
  author: Author,
  className: string
}

export const scrapedImages: ScrapedImages[] = [
  {
    ownerRepoPath: 'Crysta1221/tech_logos',
    author: authors.cr1sta_dev,
    className: 'object-contain'
  },
  {
    ownerRepoPath: 'Aikoyori/ProgrammingVTuberLogos',
    author: authors.aikoyori,
    className: 'object-contain'
  },
  {
    ownerRepoPath: 'SAWARATSUKI/ServiceLogos',
    author: authors.sawaratsuki,
    className: 'object-contain'
  },
  {
    ownerRepoPath: 'G2-Games/fun-logos',
    author: authors["g2-games"],
    className: 'object-contain'
  },
]