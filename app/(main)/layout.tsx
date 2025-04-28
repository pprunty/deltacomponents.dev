import type React from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import Footer from '@/delta/components/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="relative min-h-screen">
        <Header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" />
        {/* Main content */}
        <Sidebar className="z-40" />
        <div className="md:pl-72">
          <div className="max-w-3xl mx-auto px-4 pt-20 pb-32 sm:pb-20">
            {children}
          </div>
          <Footer border={true} />
        </div>
      </main>
    </>
  );
}
