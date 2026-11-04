// apps/web/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BrowserProvider } from "@/context/BrowserContext";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <BrowserProvider>
          {children}
        </BrowserProvider>
      </body>
    </html>
  );
}