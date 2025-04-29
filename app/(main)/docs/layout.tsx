import type React from 'react';
import { Header } from './header';
import { Sidebar } from './sidebar';
import { TableOfContents } from './toc';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Header - only visible on mobile */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <Header />
      </div>

      {/* Main layout with grid system for desktop */}
      <div className="relative min-h-screen pt-12 lg:pt-6 lg:grid lg:grid-cols-[220px,minmax(0,1fr),240px] gap-0">
        {/* Sidebar - fixed on the left */}
        <Sidebar />

        {/* Main content area */}
        <main className="lg:col-start-2">
          <div className="pb-16">
            {/* Content container */}
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
              {children}
            </div>
          </div>
          {/*<Footer border={true} /> */}
        </main>
        {/* Table of contents column - only visible on xl screens */}
        <TableOfContents className="hidden xl:block mt-2" />

      </div>
    </>
  );
}
