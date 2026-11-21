import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Small Fix Finds | Small problems. Smart little fixes.",
  description: "Small-space fixes for renters and compact homes. Check what fits before you buy.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a href="/" className="brand">Small Fix Finds</a>
          <nav className="site-nav">
            <a href="/">Home</a>
            <a href="/guides">Guides</a>
            <a href="/collections">Collections</a>
            <a href="/items">Finds</a>
            <a href="/about">About</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <p><strong>Small Fix Finds</strong><br />
          Independent curation—not affiliated with any retailer. Prices and availability can change. Affiliate links are clearly labeled when active.</p>
          <p><a href="/about">Research &amp; disclosures</a> · <a href="/privacy">Privacy</a></p>
          <p>Research first. Buy only if it fits.</p>
        </footer>
      </body>
    </html>
  );
}
