import { readFile } from "fs/promises"
import { join } from "path"
import { fetchAuthor, fetchAuthors, fetchEntry } from "../../data"
import { NotFoundOgImage } from "@/components/og-image"
import { ImageResponse } from "next/og"

export async function generateStaticParams() {
  const authors = await fetchAuthors()
  return authors.map(
    author => author.entryIds.map(
      entryId => ({ authorid: author.id, entryid: entryId })
    )
  ).flat()
}

export default async function AuthorPageOGImage(context: {
  params: Promise<{ authorid: string, entryid: string }>
}) {
  const juaRegular = await readFile(join(process.cwd(), 'src/assets/Jua-Regular.ttf'))
  const logoData = await readFile(join(process.cwd(), 'src/app/icon.png'), 'base64')
  const logoSrc = `data:image/png;base64,${ logoData }`

  const { authorid: _authorid, entryid: _entryid } = await context.params
  const authorid = decodeURIComponent(_authorid)
  const entryid = decodeURIComponent(_entryid)

  const author = await fetchAuthor(authorid)
  const entry = await fetchEntry(authorid, entryid)

  if (!author || !entry) {
    return NotFoundOgImage({ what: "Entry" })
  }

  const displayImage = entry.images.find(i => i.label.endsWith('png')) || entry.images.at(0)

  return new ImageResponse((
    <div style={{
      display: "flex",
      flexDirection: "column",
      padding: "3rem",
      justifyContent: "flex-end",
      width: "100%",
      height: "100%",
      backgroundColor: "#292A31",
      color: "#DCDDF5",
      fontFamily: "Jua, sans-serif",
    }}>
      <div style={{ display: "flex", flexDirection: "column", position: 'relative', alignItems: 'center' }}>
        {
          displayImage ?
            displayImage.src.url.endsWith('svg') ? 
              <div style={{
                width: 1000,
                height: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#DCDDF555',
                fontSize: 48,
                padding: '1rem',
                textAlign: 'center',
              }}>
                Unable to render SVG Image.
              </div>
            :
            <img
              src={displayImage.src.url}
              width={1000}
              height={400}
              style={{
                objectFit: 'contain',
              }}
            /> :
            <div style={{
              width: 1000,
              height: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#DCDDF555',
              fontSize: 48,
              padding: '1rem',
              textAlign: 'center',
            }} >
              Missing Image Source URL
            </div>
        }
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', alignItems: 'flex-end' }}>
        <div style={{ display: "flex", gap: "1rem", fontSize: 40, paddingTop: '1rem' }}>
          {entry.title} <span style={{ opacity: 0.5 }}>by</span> {author.displayName}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: '1rem' }}>
          <div style={{ fontSize: 32, color: '#8F90A4', paddingTop: '1rem', lineHeight: 1.2, textAlign: 'center' }}>
            {entry.license.labelShort}
          </div>
        </div>
      </div>




    </div>
  ), {
    fonts: [
      {
        name: "Jua",
        data: juaRegular,
        weight: 400,
      }
    ]
  })


}