import Link from 'next/link';
import { AnchorHTMLAttributes, ReactNode } from 'react';

interface AProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  className?: string;
}

export function A({ children, className = '', href, ...props }: AProps) {
  // If the href starts with "#", render an <a> tag (for internal anchor links)
  if (href.startsWith('#')) {
    return (
      <a
        href={href}
        className={`underline decoration-wavy underline-offset-4 text-primary decoration-muted-foreground hover:decoration-primary active:decoration-primary visited:text-muted-foreground ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  } else {
    // For other links, render the Next.js <Link> component
    return (
      <Link
        href={href}
        className={`underline decoration-wavy underline-offset-4 text-primary decoration-muted-foreground hover:decoration-primary active:decoration-primary visited:text-muted-foreground ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }
}
