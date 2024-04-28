import { getData } from "./data"
import LastUpdated from "./LastUpdated"
import ago from "s-ago"

export default async function Home() {
  const response = await getData();

  return (
    <>
      <h1 className="text-6xl font-display tracking-wider text-slate-600 relative z-[1] text-pretty"
      >VTuber Service Logo</h1>
      <p className="font-display tracking-widest text-slate-400 text-2xl text-pretty">A collection of service logos with the VTuber style.</p>
      <section className='my-2'>
        <p className="font-display tracking-widest text-slate-400 text-pretty">You may find other variation by clicking source.</p>
        <p className="font-display tracking-widest text-slate-400 text-pretty">Last updated:{' '}{ago(new Date(response.updatedAt))}
        {/* {Intl.DateTimeFormat('en-us', { dateStyle: "medium", timeStyle:'short' }).format(new Date())}{' '} */}
        {/* {Intl.DateTimeFormat('en-us', { timeZoneName: "short" }).format(new Date()).split(' ').slice(1).join(' ')}{' '} */}
        </p>
      </section>
    </>
  )
}
