import { getData } from "./data"
import ago from "s-ago"
import { Header } from "./Header"

export default async function Home() {
  const response = await getData()

  return (
    <header className="mb-8 md:-ml-56">
      <Header updatedAt={response.updatedAt} />
    </header>
  )
}
