import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import config from '@/app/config';
import { doge } from './doge';
import { Header } from './header';
import Footer from './footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Added weights including semibold (600)
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['400', '600'], // Added regular and semibold weights
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  themeColor: 'transparent',
};

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="max-w-3xl mx-auto px-4 justify-center sm:px-12 mt-4 sm:mt-8 min-h-screen">
            <Header />
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}