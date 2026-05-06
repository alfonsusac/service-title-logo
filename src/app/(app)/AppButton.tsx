import { cn } from "lazy-cn"

export function button(...args: any[]) {
  return cn(
    'p-4 px-5 transition-all duration-100 text-xl rounded-xl hover:bg-theme-card',
    'flex items-center justify-center gap-2',
    ...args)
}