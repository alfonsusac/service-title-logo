// From 
// https://github.com/alfonsusac/kawaii-logos-data/blob/main-2-data/types.ts

export type KawaiiLogoData = {
  updatedAt: string,
  data: {
    authorCount: number,
    imageCount: number,
    authors: AuthorOutput[],
    standardLicenses: StandardLicenseOut,
  }
}

export namespace KawaiiLogoData {
  export type Data = KawaiiLogoData[ 'data' ]
}


export namespace AuthorOutput {
  export type Links = AuthorOutput[ 'links' ]
  export type SocialLinks = AuthorOutput[ 'links' ][ 'socials' ]
  export type PersonalSites = AuthorOutput[ 'links' ][ 'personalsites' ]
  export type Socials = AuthorOutput[ 'social' ]
  export type Entries = AuthorOutput[ 'entries' ]
  export type EntryItem = AuthorOutput[ 'entries' ][ number ]
  export type EntryItemImages = AuthorOutput.EntryItem[ 'images' ]
}

export type AuthorOutput = {
  id: string,
  displayName: string,
  pfp?: string,
  social: {
    github?: {
      username: string,
      url: string,
    },
    x?: {
      username: string,
      url: string,
    },
    bsky?: {
      username: string,
      url: string,
    },
    site?: string,
  },
  links: {
    socials: {
      type: "github" | "x" | "bsky",
      username: string,
      url: string,
    }[],
    personalsites: string[],
  }
  entries: {
    id: string,
    title: string,
    imageCount: number,
    images: {
      src: string,                  // for <img> source
      srcUrlType: UrlType,
      references: Reference[],        // where the image was found, for linking back to the source
      label: string,
      style?: {
        objectFit?: "cover" | "contain"
      }
    }[],
    references: Reference[],
    license: License
  }[],
  licenses: License[],
  references: Reference[],
}








export type UrlType =
  | "github-repo-text-content"
  | "github-blob"
  | "github-raw"
  | "github-camo"
  | "github-unknown"
  | "gist-raw"
  | "gist-page"
  | "google-drive"
  | "twitter-post"
  | "bsky-post"
  | "unknown"


export type Reference = {
  url: string
  urlType: UrlType,
  dateAccessed?: string,
}

export type License = {
  reference?: Reference, // where the information was gathered
  label: string,
} & (
    | { type: "unknown" }
    | { type: "custom", href: string }
    | { type: "standard", id: StandardLicenseType }
  )

export type StandardLicenseType =
  | "MIT"
  | "CC BY-NC-SA 4.0"
  | "CC BY-SA 4.0"
  | "CC0-1.0"

export type StandardLicenseOut = Record<StandardLicenseType, StandardLicenseMeta>

export type StandardLicenseMeta = {
  label: string,
  href: string, // link to the definitive license text
  // Public restrictions are not absolute—they are default rules, not universal limits
  // These are for non-custom licenses, this is just informational and may be inaccurate
  permissions: {
    use: Permission,
    modify: Permission, // 
    distribute: Permission, // Distribution implies someone else can access your copy.
    commercial: Permission,
    misc: {
      liability: Permission,
      trademark: Permission,
    }
    conditions: {
      sale_requires_modification: Condition,
      disclose_source: Condition,
      state_changes: Condition,
      include_license: Condition,
      include_copyright: Condition,
      give_credit: Condition,
    }
  }
}

type Permission = "allowed" | "disallowed" | "depends"
type Condition = "required" | "recommended" | "not needed"