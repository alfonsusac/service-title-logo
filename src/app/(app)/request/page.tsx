import { Link } from "next-view-transitions"

export default function RequestPage() {

  return (
    <>
      <div className='relative overflow-hidden'>
        <Link
          href="/"
          className="font-display text-theme-strong tracking-widest"
        // style={{ viewTransitionName: 'title-text' }}
        >VTuber Service Logo</Link>
        <h1 className="text-4xl font-display tracking-wider text-theme-stronger z-[1] sticky top-2">
          Feature Request
        </h1>
      </div>
      <div className="font-display tracking-widest py-1 *:my-5 leading-relaxed *:text-pretty 
      [&_a]:underline 
      [&_a]:text-theme-strong">
        I only have time to work on this project during the weekends, so if you have any feature or logo requests, I will appreciate it if you can create an issue on the respective GitHub repository.

        <h3 className="pt-4 text-theme-stronger text-lg">Want to add your logo here?</h3>
        <p className="">You can reach out to <a className="" href="https://github.com/alfonsusac/kawaii-logos-data">kawaii-logos-data&apos;s GitHub repository</a> to <a href="https://github.com/alfonsusac/kawaii-logos-data/issues">create an issue</a> and let me know the link to your github repository or just any kinds of links that has transparent images.</p>

        <p>If you have a collection of images that are stored in GitHub, I can also help you to automate the process of adding your images to the website. Just let me know the link to your repository and I will take care of the rest.</p>

        <p>The configuration for scraped data can be seen in this file: <a className="" href="https://github.com/alfonsusac/kawaii-logos-data/blob/main/src/config/images-scraped.ts">src/config/images-scraped.ts</a> and the configuration for manually added data can be seen in this file: <a className="" href="https://github.com/alfonsusac/kawaii-logos-data/blob/main/src/config/images-manual.ts">src/config/images-manual.ts</a>. You can use these to know which informations are needed or can be provided to the website.</p> 
        
        <h3 className="pt-4 text-theme-stronger text-lg">Improvement to the site?</h3>

        <p className="">If you have any feature requests for this website please head out to <a className="" href="https://github.com/alfonsusac/service-title-logo">service-title-logo&apos;s GitHub repository</a> instead and <a className="https://github.com/alfonsusac/service-title-logo/issues">create an issue</a> there. Its different, one is for the front-end, and the other is for the data collection.</p>

      </div>
    </>
  )
}