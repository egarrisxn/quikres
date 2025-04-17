import type { Metadata, Viewport } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { neobrutalism } from "@clerk/themes";
import { siteData, siteUrl } from "@/lib/site";
import { Toaster } from "@/components/ui/sonner";
import { ClientProvider } from "./client-provider";
import { ThemeProvider } from "next-themes";
import { ActiveThemeProvider } from "@/components/active-theme";
import { cn } from "@/lib/utils";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteData.url),
  title: siteData.title,
  description: siteData.description,
  applicationName: siteData.title,
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
  openGraph: {
    title: siteData.title,
    description: siteData.description,
    url: siteData.url,
    siteName: siteData.title,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteData.title,
    description: siteData.description,
    creator: siteData.socialHandle,
    site: siteData.socialHandle,
  },
  appleWebApp: {
    capable: true,
    title: siteData.title,
    startupImage: siteData.ogImage,
    statusBarStyle: "default",
  },
  verification: {},
  appLinks: {},
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
        layout: {
          logoImageUrl: `${siteUrl}/icon.png`,
          logoLinkUrl: `${siteUrl}`,
          // privacyPageUrl: `${siteUrl}/privacy`,
          unsafe_disableDevelopmentModeWarnings: true,
        },
        variables: {
          colorPrimary: "#5294ff",
          colorText: "#000000",
          colorInputBackground: "#e5e7eb",
        },
      }}
    >
      <ClientProvider>
        <html suppressHydrationWarning lang='en'>
          <body
            suppressHydrationWarning
            className={cn(
              dmSans.variable,
              geistMono.variable,
              "flex min-h-screen flex-col font-sans"
            )}
          >
            <ThemeProvider attribute='class' disableTransitionOnChange>
              <ActiveThemeProvider>
                <main className='flex flex-1 flex-col'>{children}</main>
                <Toaster richColors position='bottom-center' />
              </ActiveThemeProvider>
            </ThemeProvider>
            <Analytics />
          </body>
        </html>
      </ClientProvider>
    </ClerkProvider>
  );
}
