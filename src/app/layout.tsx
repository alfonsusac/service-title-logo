import type { Metadata } from "next";
import { Inconsolata, Inter, Jua, Lilita_One, Reddit_Mono, Roboto_Mono, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-sans'
});

const mono = Source_Code_Pro({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-mono'
});

const display = Jua({
  weight: ['400'],
  subsets: ["latin"],
  variable: '--font-display'
});

export const metadata: Metadata = {
  title: "VTuber Service Icons",
  description: "See all the VTuber-styled service icons made by artists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} ${display.variable} bg-[#fdfdff]`}>
        {children}
      </body>
    </html>
  );
}
