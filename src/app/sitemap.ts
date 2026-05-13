import type { MetadataRoute } from "next"
import { fetchAllEntries, fetchAuthors } from "./(app)/data"
import { canonicalUrl } from "@/app-info"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  function page(
    path: `/${ string }`,
    priority: MetadataRoute.Sitemap[ 0 ][ 'priority' ] = 0.5,
    opts?: {
      freq?: MetadataRoute.Sitemap[ 0 ][ 'changeFrequency' ],
      images?: MetadataRoute.Sitemap[ 0 ][ 'images' ]
    }
  ): MetadataRoute.Sitemap[ 0 ] {
    return {
      url: `${ canonicalUrl }${ path }`,
      lastModified: new Date(),
      changeFrequency: opts?.freq ?? "yearly",
      priority: priority,
      images: opts?.images,
    }
  }

  const authors = await fetchAuthors()
  const entries = await fetchAllEntries()

  return [
    page("/", 1),
    page("/about", 0.8),
    page("/request", 0.8),
    ...authors.map(author => page(`/authors/${ author.id }`, 0.7, {
      images: entries.filter(entry => entry.authorId === author.id).map(entry => entry.images.at(0)?.src.url).filter(url => url !== undefined) as string[]
    })),
    ...entries.map(entry => page(`/authors/${ entry.authorId }/${ entry.id }`, 0.6, {
      images: entry.images.map(image => image.src.url)
    })),
  ]
}