import { fetchData } from "@/app/(app)/data"
import { readFile } from "fs/promises"
import { ImageResponse } from "next/og"
import { join } from "path"
import type { JSXElementConstructor, ReactElement } from "react"

export async function AppOGImage(
  element: ReactElement<unknown, string | JSXElementConstructor<any>>
) {
  const juaRegular = await readFile(join(process.cwd(), 'src/assets/Jua-Regular.ttf'))
  return new ImageResponse(element, {
    fonts: [
      {
        name: "Jua",
        data: juaRegular,
        weight: 400,
      }
    ]
  })
}

export async function getAppLogoBase64() {
  const logoData = await readFile(join(process.cwd(), 'src/app/icon.png'), 'base64')
  const logoSrc = `data:image/png;base64,${ logoData }`
  return logoSrc
}

export async function NotFoundOgImage(props: {
  what: string
}) {
  const data = await fetchData()
  const logoSrc = await getAppLogoBase64()
  const displayEntries = data.data.entries
    .filter(entry => entry.images.length > 0)
    .filter(entry => entry.images[ 0 ].label.endsWith('png'))
    .filter(entry => [ 'andregans', 'sawaratsuki', 'aikoyori', 'sawaratsuki_archived' ].includes(entry.authorId))
  return AppOGImage((
    <div style={{
      display: "flex",
      flexDirection: "column",
      padding: "6rem",
      justifyContent: "flex-end",
      width: "100%",
      height: "100%",
      backgroundColor: "#292A31",
      color: "#DCDDF5",
      fontFamily: "Jua, sans-serif",
    }}>
      <div style={{ display: "flex", flexDirection: "column", position: 'relative' }}>
        <div style={{ display: "flex", fontSize: 72, paddingTop: '1rem' }}>
          {props.what} Not Found
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: '1rem' }}>
          <img src={logoSrc} width={48} style={{ marginTop: "1rem" }} />
          <div style={{ fontSize: 44, color: '#8F90A4', paddingTop: '1rem', lineHeight: 1.2, width: '40rem' }}>
            Kawaii Logos
          </div>
        </div>
      </div>


      {/* Random Background Images */}
      <div style={{ position: "absolute", top: 0, right: 0, display: 'flex', opacity: 0.2 }}>
        <div style={{ position: "absolute", top: -50, right: -80, display: "flex" }}>
          {
            [ 3, 12, 24, 46, 68 ].map(i => {
              const entry = displayEntries[ i ]
              const image = entry.images[ 0 ]
              return (
                <img key={i} style={{ marginLeft: "-0.5rem", objectFit: "contain" }} src={image.src.url} height={150} width={300} />
              )
            })
          }
        </div>
        <div style={{ position: "absolute", top: 100, right: -200, display: "flex" }}>
          {
            [ 5, 21, 14 ].map(i => {
              const entry = displayEntries[ i ]
              const image = entry.images[ 0 ]
              return (
                <img key={i} style={{ marginLeft: "-0.5rem", objectFit: "contain" }} src={image.src.url} height={150} width={300} />
              )
            })
          }
        </div>
        <div style={{ position: "absolute", top: 250, right: -80, display: "flex" }}>
          {
            [ 7, 32 ].map(i => {
              const entry = displayEntries[ i ]
              const image = entry.images[ 0 ]
              return (
                <img key={i} style={{ marginLeft: "-0.5rem", objectFit: "contain" }} src={image.src.url} height={150} width={300} />
              )
            })
          }
        </div>
        <div style={{ position: "absolute", top: 400, right: -200, display: "flex" }}>
          {
            [ 4, 9 ].map(i => {
              const entry = displayEntries[ i ]
              const image = entry.images[ 0 ]
              return (
                <img key={i} style={{ marginLeft: "-0.5rem", objectFit: "contain" }} src={image.src.url} height={150} width={300} />
              )
            })
          }
        </div>
      </div>

    </div>
  ))
}