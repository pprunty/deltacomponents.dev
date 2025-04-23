import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Hanken_Grotesk } from "next/font/google"
import { themeEffect } from '@/components/theme-effect';
import config from '@/app/config';
import { doge } from './doge';
import { Header } from './header';
import { Sidebar } from './sidebar';
import Footer from '@/delta/components/footer';
// import { GitHubStars } from './github-stars';
import ClientComponents from './client';

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: `${config.companyName}`,
  description: `${config.companyDescription}`,
  keywords: [
    'React components',
    'UI library',
    'Web development',
    'Frontend development',
    'React UI',
    'Design system',
    'Component library',
    'shadcn/ui',
    'TypeScript',
    'Next.js',
    'Modern UI',
    'Web components',
  ],
  manifest:
    process.env.NODE_ENV === 'production'
      ? '/manifest.prod.json'
      : '/manifest.json',
  alternates: {
    canonical: config.url,
  },
  authors: [{ name: config.author.name, url: config.author.url }],
  category: 'technology',
  openGraph: {
    title: `${config.companyName}`,
    description: `${config.companyDescription}`,
    url: config.url,
    siteName: config.companyName,
    images: [
      {
        url: `${config.url}/icon.svg`,
        width: 512,
        height: 512,
        alt: `${config.companyName} - Modern Component Library`,
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: config.socials.twitter,
    creator: config.socials.twitter,
    images: [
      {
        url: `${config.url}/icon.svg`,
        width: 512,
        height: 512,
        alt: `${config.companyName} - Modern Component Library`,
      },
    ],
    title: `${config.companyName}`,
    description: `${config.companyDescription}`,
  },
  icons: {
    icon: [
      { url: '/icons/16x16.svg', sizes: '16x16', type: 'image/png' },
      { url: '/icons/32x32.svg', sizes: '32x32', type: 'image/png' },
      { url: '/icons/72x72.svg', sizes: '72x72', type: 'image/png' },
      { url: '/icons/96x96.svg', sizes: '96x96', type: 'image/png' },
      { url: '/icons/128x128.svg', sizes: '128x128', type: 'image/png' },
      { url: '/icons/144x144.svg', sizes: '144x144', type: 'image/png' },
      { url: '/icons/152x152.svg', sizes: '152x152', type: 'image/png' },
      { url: '/icons/192x192.svg', sizes: '192x192', type: 'image/png' },
      { url: '/icons/384x384.svg', sizes: '384x384', type: 'image/png' },
      { url: '/icons/512x512.svg', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/120x120.svg', sizes: '120x120', type: 'image/png' },
      { url: '/icons/152x152.svg', sizes: '152x152', type: 'image/png' },
      { url: '/icons/180x180.svg', sizes: '180x180', type: 'image/png' },
    ]
  },
  metadataBase: new URL(config.url),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeEffect.toString()})();(${doge.toString()})();`,
          }}
        />
        <meta name="theme-color" content="#FFFEFC" />
        <link
          rel="icon"
          href="/icons/16x16.svg"
          sizes="16x16"
          type="image/png"
        />
        <link rel="mask-icon" href="/icons/16x16.svg" />
      </head>
      <body className={`${hankenGrotesk.variable} antialiased`}>
        <div className="relative min-h-screen">
          <Header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" />
          {/* Main content */}
          <Sidebar className="z-40" />
          <div className="md:pl-72">
            <main className="max-w-3xl mx-auto px-4 pt-20 pb-32 sm:pb-20">
              {children}
            </main>
            <Footer border={true} />
          </div>
          <ClientComponents />
        </div>
      </body>
    </html>
  )
}
