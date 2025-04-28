import { getCategories } from '@/lib/registry';
import { ComponentShowcase } from './component-showcase';
import { Suspense } from 'react';

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="w-full mx-auto flex flex-col min-h-svh py-8 gap-8">
      <Suspense
        fallback={
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-8 w-48 bg-muted animate-pulse rounded-md"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className="h-64 bg-muted animate-pulse rounded-md"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        }
      >
        <ComponentShowcase categories={categories} />
      </Suspense>
    </div>
  );
}
