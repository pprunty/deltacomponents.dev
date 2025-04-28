'use client';

import type React from 'react';
import { useEffect, useCallback, useRef, useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { debounce } from 'lodash';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Item interface for snap scroll items
 */
export interface SnapScrollItem {
  id: string;
  [key: string]: any;
}

/**
 * Props for the SnapScroll component
 */
export interface SnapScrollProps {
  /** Child elements to be rendered as snap items */
  children: React.ReactNode;

  /** Array of items to be scrolled through */
  items: SnapScrollItem[];

  /** Whether to update the URL when scrolling to a new item */
  enableDynamicRouting?: boolean;

  /** Prefix for the dynamic route (e.g., /posts/[id]) */
  routePrefix?: string;

  /** Callback to fetch more items when reaching the threshold */
  onFetchMore: () => Promise<void>;

  /** Number of items before the end to trigger fetching more */
  fetchThreshold?: number;

  /** Custom class name for the container */
  className?: string;

  /** Custom class name for each snap item */
  itemClassName?: string;

  /** Custom loading component */
  loadingComponent?: React.ReactNode;

  /** Whether to show scroll progress indicator */
  showProgress?: boolean;

  /** Callback fired when the active item changes */
  onItemChange?: (index: number, item: SnapScrollItem) => void;

  /** Scroll behavior */
  scrollBehavior?: ScrollBehavior;

  /** Debounce time for scroll events in ms */
  scrollDebounce?: number;

  /** CSS position property for the container */
  position?: 'fixed' | 'absolute' | 'static';
}

/**
 * Props for the SnapScrollItem component
 */
export interface SnapScrollItemProps {
  /** Child elements to be rendered inside the snap item */
  children: React.ReactNode;

  /** Custom class name for the item */
  className?: string;
}

/**
 * A component that creates a vertical snap-scrolling experience with dynamic loading
 * and optional URL updates.
 */
export const SnapScroll: React.FC<SnapScrollProps> = ({
  children,
  items,
  enableDynamicRouting = false,
  routePrefix = 'items',
  onFetchMore,
  fetchThreshold = 3,
  className = '',
  itemClassName = '',
  loadingComponent,
  showProgress = false,
  onItemChange,
  scrollBehavior = 'smooth',
  scrollDebounce = 100,
  position = 'fixed',
}) => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoize the URL update function to prevent unnecessary re-renders
  const updateURL = useCallback(
    (index: number) => {
      if (enableDynamicRouting && index >= 0 && index < items.length) {
        const newPath = `/${routePrefix}/${items[index].id}`;
        window.history.replaceState({ path: newPath }, '', newPath);
      }
    },
    [enableDynamicRouting, items, routePrefix],
  );

  // Handle scroll events
  const handleScroll = useCallback(() => {
    const snapContainer = containerRef.current;
    if (!snapContainer || isLoading) return;

    const scrollPosition = snapContainer.scrollTop;
    const containerHeight = snapContainer.clientHeight;
    const index = Math.round(scrollPosition / containerHeight);

    // Update current index and URL if needed
    if (index !== currentIndex && index >= 0 && index < items.length) {
      setCurrentIndex(index);
      updateURL(index);

      // Call the onItemChange callback if provided
      if (onItemChange) {
        onItemChange(index, items[index]);
      }
    }

    // Check if we need to fetch more items
    const shouldFetchMore =
      !isFetching &&
      !isLoading &&
      items.length > 0 &&
      // Either we're at the last item
      (index >= items.length - 1 ||
        // Or we're approaching the threshold
        (items.length - index <= fetchThreshold && index < items.length - 1));

    if (shouldFetchMore) {
      setIsFetching(true);
      onFetchMore()
        .then(() => {
          setIsFetching(false);
        })
        .catch((err) => {
          setError(
            err instanceof Error ? err.message : 'Failed to fetch more items',
          );
          setIsFetching(false);
        });
    }
  }, [
    currentIndex,
    updateURL,
    items,
    onFetchMore,
    fetchThreshold,
    isLoading,
    isFetching,
    onItemChange,
  ]);

  // Set up scroll event listener with debounce
  useEffect(() => {
    const container = containerRef.current;
    const debouncedHandleScroll = debounce(handleScroll, scrollDebounce);

    if (container) {
      container.addEventListener('scroll', debouncedHandleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', debouncedHandleScroll);
      }
      debouncedHandleScroll.cancel();
    };
  }, [handleScroll, scrollDebounce]);

  // Handle URL-based navigation
  useEffect(() => {
    if (enableDynamicRouting && pathname && items.length > 0) {
      const itemId = pathname.split('/').pop();
      const index = items.findIndex((item) => item.id === itemId);
      const snapContainer = containerRef.current;

      if (snapContainer && index !== -1 && index !== currentIndex) {
        snapContainer.scrollTo({
          top: index * snapContainer.clientHeight,
          behavior: scrollBehavior,
        });
        setCurrentIndex(index);
      }
    }
  }, [pathname, items, currentIndex, enableDynamicRouting, scrollBehavior]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, items.length - 1);
        if (nextIndex !== currentIndex) {
          containerRef.current.scrollTo({
            top: nextIndex * containerRef.current.clientHeight,
            behavior: scrollBehavior,
          });
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        if (prevIndex !== currentIndex) {
          containerRef.current.scrollTo({
            top: prevIndex * containerRef.current.clientHeight,
            behavior: scrollBehavior,
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length, scrollBehavior]);

  // Progress indicators
  const progressIndicators = useMemo(() => {
    if (!showProgress || items.length === 0) return null;

    return (
      <div
        className={`${position} right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-50`}
      >
        {items.map((_, idx) => (
          <button
            key={idx}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              idx === currentIndex
                ? 'bg-primary w-3 h-3'
                : 'bg-gray-300 hover:bg-gray-400',
            )}
            onClick={() => {
              if (containerRef.current) {
                containerRef.current.scrollTo({
                  top: idx * containerRef.current.clientHeight,
                  behavior: scrollBehavior,
                });
              }
            }}
            aria-label={`Go to item ${idx + 1}`}
          />
        ))}
      </div>
    );
  }, [items, currentIndex, showProgress, scrollBehavior, position]);

  // Default loading component
  const defaultLoadingComponent = (
    <div className="flex items-center justify-center h-24 w-full">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          'flex flex-col h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory scrollbar-hide',
          className,
        )}
        tabIndex={0}
        role="region"
        aria-label="Scrollable content"
      >
        {children}
        {isFetching && (loadingComponent || defaultLoadingComponent)}
        {error && (
          <div className="p-4 bg-red-50 text-red-500 text-center">
            {error}
            <button
              className="ml-2 underline"
              onClick={() => {
                setError(null);
                setIsFetching(true);
                onFetchMore()
                  .then(() => setIsFetching(false))
                  .catch(() => setIsFetching(false));
              }}
            >
              Retry
            </button>
          </div>
        )}
      </div>
      {progressIndicators}
    </>
  );
};

/**
 * Individual item component for the SnapScroll container
 */
export const SnapScrollItem: React.FC<SnapScrollItemProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'snap-start flex h-screen flex-shrink-0 items-start justify-center transition-transform duration-300 transform will-change-transform translate-z-0',
        className,
      )}
    >
      {children}
    </div>
  );
};
