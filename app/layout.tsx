import type React from 'react'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from '@/components/ui/sonner'
import { siteData } from '@/lib/site'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteData.url),
  title: siteData.title,
  description: siteData.description,
  applicationName: siteData.title,
  referrer: 'origin-when-cross-origin',
  keywords: [
    'typescript',
    'javascript',
    'nextjs',
    'react',
    'tailwindCSS',
    'vercel',
  ],
  openGraph: {
    title: siteData.title,
    description: siteData.description,
    url: siteData.url,
    siteName: siteData.title,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteData.title,
    description: siteData.description,
    creator: siteData.socialHandle,
    site: siteData.socialHandle,
  },
  appleWebApp: {
    capable: true,
    title: siteData.title,
    startupImage: siteData.ogImage,
    statusBarStyle: 'default',
  },
  verification: {},
  appLinks: {},
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020618' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col font-mono`}
      >
        <main className="flex flex-1 flex-col">{children}</main>
        <Toaster richColors position="bottom-center" />
        <Analytics />
      </body>
    </html>
  )
}
