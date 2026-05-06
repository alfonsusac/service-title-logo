import type { Metadata } from "next"
import { Gamja_Flower, Inter, Jua, Source_Code_Pro } from "next/font/google"
import "./globals.css"
import { ViewTransitions } from "next-view-transitions"
import { ThemeProvider } from "next-themes"
import { themes } from "./themes"
import { Toaster } from "react-hot-toast"
import { AxiomWebVitals } from "next-axiom"
import { NuqsAdapter } from 'nuqs/adapters/next/app'


// const sans = Inter({
//   subsets: [ "latin" ],
//   display: 'swap',
//   variable: '--font-sans'
// })
const sans = Gamja_Flower({
  subsets: [ "latin" ],
  display: 'swap',
  variable: '--font-sans',
  weight: [ '400' ]
})

const mono = Source_Code_Pro({
  subsets: [ "latin" ],
  display: 'swap',
  variable: '--font-mono'
})

const display = Jua({
  weight: [ '400' ],
  subsets: [ "latin" ],
  variable: '--font-display'
})
// alternatiev: Comic Relief

export const metadata: Metadata = {
  title: "VTuber Service Icons",
  description: "See all the VTuber-styled service icons made by artists.",
  metadataBase: new URL('https://vtuberlogos.alfon.dev/')
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <ViewTransitions>
        <html lang="en" suppressHydrationWarning>
          <AxiomWebVitals />
          <body className={`${ sans.variable } ${ mono.variable } ${ display.variable } bg-theme-bg text-theme-text transition-all font-display`}>
            <ThemeProvider themes={themes} attribute="class">
              <NuqsAdapter>
                <AppToaster />
                {children}
              </NuqsAdapter>
            </ThemeProvider>
          </body>
        </html>
      </ViewTransitions>
    </>
  )
}

function AppToaster() {
  return (
    <Toaster
      containerClassName="font-display tracking-wider text-lg"
      position="bottom-right"
      toastOptions={{
        className: "!bg-theme-card text-theme-text bg-red-500 !px-4",
        style: {
          background: "var(--card)",
          color: "var(--text)",
          viewTransitionName: `toast`,
        },
      }}
    />
  )
}