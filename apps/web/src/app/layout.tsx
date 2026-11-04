// apps/web/src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { BrowserProvider } from "@/context/BrowserContext";

export const metadata: Metadata = {
  title: "Small Web Browser",
  description: "A browser for the small web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BrowserProvider>
          {children}
        </BrowserProvider>
      </body>
    </html>
  );
}
