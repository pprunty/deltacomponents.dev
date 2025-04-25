import { BackButton } from '@/delta/components/back-button';
import ShareButton from '@/delta/components/share-button';
import { ScrollToTopButton } from './scroll-to-top-button';
import Float from "@/delta/components/floating-button";
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
        <BackButton variant="outline" />
      </Float>

      {/* Share Button (still server-side) */}
      <Float placement="bottom-right" offset={{ x: 64, y: 16 }}>
        <ShareButton variant="outline" className="p-3" />
      </Float>

      {/* Scroll-to-Top: rendered by our Client Component */}
      <ScrollToTopButton />
    </div>
  );
}
