/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: export plain HTML so it can be served by Cloudflare Pages
  // as static files (no server features are used anywhere in this codebase).
  output: "export",
  trailingSlash: true,
};
export default nextConfig;
