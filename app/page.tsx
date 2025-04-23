import Link from 'next/link';
import { getCategories } from '@/lib/registry';
import { ComponentShowcase } from './component-showcase';
import { Suspense } from 'react';

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="w-full mx-auto flex flex-col min-h-svh py-8 gap-8">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="sm:text-5xl text-4xl font-bold text-center">
          Delta Components
        </h1>
        <p className="hidden sm:block text-sm sm:text-md text-center text-muted-foreground max-w-xs sm:max-w-md">
         If you don&apos;t know how the heck to use these component, follow the{' '}
         <Link
           href="/getting-started"
           className="text-muted-foreground underline underline-offset-4 decoration-1 decoration-muted-foreground/30 transition-all duration-300 ease-in-out hover:text-primary hover:decoration-primary"
         >
           Getting Started
         </Link>
         {' '}guide.
        </p>
      </div>

      <Suspense fallback={<div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-8 w-48 bg-muted animate-pulse rounded-md"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-64 bg-muted animate-pulse rounded-md"></div>
              ))}
            </div>
          </div>
        ))}
      </div>}>
        <ComponentShowcase categories={categories} />
      </Suspense>
    </div>
  );
}