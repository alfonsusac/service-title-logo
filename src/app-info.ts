export const appName = "Kawaii Service Logos" as const

export const appDescription = "A collection of service/brand logos with the VTuber style made by various artists." as const

export const canonicalUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000" as const
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${ process.env.VERCEL_PROJECT_PRODUCTION_URL }` as const
      : `https://kawaiilogos.alfon.dev` as const