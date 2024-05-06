import { IconParkSolidTwitter, UimGithubAlt } from "./[author]/page"

export default function Footer() {
  return (
    <footer className="my-20 py-16 bg-theme-card rounded-3xl flex flex-col items-center justify-center text-base md:text-sm px-6 font-display tracking-widest text-center">
      <p className="text-pretty text-2xl">
        All rights reserved to the respective artists ©{" "}
        {new Date().getFullYear()}
      </p>
      <p className="text-pretty">Contributions are welcome!</p>
      <div className="flex gap-2 text-4xl md:text-2xl mt-4">
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
      </div>
    </footer>
  )
}