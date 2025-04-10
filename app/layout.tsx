import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Hanken_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import config from '@/app/config';
import { doge } from './doge';
import { Header } from './header';
import Link from 'next/link';
import { GitHubStars } from './github-stars';
import ScrambleIn from "@/registry/ui/scramble-in";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

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
        url: `${config.url}/icon.webp`,
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
        url: `${config.url}/icon.webp`,
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
      { url: '/icons/16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icons/96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/icons/144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icons/152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/384x384.png', sizes: '384x384', type: 'image/png' },
      { url: '/icons/512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/icons/152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/512x512.png',
        color: '#4E90F9',
      },
    ],
  },
  metadataBase: new URL(config.url),
  verification: {
    google: 'your-google-site-verification', // Add your Google verification code
  },
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
            __html: `(${doge.toString()})();`,
          }}
        />
        <link
          rel="icon"
          href="/icons/16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link rel="mask-icon" href="/icons/16x16.png" color="#4E90F9" />
      </head>
      <body className={`${hankenGrotesk.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative min-h-screen">
            {/* Top left corner */}
            <Link 
              href="/getting-started" 
              className="fixed top-6 left-6 hidden sm:block"
            >
              <ScrambleIn 
                text="Getting Started"
                className="text-2xl font-bold hover:underline hover:decoration-2"
                scrambledClassName="text-2xl font-bold hover:underline hover:decoration-2"
                scrambleSpeed={30}
                scrambledLetterCount={2}
                useIntersectionObserver={true}
                retriggerOnIntersection={true}
              />
              {" "}🚀
            </Link>

            {/* Top right corner */}
            <div className="fixed top-6 right-6 flex items-center gap-2 hidden sm:flex">
              <GitHubStars 
                repo="pprunty/deltacomponents.dev"
                className="text-2xl font-bold"
              />
              <Link 
                href="https://github.com/pprunty/deltacomponents.dev" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-bold hover:underline hover:decoration-2 flex items-center gap-1"
              >
                <ScrambleIn 
                  text="GitHub"
                  className="text-2xl font-bold hover:underline hover:decoration-2"
                  scrambledClassName="text-2xl font-bold hover:underline hover:decoration-2"
                  scrambleSpeed={30}
                  scrambledLetterCount={2}
                  useIntersectionObserver={true}
                  retriggerOnIntersection={true}
                />
                <ArrowUpRight size={16} weight="bold" />
              </Link>
            </div>

            {/* Main content */}
            <main className="max-w-3xl md:mx-auto px-4 pt-20 pb-32 sm:pb-20 flex flex-col items-center justify-center min-h-screen">
              <Header />
              {children}
            </main>

            {/* Bottom links - footer style on mobile, fixed on desktop */}
            <div className="w-full flex justify-between my-8 px-4 sm:px-0">
              <Link 
                href="https://patrickprunty.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="sm:fixed relative sm:bottom-6 sm:left-6 flex items-center gap-1"
              >
                <ScrambleIn 
                  text="Patrick Prunty"
                  className="text-lg sm:text-2xl font-bold hover:underline hover:decoration-2"
                  scrambledClassName="text-lg sm:text-2xl font-bold hover:underline hover:decoration-2"
                  scrambleSpeed={30}
                  scrambledLetterCount={2}
                  useIntersectionObserver={true}
                  retriggerOnIntersection={true}
                />
                <ArrowUpRight size={16} weight="bold" />
              </Link>
              <Link 
                href="https://www.buymeacoffee.com/patrickprunty" 
                target="_blank"
                rel="noopener noreferrer"
                className="sm:fixed relative sm:bottom-6 sm:right-6 flex items-center gap-1"
              >
                <ScrambleIn 
                  text="Buy Me A Coffee"
                  className="text-lg sm:text-2xl font-bold hover:underline hover:decoration-2"
                  scrambledClassName="text-lg sm:text-2xl font-bold hover:underline hover:decoration-2"
                  scrambleSpeed={30}
                  scrambledLetterCount={2}
                  useIntersectionObserver={true}
                  retriggerOnIntersection={true}
                />
                <ArrowUpRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
