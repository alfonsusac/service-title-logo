import type { Metadata } from "next"
import { Inconsolata, Inter, Jua, Lilita_One, Reddit_Mono, Roboto_Mono, Source_Code_Pro } from "next/font/google"
import "./globals.css"
import { ViewTransitions } from "next-view-transitions"
import { ThemeProvider } from "next-themes"
import { themes } from "./themes"
import { Toaster } from "react-hot-toast"

const sans = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-sans'
})

const mono = Source_Code_Pro({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-mono'
})

const display = Jua({
  weight: ['400'],
  subsets: ["latin"],
  variable: '--font-display'
})

export const metadata: Metadata = {
  title: "VTuber Service Icons",
  description: "See all the VTuber-styled service icons made by artists.",
  metadataBase: new URL('https://service-title-logo.vercel.app/')
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`${ sans.variable } ${ mono.variable } ${ display.variable } bg-theme-bg text-theme-text transition-all`}>
          <ThemeProvider themes={themes} attribute="class">
            <Toaster
              containerClassName="font-display tracking-wider text-lg"
              position="bottom-right"
              toastOptions={{
                className: '!bg-theme-card text-theme-text bg-red-500 !px-4',
                duration: 100000,
                style: {
                  background: 'var(--card)',
                  color: 'var(--text)',
                  viewTransitionName: `toast`,
                },
              }}
            />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
