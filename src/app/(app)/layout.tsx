import { authors } from "@/data/authors"
import Link from "next/link"

export default function GlobalLayout(props: any) {
  return (
    <div className="mx-auto max-w-screen-lg min-h-screen flex flex-col gap-8 font-mono tracking-tight text-slate-700 ">
      <div className="grow flex items-stretch">
        <div className="w-48 flex flex-col gap-px p-1 pt-48 rounded-lg">
          <div className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-200">
            <Link
              href={"/"}
              className="cursor-pointer text-sm leading-none -m-2 p-3 px-5 rounded-md font-medium text-slate-600 hover:bg-slate-300
              rounded-t-xl
              ">
              Home
            </Link>
            {
              Object.values(authors).map(author => {
                return (
                  <Link
                    key={author.name}
                    href={"/" + author.name}
                    className="cursor-pointer text-sm leading-none -m-2 p-3 px-5 rounded-md font-medium text-slate-600 hover:bg-slate-300
                  last:rounded-b-xl
                  ">
                    {author.name}
                  </Link>
                )
              })
            }
          </div>

        </div>
        <div className="grow overflow-auto pt-20 px-8 bg-white">
          {props.children}
        </div>
      </div>
    </div>
  )
}