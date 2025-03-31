import Link from 'next/link';
import { Badge } from '@/components/badge';
import { getCategories, getRegistryInfo } from '@/lib/registry';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

export default async function Home() {
  const categories = await getCategories();
  const registryInfo = getRegistryInfo();
  const GITHUB_REPO_URL = 'https://github.com/pprunty/deltacomponents.dev';

  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-svh py-8 gap-8">

      <main className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.title} className="flex flex-col gap-4">
            <h2 className="text-md font-serif font-normal italic text-muted-foreground">
              {category.title}
            </h2>

            <div className="flex flex-col space-y-2">
              {category.items.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <Link
                    href={`/docs/${item.name}`}
                    className="text-[15px] decoration-1 font-medium underline underline-offset-4 decoration-wavy decoration-muted-foreground/30 transition-all duration-300 ease-in-out hover:decoration-primary hover:text-primary"
                  >
                    {item.title}
                  </Link>
                  {item.badge && (
                    <>
                      {Array.isArray(item.badge) ? (
                        item.badge.map((badgeItem) => (
                          <Badge
                            key={badgeItem}
                            variant={badgeItem as 'new' | 'beta'}
                          >
                            {badgeItem}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant={item.badge as 'new' | 'beta'}>
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
