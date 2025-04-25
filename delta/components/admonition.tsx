import type React from 'react';
import {
  Info,
  LightbulbFilament,
  Warning,
  X,
  Note,
} from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils';

type AdmonitionType = 'note' | 'tip' | 'info' | 'warning' | 'danger';

interface AdmonitionProps {
  type?: AdmonitionType;
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  solid?: boolean;
  variant?: 'default' | 'outline';
}

const icons: Record<AdmonitionType, React.ComponentType<{ className?: string }>> = {
  note: Note,
  tip: LightbulbFilament,
  info: Info,
  warning: Warning,
  danger: X,
};

const styles = {
  note: {
    container: 'border-l-4 border-slate-500 dark:border-slate-400',
    bg: 'bg-slate-50 dark:bg-slate-900/50',
    solid: 'bg-slate-400 dark:bg-slate-700 text-white dark:text-white border-l-4 border-slate-500 dark:border-slate-800',
    icon: 'text-slate-500 dark:text-slate-400',
    title: 'text-slate-700 dark:text-slate-300',
    defaultIcon: <Note className="h-5 w-5" />,
    outline: 'border border-slate-400 dark:border-slate-300',
  },
  tip: {
    container: 'border-l-4 border-green-500 dark:border-green-400',
    bg: 'bg-green-50 dark:bg-green-950/50',
    solid: 'bg-green-400 dark:bg-green-700 text-white dark:text-white border-l-4 border-green-500 dark:border-green-800',
    icon: 'text-green-500 dark:text-green-400',
    title: 'text-green-700 dark:text-green-300',
    defaultIcon: <LightbulbFilament className="h-5 w-5" />,
    outline: 'border border-green-400 dark:border-green-300',
  },
  info: {
    container: 'border-l-4 border-blue-500 dark:border-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/50',
    solid: 'bg-blue-400 dark:bg-blue-700 text-white dark:text-white border-l-4 border-blue-500 dark:border-blue-800',
    icon: 'text-blue-500 dark:text-blue-400',
    title: 'text-blue-700 dark:text-blue-300',
    defaultIcon: <Info className="h-5 w-5" />,
    outline: 'border border-blue-400 dark:border-blue-300',
  },
  warning: {
    container: 'border-l-4 border-amber-500 dark:border-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/50',
    solid: 'bg-amber-400 dark:bg-amber-700 text-white dark:text-white border-l-4 border-amber-500 dark:border-amber-800',
    icon: 'text-amber-500 dark:text-amber-400',
    title: 'text-amber-700 dark:text-amber-300',
    defaultIcon: <Warning className="h-5 w-5" />,
    outline: 'border border-amber-400 dark:border-amber-300',
  },
  danger: {
    container: 'border-l-4 border-red-500 dark:border-red-400',
    bg: 'bg-red-50 dark:bg-red-950/50',
    solid: 'bg-red-400 dark:bg-red-700 text-white dark:text-white border-l-4 border-red-500 dark:border-red-800',
    icon: 'text-red-500 dark:text-red-400',
    title: 'text-red-700 dark:text-red-300',
    defaultIcon: <X className="h-5 w-5" />,
    outline: 'border border-red-400 dark:border-red-300',
  },
};

const defaultTitle = {
  note: 'Note',
  tip: 'Tip',
  info: 'Info',
  warning: 'Warning',
  danger: 'Danger',
};

export function Admonition({
  type = 'info',
  title,
  children,
  className,
  icon,
  solid = false,
  variant = 'default',
}: AdmonitionProps) {
  const Icon = icons[type] || icons.info;
  const style = styles[type] || styles.info;

  const displayTitle = title || defaultTitle[type] || defaultTitle.info;
  const displayIcon = icon || <Icon className="h-5 w-5" />;

  return (
    <div
      className={cn(
        'p-4 my-6 shadow-sm',
        variant === 'outline' ? 'rounded-md border' : 'rounded-r-md',
        variant === 'outline' ? style.outline : style.container,
        solid ? style.solid : style.bg,
        className,
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className={cn('flex-shrink-0 mt-0.5', solid ? 'text-white' : style.icon)}>
          {displayIcon}
        </div>
        <div className="flex-1 min-w-0">
          {displayTitle && (
            <h3 className={cn('font-medium text-base mb-1', solid ? 'text-white' : style.title)}>
              {displayTitle}
            </h3>
          )}
          <div className={cn('text-sm leading-relaxed', solid ? 'text-white' : 'text-slate-700 dark:text-slate-300')}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
