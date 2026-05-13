import { readFile } from "fs/promises"
import { ImageResponse } from "next/og"
import { join } from "path"
import { fetchData } from "./(app)/data"

export default async function HomeOGImage() {

  const juaRegular = await readFile(join(process.cwd(), 'src/assets/Jua-Regular.ttf'))
  const logoData = await readFile(join(process.cwd(), 'src/app/icon.png'), 'base64')
  const logoSrc = `data:image/png;base64,${ logoData }`

  const bgData = await readFile(join(process.cwd(), 'src/assets/og-image-generic-background.png'), 'base64')
  const bgSrc = `data:image/png;base64,${ bgData }`

  const data = await fetchData()

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
      <img src={bgSrc} width={124} style={{ position: "absolute", width: '100%', height: '100%', top: 0, left: 0 }} />

      <div style={{ display: "flex", flexDirection: "column", position: 'relative' }}>
        <img src={logoSrc} width={124} />
        <div style={{ fontSize: 72, paddingTop: '1rem' }}>
          Kawaii Logos
        </div>
        <div style={{ fontSize: 44, color: '#8F90A4', paddingTop: '1rem', lineHeight: 1.2, width: '40rem' }}>
          A collection of service/brand logos with the VTuber style.
        </div>
        <div style={{ fontSize: 36, color: '#8F90A488', paddingTop: '1.5rem', display: 'flex', rotate: '10deg' }}>
          {data.data.imageCount} images <div style={{ width: "2.5rem" }}></div> {data.data.authorCount} authors
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