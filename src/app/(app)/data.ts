import type { KawaiiLogosData } from "./data.types"

export async function fetchData() {
  const response = await fetch(
    'https://raw.githubusercontent.com/alfonsusac/kawaii-logos-data/refs/heads/main-2-data/data.json',
    {
      next: {
        revalidate: 60 * 1, // 1 min
        tags: [ 'all' ]
      }
    }
  ).then(res => res.json()) as KawaiiLogosData.Response
  return response
}
export async function fetchUpdatedAt() {
  const response = await fetchData()
  return response.updatedAt
}
export async function fetchAuthors() {
  const response = await fetchData()
  return response.data.authors
}
export async function fetchAllEntries() {
  const response = await fetchData()
  return response.data.entries
}
export async function fetchAuthor(authorId: string) {
  const response = await fetchData()
  const author = response.data.authors.find(author => author.id === authorId)
  return author
}
export async function fetchEntries(authorId: string) {
  const response = await fetchData()
  return response.data.entries.filter(entry => entry.authorId === authorId)
}
export async function fetchEntry(authorId: string, entryId: string) {
  const response = await fetchData()
  const entry = response.data.entries.find(entry => entry.authorId === authorId && entry.id === entryId)
  return entry
}
export function getMissingEntries(entries: KawaiiLogosData.Entries) {
  return entries.filter(entry => entry.imageCount === 0)
}

export async function fetchStandardLicenses() {
  const response = await fetchData()
  return response.data.standardLicenses
}
export async function fetchStandardLicense(licenseId: KawaiiLogosData.StandardLicense.Type) {
  const response = await fetchData()
  return response.data.standardLicenses[ licenseId ]
}


export function getAuthor(
  authors: KawaiiLogosData.Author[],
  authorId: string
) {
  return authors.find(author => author.id === authorId)
}

export function getLicenseInfo(
  standardLicenses: KawaiiLogosData.StandardLicense,
  licenseId: KawaiiLogosData.StandardLicense.Type
) {
  return standardLicenses[ licenseId ]
}
