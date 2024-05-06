import { Link } from "next-view-transitions"

export default function RequestPage() {

  return (
    <>
      <div className='relative overflow-visible'>
        <Link
          href="/"
          className="font-display text-theme-strong tracking-widest"
        // style={{ viewTransitionName: 'title-text' }}
        >VTuber Service Logo</Link>
        <h1 className="text-4xl font-display tracking-wider text-theme-stronger z-[1] sticky top-2">
          Want to add your own icons?
        </h1>
      </div>
      <div className="font-display tracking-widest py-1 *:my-2 leading-relaxed">
        <p className="text-pretty">You can reach out to the <a className="underline text-theme-strong" href="https://github.com/alfonsusac/kawaii-logos-data">GitHub repository here</a> to create an issue and let me know the link to your github repository or just any kinds of links that has transparent images.</p>
        <p className="text-pretty">If you have any feature requests please head out to <a className="underline text-theme-strong" href="https://github.com/alfonsusac/service-title-logo">this Github repository</a> instead. Its different, one is for the front-end, and the other is for the data collection.</p>
      </div>
    </>
  )
}