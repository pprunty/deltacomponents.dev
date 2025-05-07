import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getCategories, type CategoryType } from '@/lib/registry';

// Navigation items configuration
export const navigationItems = {
  basics: {
    title: 'Basics',
    items: [
      { href: '/docs/introduction', label: 'Introduction' },
      { href: '/docs/getting-started', label: 'Getting Started' }
    ]
  }
};

interface NavigationProps {
  className?: string;
  variant?: 'sidebar' | 'drawer';
  currentPath: string; // Pass the current path as a prop instead of using usePathname
}

export async function Navigation({ className, variant = 'sidebar', currentPath }: NavigationProps) {
  // Fetch categories server-side
  const categories = await getCategories();

  const isActive = (path: string) => {
    // For the homepage/root path, only match exact
    if (path === '/') {
      return currentPath === '/';
    }
    // For other paths, check if pathname starts with the path
    return currentPath.startsWith(path);
  };

  // Different styles based on variant
  const getLinkClassName = (isActiveLink: boolean) => {
    if (variant === 'sidebar') {
      return cn(
        'h-8 flex items-center font-medium text-md sm:text-sm px-2 rounded-sm w-[calc(100%+8px)]',
        'hover:bg-accent/50 transition-colors',
        isActiveLink
          ? 'bg-accent text-primary'
          : 'text-muted-foreground'
      );
    } else {
      return cn(
        'text-md transition-colors lg:px-3 lg:py-2 lg:rounded-md lg:hover:bg-accent',
        isActiveLink && 'text-primary lg:bg-accent lg:text-accent-foreground font-medium'
      );
    }
  };

  // Get category title class based on variant
  const getCategoryTitleClass = () => {
    if (variant === 'sidebar') {
      return "text-sm text-muted-foreground/60 font-medium ml-2 inline-block mb-2";
    } else {
      return "text-sm text-muted-foreground font-semibold inline-block mb-2";
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Basics Section */}
      {Object.entries(navigationItems).map(([key, section]) => (
        <div key={key} className={variant === 'sidebar' ? 'mb-5' : 'space-y-3'}>
          <span className={getCategoryTitleClass()}>
            {section.title}
          </span>
          <ul className={variant === 'sidebar' ? 'space-y-1' : 'flex flex-col space-y-2'}>
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={getLinkClassName(isActive(item.href))}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Divider between sections - only for sidebar */}
          {variant === 'sidebar' && (
            <div aria-hidden="true" className="h-px w-full border-t border border-border my-5"></div>
          )}
        </div>
      ))}

      {/* Components Sections */}
      {categories.map((category, index) => (
        <div key={category.title} className={variant === 'sidebar' ? 'mb-5' : 'space-y-3'}>
          <span className={getCategoryTitleClass()}>
            {category.title}
          </span>
          <ul className={variant === 'sidebar' ? 'space-y-1' : 'flex flex-col space-y-2'}>
            {category.items.map((item) => (
              <li key={item.name}>
                <Link
                  href={`/docs/ui/${item.name}`}
                  className={getLinkClassName(isActive(`/docs/ui/${item.name}`))}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Divider between sections - for sidebar only */}
          {variant === 'sidebar' && index < categories.length - 1 && (
            <div aria-hidden="true" className="h-px w-full border-t border border-border my-5"></div>
          )}
        </div>
      ))}
    </div>
  );
}
