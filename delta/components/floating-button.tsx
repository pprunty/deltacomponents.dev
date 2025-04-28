'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type Position =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

// Define the offset type for reuse
export type OffsetValue = number | { x?: number; y?: number };

export interface FloatProps {
  children: React.ReactNode;
  tooltip?: string;
  tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
  tooltipAlign?: 'start' | 'center' | 'end';
  onlyDesktop?: boolean;
  onlyMobile?: boolean;
  position?: 'fixed' | 'absolute' | 'static';
  placement?: Position;
  mobilePosition?: Position;
  desktopPosition?: Position;
  offset?: OffsetValue;
  mobileOffset?: OffsetValue;
  desktopOffset?: OffsetValue;
  zIndex?: number;
  opaqueOnScroll?: boolean;
  className?: string;
}

const Float = React.forwardRef<HTMLDivElement, FloatProps>(
  (
    {
      children,
      tooltip,
      tooltipSide = 'top',
      tooltipAlign = 'center',
      onlyDesktop = false,
      onlyMobile = false,
      position = 'fixed',
      placement = 'bottom-right',
      offset = 16,
      mobileOffset,
      desktopOffset,
      zIndex = 100,
      mobilePosition,
      desktopPosition,
      opaqueOnScroll = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [isMobile, setIsMobile] = React.useState(false);
    const [isOpaque, setIsOpaque] = React.useState(false);

    React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => {
        window.removeEventListener('resize', checkMobile);
      };
    }, []);

    React.useEffect(() => {
      if (!opaqueOnScroll) return;

      let lastScrollY = window.scrollY;
      let ticking = false;

      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            const scrollDirection =
              currentScrollY < lastScrollY ? 'up' : 'down';
            setIsOpaque(scrollDirection === 'down' && currentScrollY > 100);
            lastScrollY = currentScrollY;
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [opaqueOnScroll]);

    // Determine effective offset based on screen size
    const effectiveOffset = React.useMemo(() => {
      if (isMobile && mobileOffset !== undefined) {
        return mobileOffset;
      }
      if (!isMobile && desktopOffset !== undefined) {
        return desktopOffset;
      }
      return offset;
    }, [isMobile, mobileOffset, desktopOffset, offset]);

    // Calculate offset values
    const offsetX =
      typeof effectiveOffset === 'object'
        ? (effectiveOffset.x ?? 16)
        : effectiveOffset;
    const offsetY =
      typeof effectiveOffset === 'object'
        ? (effectiveOffset.y ?? 16)
        : effectiveOffset;

    // Determine effective placement based on screen size
    const effectivePlacement = React.useMemo(() => {
      if (isMobile && mobilePosition) {
        return mobilePosition;
      }
      if (!isMobile && desktopPosition) {
        return desktopPosition;
      }
      return placement;
    }, [isMobile, mobilePosition, desktopPosition, placement]);

    // Generate position styles based on props
    const positionStyles = React.useMemo(() => {
      if (position === 'static') return {};

      const styles: React.CSSProperties = {
        position,
        zIndex,
        transition: 'opacity 0.3s ease-in-out',
        ...(opaqueOnScroll && isOpaque ? { opacity: 0.9 } : {}),
      };

      switch (effectivePlacement) {
        case 'top-left':
          styles.top = offsetY;
          styles.left = offsetX;
          break;
        case 'top-right':
          styles.top = offsetY;
          styles.right = offsetX;
          break;
        case 'bottom-left':
          styles.bottom = offsetY;
          styles.left = offsetX;
          break;
        case 'bottom-right':
          styles.bottom = offsetY;
          styles.right = offsetX;
          break;
        case 'bottom-center':
          styles.bottom = offsetY;
          styles.left = '50%';
          styles.transform = 'translateX(-50%)';
          break;
        default:
          styles.bottom = offsetY;
          styles.right = offsetX;
      }

      return styles;
    }, [
      position,
      effectivePlacement,
      offsetX,
      offsetY,
      zIndex,
      opaqueOnScroll,
      isOpaque,
    ]);

    // Handle visibility based on device type
    if ((onlyDesktop && isMobile) || (onlyMobile && !isMobile)) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn('transition-opacity duration-300', className)}
        style={positionStyles}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Float.displayName = 'Float';

export default Float;
