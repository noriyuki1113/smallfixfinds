import type { ReactNode } from "react";

export const metadata = {
  title: "Small Fix Finds | Small problems. Smart little fixes.",
  description: "Small-space fixes for renters and compact homes. Check what fits before you buy.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", maxWidth: 760, margin: "24px auto", padding: "0 16px", lineHeight: 1.6, color: "#222" }}>
        <header style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "baseline", borderBottom: "1px solid #e5e5e5", paddingBottom: 12 }}>
          <a href="/" style={{ fontWeight: 700, fontSize: 20, color: "inherit", textDecoration: "none" }}>Small Fix Finds</a>
          <nav style={{ display: "flex", gap: 14 }}>
            <a href="/">Home</a>
            <a href="/guides">Guides</a>
            <a href="/collections">Collections</a>
            <a href="/items">Finds</a>
            <a href="/about">About</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer style={{ marginTop: 56, borderTop: "1px solid #e5e5e5", paddingTop: 16, color: "#555", fontSize: 14 }}>
          <p><strong>Small Fix Finds</strong><br />
          Independent curation—not affiliated with any retailer. Prices and availability can change. Affiliate links are clearly labeled when active.</p>
          <p><a href="/about">Research &amp; disclosures</a> · <a href="/privacy">Privacy</a></p>
          <p>Research first. Buy only if it fits.</p>
        </footer>
      </body>
    </html>
  );
}
