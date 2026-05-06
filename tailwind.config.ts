import type { Config } from "tailwindcss";
import tailwindanimate from "tailwindcss-animate"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        display: ['var(--font-display)'],
      },
      colors: {
        theme: {
          bg: 'var(--bg)', 
          card: 'var(--card)',
          cardHover: 'var(--cardHover)',
          text: 'var(--text)',
          strong: 'var(--strong)',
          stronger: 'var(--stronger)',
        },
      }
    },
  },
  plugins: [tailwindanimate],
  darkMode: 'class',
};
export default config;
