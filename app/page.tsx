import Link from 'next/link';
import { getCategories } from '@/lib/registry';
import { ComponentShowcase } from './component-showcase';
import { SearchComponent } from './search-component';

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="w-full mx-auto flex flex-col min-h-svh py-8 gap-8">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="sm:text-5xl text-4xl font-bold text-center">
          Delta Components
        </h1>
        <p className="hidden sm:block text-sm sm:text-md text-center text-muted-foreground max-w-xs sm:max-w-md">
         If you don't know how the heck to use these component, follow the{' '}
         <Link
           href="/getting-started"
           className="text-muted-foreground underline underline-offset-4 decoration-1 decoration-muted-foreground/30 transition-all duration-300 ease-in-out hover:text-primary hover:decoration-primary"
         >
           Getting Started
         </Link>
         {' '}guide.
        </p>
        <SearchComponent className="mt-4" />
      </div>

      <ComponentShowcase categories={categories} />
    </div>
  );
}