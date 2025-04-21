import "../styles/globals.css";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SITE_DATA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import {
  AuthProvider,
  ClientProvider,
  ThemeProvider,
  ActiveThemeProvider,
} from "@/providers";

export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_DATA.url),
  title: SITE_DATA.title,
  description: SITE_DATA.description,
  applicationName: SITE_DATA.title,
  referrer: "origin-when-cross-origin",
  keywords: [
    "typesctipt",
    "javascript",
    "next.js",
    "react",
    "tailwindcss",
    "shadcn/ui",
    "vercel",
    "aws-s3",
    "upstash-redis",
    "tanstack-query",
    "clerk",
    "togehter.ai",
  ],
  icons: {
    icon: {
      url: "/icons/icon.png",
      sizes: "192x192",
      type: "image/png",
    },
    apple: {
      url: "/icons/apple-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: {
      rel: "icon",
      url: "/icons/icon.svg",
      type: "image/svg+xml",
    },
  },
  openGraph: {
    type: "website",
    title: SITE_DATA.title,
    description: SITE_DATA.description,
    url: SITE_DATA.url,
    siteName: SITE_DATA.title,
    locale: SITE_DATA.locale,
    images: { url: SITE_DATA.og, alt: SITE_DATA.og },
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DATA.title,
    description: SITE_DATA.description,
    creator: SITE_DATA.handle,
    site: SITE_DATA.handle,
    images: { url: SITE_DATA.og, alt: SITE_DATA.og },
  },
  verification: {},
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020618" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ClientProvider>
        <html lang='en' suppressHydrationWarning>
          <body
            className={cn(
              dmSans.variable,
              geistMono.variable,
              "font-sans antialiased"
            )}
            suppressHydrationWarning
          >
            <ThemeProvider>
              <ActiveThemeProvider>
                <main>{children}</main>
                <Toaster richColors position='bottom-center' />
              </ActiveThemeProvider>
            </ThemeProvider>
            <Analytics />
          </body>
        </html>
      </ClientProvider>
    </AuthProvider>
  );
}
