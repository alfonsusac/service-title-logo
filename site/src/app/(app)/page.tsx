import { getData } from "./data"
import LastUpdated from "./LastUpdated"
import ago from "s-ago"

export default async function Home() {
  const response = await getData()

  return (
    <header className="mb-8 md:-ml-56">
      <h1 className="text-center text-5xl font-display tracking-wider text-theme-stronger relative z-[1] text-pretty mb-2">VTuber Service Logo</h1>
      <p className="text-center font-display tracking-widest text-xl text-pretty">A collection of service logos with the VTuber style.</p>
      <p className="text-center font-display tracking-widest text-xl text-pretty">Last updated:{' '}{ago(new Date(response.updatedAt))}</p>
    </header>
  )
}
