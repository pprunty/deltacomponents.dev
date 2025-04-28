import { BackButton } from '@/delta/components/back-button';
import ShareButton from '@/delta/components/share-button';
import { ScrollToTopButton } from './scroll-to-top-button';
import Float from '@/delta/components/floating-button';
// import { TableOfContents } from './toc';
// import { cn } from "@/lib/utils";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="container relative max-w-4xl">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {children}
      </div>

      {/* Back Button (still server-side) */}
      <Float placement="bottom-left" offset={16} position="fixed">
        <BackButton className="px-2 py-2 shadow-2xl rounded-lg border dark:border-[#313131] border-gray-200 bg-gray-200 dark:bg-[#313131] hover:bg-gray-300 dark:hover:bg-[#424242] active:bg-gray-300 dark:active:bg-[#242424] opacity-80 pointer-events-auto z-50 transition-[background-color]" />
      </Float>

      {/* Share Button (still server-side) */}
      <Float placement="bottom-right" offset={{ x: 64, y: 16 }}>
        <ShareButton className="px-2 py-2 shadow-2xl rounded-lg border dark:border-[#313131] border-gray-200 bg-gray-200 dark:bg-[#313131] hover:bg-gray-300 dark:hover:bg-[#424242] active:bg-gray-300 dark:active:bg-[#242424] opacity-80 pointer-events-auto z-50 transition-[background-color]" />
      </Float>

      {/* Scroll-to-Top: rendered by our Client Component */}
      <ScrollToTopButton />
    </div>
  );
}
