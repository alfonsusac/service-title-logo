import type { Author, Data, Image } from "kawaii-logos-data"

const src = 'https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/data/images.json'

export async function getData() {
  const response = await fetch(src, {
    next: {
      revalidate: 60 * 1 // 1 min
    }
  }).then(res => res.json()) as Data
  return response
}

export async function getAuthors() {
  const response = await getData()
  return response.data
}

export async function getImages() {
  const response = await getData()
  return response.data.reduce((acc, cur) => {
    acc.push(...cur.images.map(image => ({ ...image, author: cur })))
    return acc
  }, [] as (Image & { author: Author })[])
}

export type ImagesWithAuthor = Awaited<ReturnType<typeof getImages>>