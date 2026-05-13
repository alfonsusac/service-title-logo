export const canonicalUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000" as const
    : process.env.VERCEL_URL
      ? `https://${ process.env.VERCEL_URL }` as const
      : `https://kawaiilogos.alfon.dev` as const