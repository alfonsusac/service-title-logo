import { withAxiom } from 'next-axiom';

/** @type {import('next').NextConfig} */
const nextConfig = withAxiom({
  serverExternalPackages: ["@takumi-rs/core"], 
});

export default nextConfig;
