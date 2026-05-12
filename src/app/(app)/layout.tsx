import SidebarMobile, { } from "./SidebarMobile"
import Footer from "../../components/footer"
import { sidebar, SidebarContent, SidebarContentAuthorList } from "./Sidebar"
import { Suspense } from "react"
import { SidebarSeparator } from "./SidebarItem"
import { cn } from "lazy-cn"
import { fetchAuthors } from "./data"
import { refresh, revalidatePath, updateTag } from "next/cache"
import { button } from "./AppButton"
import { Breadcrumb } from "@/components/breadcrumb"

export default async function GlobalLayout(props: any) {
  const authors = await fetchAuthors()

  return (
    <div >
      <Suspense>
        <SidebarMobile />
      </Suspense>
      {/* Centered content */}
      <div className={cn(
        "grow flex",
        "max-w-screen-lg",
        "mx-auto"
      )}>
        <div className="hidden md:flex flex-none flex-col md:w-48 gap-px relative z-20">
          {/* Floating sidebar */}
          <div className="fixed md:w-48 top-0 max-h-screen flex flex-col h-[100svh]">
            {/* Sidebar list */}
            <div className={sidebar("flex-none h-full my-2 mt-0 pb-0 overflow-hidden rounded-none block ")}>
              <SidebarContent />
              <SidebarSeparator />
              <div className="overflow-auto overscroll-contain -m-2 p-2 h-0 grow pb-6 -mr-6 pr-6 -ml-3 pl-3 -mt-3 pt-3 flex flex-col gap-3" >
                <SidebarContentAuthorList authors={authors} />
              </div>
            </div>
            {/* Left grey padding */}
            <div className="bg-theme-card absolute right-0 w-[999rem] h-[999rem] origin-right -z-10" />
          </div>
        </div>
        {/* Tab content */}
        <div className="grow ">

          {/* Top Bar */}
          <div className="hidden md:flex px-4 md:px-8 w-full h-12 items-center tracking-wider sticky top-0 bg-theme-bg z-20 ">
            <Breadcrumb />

            {process.env.NODE_ENV === "development" &&
              <button onClick={async () => {
                "use server"
                revalidatePath("/")
                updateTag("all")
                refresh()
              }}
                className={button("p-2 px-4 ml-4 text-sm bg-theme-text/10 cursor-pointer")}
              >Revalidate</button>
            }
          </div>


          <main className="px-4 md:px-8 pt-30 md:pt-20">
            {props.children}
          </main>

          <div className="px-4 md:px-8">
            <Footer />
          </div>
        </div>
      </div>
    </div >
  )
}