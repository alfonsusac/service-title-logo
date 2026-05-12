import { readFile } from "fs/promises"
import { ImageResponse } from "next/og"
import { join } from "path"
import { fetchData } from "./(app)/data"

export default async function HomeOGImage() {

  const juaRegular = await readFile(join(process.cwd(), 'src/assets/Jua-Regular.ttf'))
  const logoData = await readFile(join(process.cwd(), 'src/app/icon.png'), 'base64')
  const logoSrc = `data:image/png;base64,${ logoData }`

  const data = await fetchData()

  const displayEntries = data.data.entries
    .filter(entry => entry.images.length > 0)
    .filter(entry => entry.images[ 0 ].label.endsWith('png'))
    .filter(entry => [ 'andregans', 'sawaratsuki', 'aikoyori', 'sawaratsuki_archived' ].includes(entry.authorId))


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
      <div style={{ position: "absolute", top: 0, right: 0, display: 'flex' }}>
        <div style={{ position: "absolute", top: -50, right: -80, display: "flex" }}>
          {[ 3, 12, 24, 46, 68 ].map(i => {
            const entry = displayEntries[ i ]
            const image = entry.images[ 0 ]
            return (<img key={i} style={{ marginLeft: "-3rem", objectFit: "contain" }} src={image.src.url} height={150} width={300} />)
          })}
        </div>
        <div style={{ position: "absolute", top: -50 + 100, right: -200, display: "flex" }}>
          {[ 5, 21, 14, 33 ].map(i => {
            const entry = displayEntries[ i ]
            const image = entry.images[ 0 ]
            return (<img key={i} style={{ marginLeft: "-3rem", objectFit: "contain" }} src={image.src.url} height={150} width={300} />)
          })}
        </div>
        <div style={{ position: "absolute", top: -50 + 100 + 100, right: -180, display: "flex" }}>
          {[ 7, 32, 16 ].map(i => {
            const entry = displayEntries[ i ]
            const image = entry.images[ 0 ]
            return (<img key={i} style={{ marginLeft: "-3rem", objectFit: "contain" }} src={image.src.url} height={150} width={300} />)
          })}
        </div>
        <div style={{ position: "absolute", top: -50 + 100 + 100 + 100, right: -50, display: "flex" }}>
          {[ 4, 9 ].map(i => {
            const entry = displayEntries[ i ]
            const image = entry.images[ 0 ]
            return (<img key={i} style={{ marginLeft: "-3rem", objectFit: "contain" }} src={image.src.url} height={150} width={300} />)
          })}
        </div>
        <div style={{ position: "absolute", top: -50 + 100 + 100 + 100 + 100, right: -180, display: "flex" }}>
          {[ 11, 8 ].map(i => {
            const entry = displayEntries[ i ]
            const image = entry.images[ 0 ]
            return (<img key={i} style={{ marginLeft: "-3rem", objectFit: "contain" }} src={image.src.url} height={150} width={300} />)
          })}
        </div>
      </div>

      <div
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "#292A31", opacity: 0.8 }}
      />

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