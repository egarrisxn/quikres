import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SITE_DATA } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { dmSans, geistMono } from "@/fonts";
import {
  AuthProvider,
  ClientProvider,
  ThemeProvider,
  ActiveThemeProvider,
} from "@/providers";
import "../styles/globals.css";

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
            className={cn(dmSans.variable, geistMono.variable)}
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
