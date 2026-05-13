import { readFile } from "fs/promises"
import { ImageResponse } from "next/og"
import { join } from "path"
import { fetchAuthor, fetchAuthors, fetchData, fetchEntries } from "../data"
import { NotFoundOgImage } from "@/components/og-image"

export async function generateStaticParams() {
  const authors = await fetchAuthors()
  return authors?.map(author => ({ authorid: author.id }))
}

export const dynamicParams = false

export default async function AuthorPageOGImage(context: {
  params: Promise<{ authorid: string }>
}): Promise<ImageResponse> {

  const juaRegular = await readFile(join(process.cwd(), 'src/assets/Jua-Regular.ttf'))
  const logoData = await readFile(join(process.cwd(), 'src/app/icon.png'), 'base64')
  const logoSrc = `data:image/png;base64,${ logoData }`

  const { authorid: _authorid } = await context.params
  const authorid = decodeURIComponent(_authorid)

  const author = await fetchAuthor(authorid)
  if (!author) {
    return NotFoundOgImage({ what: "Author" })
  }

  const entries = await fetchEntries(authorid)

  const displayImages = entries
    .filter(entry => entry.images.length > 0)
    .filter(entry => entry.images.some(i => i.label.endsWith('png')) || entry.images[ 0 ])
    .map(e => e.images.find(i => i.label.endsWith('png')) || e.images[ 0 ])
    .filter(i => !i.src.url.endsWith("svg"))
    .filter(i => i)
  
  try {
    return new ImageResponse((
      <div style={{
        display: "flex",
        flexDirection: "column",
        padding: "6rem",
        // alignItems: "flex-end",
        justifyContent: "flex-end",
        width: "100%",
        height: "100%",
        backgroundColor: "#292A31",
        color: "#DCDDF5",
        fontFamily: "Jua, sans-serif",
      }}>
        {/* Random Background Images */}
        {displayImages.length > 4 &&
          <div style={{ position: "absolute", top: 0, right: 0, display: 'flex' }}>
            <div style={{ position: "absolute", top: -50, right: -80, display: "flex", flexDirection: "column" }}>
              {[ 1, 2, 3, 4, 5, 6, 7 ].map(i => {
                const entry = displayImages[ i % displayImages.length ]
                return <img key={i} style={{ marginLeft: "-0.5rem", objectFit: entry.style?.objectFit ?? "contain", marginTop: "-1rem" }} src={entry.src.url} width={300} />
              })}
            </div>
            <div style={{ position: "absolute", top: -120, right: 200, display: "flex", flexDirection: "column" }}>
              {[ 6, 7, 8, 9, 10, 11, 12 ].map(i => {
                const entry = displayImages[ i % displayImages.length ]
                return <img key={i} style={{ marginLeft: "-0.5rem", objectFit: entry.style?.objectFit ?? "contain", marginTop: "-1rem" }} src={entry.src.url} width={300} />
              })}
            </div>
            <div style={{ position: "absolute", top: -50, right: 480, display: "flex", flexDirection: "column" }}>
              {[ 11, 12, 13, 14, 15, 16, 17 ].map(i => {
                const entry = displayImages[ i % displayImages.length ]
                return <img key={i} style={{ marginLeft: "-0.5rem", objectFit: entry.style?.objectFit ?? "contain", marginTop: "-1rem" }} src={entry.src.url} width={300} />
              })}
            </div>
          </div>
        }
        {displayImages.length <= 4 && displayImages.length > 0 && (
          <div style={{ position: "absolute", top: 0, right: 0, display: 'flex' }}>
            <div style={{ position: "absolute", top: -50, right: 80, display: "flex", flexDirection: "column" }}>
              {[ 1, 2, 3, 4 ].map(i => {
                const entry = displayImages[ i % displayImages.length ]
                return <img key={i} style={{ marginLeft: "-0.5rem", objectFit: entry.style?.objectFit ?? "contain", marginTop: "-1rem" }} src={entry.src.url} width={500} />
              })}
            </div>
          </div>
        )}

        <div
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "#292A31", opacity: 0.8 }}
        />

        <div style={{ display: "flex", flexDirection: "column", position: 'relative' }}>
          <div style={{ display: "flex", alignItems: "center", gap: '1rem' }}>
            <img src={logoSrc} width={48} style={{ marginTop: "1rem" }} />
            <div style={{ fontSize: 44, color: '#8F90A4', paddingTop: '1rem', lineHeight: 1.2, width: '40rem' }}>
              Kawaii Logos
            </div>
          </div>
          <div style={{ fontSize: author.displayName.length < 14 ? 120 : 86, paddingTop: '1rem' }}>
            {author.displayName}
          </div>
          <div style={{ fontSize: 36, color: '#8F90A488', paddingTop: '1.5rem', display: 'flex', rotate: '10deg' }}>
            {entries.filter(e => e.images.length).length} entries
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
  } catch (error) {
    return new ImageResponse((
      <div style={{
        display: "flex",
        flexDirection: "column",
        padding: "6rem",
        // alignItems: "flex-end",
        justifyContent: "flex-end",
        width: "100%",
        height: "100%",
        backgroundColor: "#292A31",
        color: "#DCDDF5",
        fontFamily: "Jua, sans-serif",
      }}>
        <div
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "#292A31", opacity: 0.8 }}
        />

        <div style={{ display: "flex", flexDirection: "column", position: 'relative' }}>
          <div style={{ display: "flex", alignItems: "center", gap: '1rem' }}>
            <img src={logoSrc} width={48} style={{ marginTop: "1rem" }} />
            <div style={{ fontSize: 44, color: '#8F90A4', paddingTop: '1rem', lineHeight: 1.2, width: '40rem' }}>
              Kawaii Logos
            </div>
          </div>
          <div style={{ fontSize: author.displayName.length < 14 ? 120 : 86, paddingTop: '1rem' }}>
            {author.displayName}
          </div>
          <div style={{ fontSize: 36, color: '#8F90A488', paddingTop: '1.5rem', display: 'flex', rotate: '10deg' }}>
            {entries.filter(e => e.images.length).length} entries
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
}