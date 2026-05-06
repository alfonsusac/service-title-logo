import type { AuthorOutput, KawaiiLogoData } from "./data.types"

const src = 'https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/refs/heads/main-2-data/data.json'

export async function getData() {
  const response = await fetch(src, {
    next: {
      revalidate: 60 * 1 // 1 min
    }
  }).then(res => res.json()) as KawaiiLogoData
  return response
}

export async function getAuthors() {
  const response = await getData()
  return response.data.authors
}



export type EntryWithAuthor = AuthorOutput.EntryItem & { author: Omit<AuthorOutput, 'entries'> }

export async function getAllEntries() {
  const response = await getData()
  const entryArray: EntryWithAuthor[] = []
  for (const author of response.data.authors) {
    const { entries, ...justAuthor } = author
    for (const entry of entries) {
      entryArray.push({ ...entry, author: justAuthor })
    }
  }
  return entryArray
}


// export async function getAllEntriesOfAuthor(authorid: string) {
//   const response = await getData()
//   const author = response.data.authors.find(a => a.id === authorid)
//   if (!author) {
//     return null
//   }
//   const { entries, ...justAuthor } = author
//   const entryArray: EntryWithAuthor[] = entries.map(entry => ({ ...entry, author: justAuthor }))
//   return entryArray
// }



// export type VariantWithAuthor = Group & { author: Author }

// export async function getVariants() {
//   const response = await getData()
//   return response.data.reduce<VariantWithAuthor[]>((acc, cur) => {

//     // const hasGroups = cur.groups && cur.groups.length > 0

//     const hasGroups = (en: Entry): en is Required<Entry> => {
//       return !!(en.groups && en.groups.length > 0)
//     }

//     if (!hasGroups(cur) && cur.images) {
//       acc.push(
//         ...cur.images.map<VariantWithAuthor>(image => ({
//           name: image.title,
//           author: cur,
//           files: [ image ],
//         }))
//       )
//     }

//     if (hasGroups(cur)) {
//       acc.push(...cur.groups.map(image => ({ ...image, author: cur })))
//     }

//     return acc
//   }, [])
// }


export type ImagesWithAuthor = Awaited<ReturnType<typeof getAllEntries>>