import { cn } from "lazy-cn"
import type { ComponentProps } from "react"
import ago from "s-ago"
import { UimGithubAlt, IconParkSolidTwitter, IcBaselineDiscord } from "../app/(app)/Icons"
import { fetchUpdatedAt } from "../app/(app)/data"

export default function Footer(props: ComponentProps<"footer">) {
  return (
    <footer {...props} className={cn(
      // "bg-theme-card rounded-3xl",
      "my-20 py-16  flex flex-col items-center justify-center text-base md:text-sm px-6 font-display tracking-widest",
      "starting-bottom-fade-in-2",
      props.className
    )}>
      <section className="flex flex-col items-center">


        <h1 className="text-center text-2xl font-display tracking-wider text-theme-strong relative z-[1] text-pretty">
          VTuber Service Logo
        </h1>
        <p className="text-center text-base text-pretty">
          A collection of service logos with the VTuber style.
        </p>
        <p className="text-pretty text-base mt-6">
          All artwork belongs to their respective artists.
        </p>
        <p className="text-center text-base text-pretty">
          Last updated:{' '}<UpdatedAt />
        </p>

        <div className="flex gap-2 text-2xl md:text-2xl mt-4">
          <a
            className="text-theme-strong hover:underline"
            href={"https://github.com/alfonsusac/service-title-logo"}
            target="_blank"
          >
            <UimGithubAlt className="inline" />
          </a>
          <a
            className="text-theme-strong hover:underline"
            href={"https://twitter.com/alfonsusac"}
            target="_blank"
          >
            <IconParkSolidTwitter className="inline" />
          </a>
          <a
            className="text-theme-strong hover:underline"
            href={"https://discord.gg/hb9TapzhQe"}
            target="_blank"
          >
            <IcBaselineDiscord className="inline" />
          </a>
        </div>
      </section>
    </footer>
  )
}

export async function UpdatedAt() {
  const updatedAt = await fetchUpdatedAt()
  return ago(new Date(updatedAt))
}