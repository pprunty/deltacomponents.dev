'use client';

import { memo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Tooltip } from '@/components/tooltip';
import { SidebarLogo } from './sidebar-logo';
import { 
  Lego,
  Rocket
} from '@phosphor-icons/react';

const routes = [
  {
    href: '/intro',
    label: 'Getting Started',
    icon: Rocket,
  },
  {
    href: '/docs',
    label: 'Components',
    icon: Lego,
  },
];

const Sidebar = memo(function Sidebar() {
  const pathname = usePathname();

  const renderNavItem = (route: typeof routes[0]) => {
    const { href, label, icon: Icon } = route;
    const isActive = pathname === href || pathname.startsWith(href + '/');

    return (
      <Tooltip
        key={label}
        content={label}
        position="right"
        showArrow={false}
        spacing={-10}
      >
        <Link
          href={href}
          className={`
            flex items-center justify-center
            px-5 py-2
            transition-colors duration-300
            ${isActive ? 'text-foreground' : 'text-muted-foreground'}
            hover:text-foreground
          `}
        >
          <Icon className="w-6 h-6" weight={isActive ? 'fill' : 'regular'} />
        </Link>
      </Tooltip>
    );
  };

  return (
    <nav
      className="
        hidden md:flex
        flex-col
        items-center
        h-screen
        w-16
        fixed
        top-0
        left-0
        border-r border-r-border
        bg-background
        py-4
        z-[1000]
      "
    >
      {/* Top: Logo section */}
      <SidebarLogo />

      {/* Middle: main nav icons */}
      <div className="flex flex-col flex-1 justify-center items-center gap-y-4">
        {routes.map(renderNavItem)}
      </div>

      {/* Bottom: Theme switcher */}
      <div>
        <ThemeSwitcher />
      </div>
    </nav>
  );
});

Sidebar.displayName = 'Sidebar';
export default Sidebar; 