import ago from "s-ago"

export function Header(props: {
  updatedAt: string
}) {
  return (
    <>
      <h1 className="text-center text-5xl font-display tracking-wider text-theme-stronger relative z-[1] text-pretty mb-2">VTuber Service Logo</h1>
      <p className="text-center font-display tracking-widest text-xl text-pretty">A collection of service logos with the VTuber style.</p>
      <p className="text-center font-display tracking-widest text-xl text-pretty mt-1">Last updated:{' '}{ago(new Date(props.updatedAt))}</p>
    </>
  )
}