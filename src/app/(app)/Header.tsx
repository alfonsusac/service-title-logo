import { UpdatedAt } from "@/components/updated-at"
import { cn } from "lazy-cn"

export function Header() {
  return (
    <>
      <h1 className={cn(
        "text-center text-5xl font-display tracking-wider text-theme-stronger relative z-[1] text-pretty mb-2",
        // "transition-[opacity,translate] duration-300 ease-in-out",
        // "starting:opacity-0 starting:translate-y-2",
        // "delay-150"
        ""

      )}>
        VTuber Service Logo
      </h1>
      <p className={cn(
        "text-center font-display tracking-widest text-xl text-pretty",
        ""

      )}>
        A collection of service logos with the VTuber style.
      </p>
      <p className="text-center font-display tracking-widest text-xl text-pretty mt-1 ">
        Last updated:{' '}<UpdatedAt />
      </p>
    </>
  )
}