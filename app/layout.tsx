import type { ReactNode } from "react";

export const metadata = {
  title: "Small Fix Finds",
  description: "Small problems. Smart little fixes. Small-space fixes for renters and compact homes. Check what fits before you buy.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "24px auto", padding: "0 16px", lineHeight: 1.6 }}>
        <header><strong>Small Fix Finds</strong> — Small problems. Smart little fixes.</header>
        <main>{children}</main>
        <footer style={{ marginTop: 48, color: "#555", fontSize: 14 }}>
          As an Amazon Associate I earn from qualifying purchases.
        </footer>
      </body>
    </html>
  );
}
