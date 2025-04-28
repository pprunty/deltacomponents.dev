'use client';

import type { ReactNode } from 'react';
import { clsx } from 'clsx';
import { ClipLoader } from 'react-spinners';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'action'
  | 'neobrutalism'
  | 'ghost'
  | 'outline';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  onClick?: () => void;
  title?: string;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  extendedClickArea?: boolean;
  isLoading?: boolean; // New prop for loading state
  spinnerSize?: number; // Optional prop for spinner size
  spinnerColor?: string; // Optional prop for spinner color
  actionColor?: string; // New prop for customizing action variant color
  neobrutalismColor?: string; // New prop for neobrutalism variant color
}

export function Button({
  onClick,
  title,
  children,
  type = 'button',
  className,
  disabled = false,
  icon,
  variant = 'primary',
  size = 'md',
  extendedClickArea = false,
  isLoading = false, // Default to not loading
  spinnerSize = 20, // Default size
  spinnerColor, // Will use appropriate color based on variant if not specified
  actionColor, // New prop
  neobrutalismColor = 'bg-blue-300', // Default neobrutalism color
}: ButtonProps) {
  // Determine spinner color based on variant and theme colors
  const getSpinnerColor = () => {
    if (spinnerColor) return spinnerColor;

    switch (variant) {
      case 'primary':
        return 'var(--primary-foreground)'; // White in light mode, dark in dark mode
      case 'secondary':
        return 'var(--secondary-foreground)'; // Dark in light mode, white in dark mode
      case 'action':
        return 'var(--action-foreground)'; // Always white/light
      case 'destructive':
        return 'var(--destructive-foreground)'; // Always white/light
      default:
        return 'currentColor'; // Fallback to the current text color
    }
  };

  // Get action variant styles based on whether a custom color is provided
  const getActionStyles = () => {
    if (actionColor) {
      // If it's a Tailwind class (starts with bg-)
      if (actionColor.startsWith('bg-')) {
        const baseColor = actionColor.replace('bg-', '');
        return [
          `${actionColor} text-white`,
          `hover:${actionColor}/80 active:${actionColor}/80`,
          `focus-visible:outline-${baseColor}/50`,
          `disabled:hover:${actionColor}`,
        ];
      }
      // If it's a hex color
      return [
        `bg-[${actionColor}] text-white`,
        `hover:bg-[${actionColor}]/80 active:bg-[${actionColor}]/80`,
        `focus-visible:outline-[${actionColor}]/50`,
        `disabled:hover:bg-[${actionColor}]`,
      ];
    }

    return [
      'bg-blue-600 text-white',
      'hover:bg-blue-600/80 active:bg-blue-600/80',
      'focus-visible:outline-blue-500/50',
      'disabled:hover:bg-blue-600',
    ];
  };

  // Size-based styles
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-md',
    md: 'text-sm py-2 rounded-md',
    lg: 'text-base px-6 py-3 rounded-lg',
  };

  // Use title if provided, otherwise use children
  const buttonContent = title || children;

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading}
      className={clsx(
        'w-full text-center rounded-md font-semibold transition-all duration-200',
        sizeStyles[size],
        'focus:outline-none focus:ring-0 focus-visible:ring-0',
        'focus:shadow-none focus-visible:shadow-none',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'active:opacity-80',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:opacity-50',

        // Add relative positioning when extended click area is enabled
        extendedClickArea && 'relative',

        // Primary variant styling
        variant === 'primary' && [
          'bg-primary text-primary-foreground',
          'hover:bg-primary/80 active:bg-primary/80',
          'focus-visible:outline-primary/50',
          'disabled:hover:bg-primary',
        ],

        // Secondary variant styling
        variant === 'secondary' && [
          'bg-background text-secondary-foreground',
          'border border-border',
          'hover:bg-secondary/80 active:bg-secondary/80',
          'hover:border-border-hover',
          'focus-visible:outline-secondary/50',
          'disabled:hover:bg-secondary disabled:hover:border-border',
        ],

        // Destructive variant styling
        variant === 'destructive' && [
          'bg-destructive text-destructive-foreground',
          'hover:bg-destructive/80 active:bg-destructive/80',
          'focus-visible:outline-destructive/50',
          'disabled:hover:bg-destructive',
        ],

        // Action variant styling with customizable color
        variant === 'action' && getActionStyles(),

        // Neobrutalism variant styling
        variant === 'neobrutalism' && [
          'rounded-lg border-2 border-black',
          neobrutalismColor,
          'text-black',
          'shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]',
          'hover:translate-y-1 hover:translate-x-1 hover:shadow-none',
          'active:translate-y-1 active:translate-x-1 active:shadow-none',
          'transition-all',
          'disabled:hover:translate-y-0 disabled:hover:translate-x-0 disabled:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] dark:disabled:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)]',
        ],

        // Ghost variant styling
        variant === 'ghost' && [
          'bg-transparent hover:bg-accent hover:text-accent-foreground',
          'active:bg-accent/80',
          'focus-visible:outline-accent/50',
        ],

        // Outline variant styling
        variant === 'outline' && [
          'border border-input bg-background',
          'hover:bg-accent hover:text-accent-foreground',
          'active:bg-accent/80',
          'focus-visible:outline-accent/50',
        ],

        // Add the extended click area pseudo-element styles
        extendedClickArea &&
          'before:absolute before:-inset-10 before:block before:content-[""]',

        className,
      )}
      style={{
        WebkitTapHighlightColor: 'transparent',
        outline: 'none',
        ...(variant === 'action' &&
          actionColor &&
          !actionColor.startsWith('bg-') && {
            backgroundColor: actionColor,
            '--tw-bg-opacity': 1,
          }),
      }}
    >
      <div
        className={clsx(
          'flex items-center justify-center',
          isLoading && 'gap-2',
        )}
      >
        {isLoading && (
          <ClipLoader
            size={spinnerSize}
            color={getSpinnerColor()}
            cssOverride={{ display: 'block' }}
          />
        )}
        {icon && !isLoading && (
          <span className="flex items-center">{icon}</span>
        )}
        <span>{title || children}</span>
      </div>
    </button>
  );
}
