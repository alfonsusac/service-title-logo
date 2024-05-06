import type { Author, Data, Group, Image } from "kawaii-logos-data"

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
    if (!cur.images) return acc
    acc.push(...cur.images.map(image => ({ ...image, author: cur })))
    return acc
  }, [] as (Image & { author: Author })[])
}

export type VariantWithAuthor = Group & { author: Author }

export async function getVariants() {
  const response = await getData()
  return response.data.reduce<VariantWithAuthor[]>((acc, cur) => {
    if (!cur.groups && cur.images) {
      acc.push(
        ...cur.images.map<VariantWithAuthor>(
          image => ({
            name: image.title,
            author: cur,
            files: [image]
          })
        )
      )
    }

    if (cur.groups) {
      acc.push(...cur.groups.map(image => ({ ...image, author: cur })))
    }

    return acc
  }, [])
}


export type ImagesWithAuthor = Awaited<ReturnType<typeof getImages>>