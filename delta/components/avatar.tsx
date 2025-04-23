'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Static cache that persists across component instances
const imageCache = new Map<string, string>();

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  name?: string | null;
  size?: number;
  alt?: string;
  onError?: () => void;
  cacheKey?: string;
  priority?: boolean;
  onClick?: () => void;
}

/**
 * Avatar component that displays an image or falls back to a gradient based on name
 */
export function Avatar({
  src,
  name = '',
  size = 34,
  alt = 'Avatar',
  className,
  onError,
  cacheKey,
  priority = false,
  onClick,
  ...props
}: AvatarProps) {
  // Check if we have a cached image first
  const cachedImage = cacheKey ? imageCache.get(cacheKey) : undefined;

  // Use cached image if available
  const [imageSrc, setImageSrc] = React.useState(cachedImage || src);
  const [showFallback, setShowFallback] = React.useState(!imageSrc);

  // Store gradient in a ref to avoid recalculating
  const cachedGradient = React.useRef<string | null>(null);

  // Handle image load error
  const handleError = React.useCallback(() => {
    setShowFallback(true);
    setImageSrc(undefined);
    onError?.();
  }, [onError]);

  // Handle successful image load
  const handleImageLoad = React.useCallback(() => {
    // Only cache the image if we have a cacheKey and it's not already cached
    if (src && cacheKey && !imageCache.has(cacheKey)) {
      // Create an in-memory copy of the image
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.src = src;

      img.onload = () => {
        try {
          // Create a canvas to convert the image to a data URL
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            // Store the data URL in our cache
            const dataUrl = canvas.toDataURL('image/jpeg');
            imageCache.set(cacheKey, dataUrl);
            setImageSrc(dataUrl);
          }
        } catch (e) {
          console.error('Error caching image:', e);
          // If toDataURL fails, just cache the original URL
          imageCache.set(cacheKey, src);
        }
      };
    }
  }, [src, cacheKey]);

  // Get initials from name (up to 2 characters)
  const getInitials = (name: string) => {
    if (!name) return '';

    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Generate gradient based on name
  const getGradient = React.useCallback((name: string) => {
    // Use cached gradient if available
    if (cachedGradient.current) return cachedGradient.current;

    const hash = djb2(name || 'Anonymous');
    const baseHue = ((hash % 360) + 360) % 360;
    const hue2 = (baseHue + 30) % 360;
    const hue3 = (baseHue + 60) % 360;

    const gradient = `linear-gradient(135deg, hsl(${baseHue}, 70%, 50%), hsl(${hue2}, 70%, 50%), hsl(${hue3}, 70%, 50%))`;
    cachedGradient.current = gradient;
    return gradient;
  }, []);

  // djb2 hash function for better distribution
  function djb2(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = hash * 33 + str.charCodeAt(i);
    }
    return hash;
  }

  // Clean up the cache if it gets too large (limit to 100 entries)
  React.useEffect(() => {
    if (imageCache.size > 100) {
      const keys = Array.from(imageCache.keys());
      const keysToRemove = keys.slice(0, keys.length - 50);
      keysToRemove.forEach((key) => imageCache.delete(key));
    }
  }, []);

  // Calculate gradient for fallback
  const gradient = getGradient(name || 'Anonymous');

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-muted',
        onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
        className,
      )}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      {...props}
    >
      {/* Fallback layer (gradient with initials) - only shown when image is not available */}
      {showFallback && (
        <div
          className="absolute inset-0 flex items-center justify-center text-white font-medium"
          style={{ background: gradient }}
        >
          {name ? (
            <span style={{ fontSize: `${Math.max(size / 2.5, 10)}px` }}>
              {getInitials(name)}
            </span>
          ) : null}
        </div>
      )}

      {/* Image layer - displayed immediately if cached */}
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={alt}
          className="object-cover w-full h-full"
          width={size}
          height={size}
          priority={priority}
          onLoad={handleImageLoad}
          onError={handleError}
          unoptimized={!!cachedImage} // Don't optimize cached data URLs
        />
      )}
    </div>
  );
}
