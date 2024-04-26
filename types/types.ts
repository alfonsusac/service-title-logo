export type DataImage = {
  title: string
  src: string // displayed as thumbnail
  author: Author
  raw?: string // "source" link or something
  createdAt?: Date
  className?: string
}
export type Author = {
  name: string
  pfp?: string
  link: {
    github?: string
    twitter?: string
  }
  repository?: string
  license: {
    label?: string
    href?: string
  }
}