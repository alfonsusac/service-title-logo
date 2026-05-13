import { appName } from "@/app-info"
import { ArticlePage, ArticleProse, ArticleTitle } from "@/components/article-page"
import type { Metadata } from "next"
import { Link } from "next-view-transitions"

export const metadata: Metadata = {
  title: "Request",
  description: "Request a logo to be added or suggest an improvement to the website",
}
export default function RequestPage() {

  return (
    <ArticlePage>
      <ArticleTitle title="Feature Request" />
      <ArticleProse>
        <p>
          I only have time to work on this project during the weekends, so if you have any feature or logo requests, I will appreciate it if you can create an issue on the respective GitHub repository. You can also reach me out on Discord by joining <a href="https://discord.gg/hb9TapzhQe" target="_blank">our Discord server.</a>
        </p>

        <h3>
          Want to add your logo here?
        </h3>

        <p>
          You can reach out to <a href="https://github.com/alfonsusac/kawaii-logos-data" target="_blank">kawaii-logos-data&apos;s GitHub repository</a> to <a href="https://github.com/alfonsusac/kawaii-logos-data/issues" target="_blank">create an issue</a> and let me know the link to your github repository or just any kinds of links that has transparent images.
        </p>

        <p>
          If you have a collection of images that are stored in GitHub, I can also help you to automate the process of adding your images to the website. Just let me know the link to your repository and I will take care of the rest.
        </p>

        <h3 className="">
          Improvement to the site?
        </h3>

        <p className="">
          If you have any feature requests for this website please head out to <a href="https://github.com/alfonsusac/service-title-logo" target="_blank">service-title-logo&apos;s GitHub repository</a> instead and <a className="https://github.com/alfonsusac/service-title-logo/issues" target="_blank">create an issue</a> there. Its different, one is for the front-end, and the other is for the data collection.
        </p>

        <p>
          Or just ask me anything on <a href="https://discord.gg/hb9TapzhQe" target="_blank" >my discord</a>
        </p>

      </ArticleProse>
    </ArticlePage>
  )
}