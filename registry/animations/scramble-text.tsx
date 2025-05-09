'use client';

import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { useScramble } from 'use-scramble';
import { cn } from '@/lib/utils';

interface ScrambleTextProps {
  text: string;
  scrambleSpeed?: number;
  scrambledLetterCount?: number;
  characters?: string;
  className?: string;
  scrambledClassName?: string;
  autoStart?: boolean;
  useIntersectionObserver?: boolean;
  retriggerOnIntersection?: boolean;
  intersectionThreshold?: number;
  intersectionRootMargin?: string;
  onStart?: () => void;
  onComplete?: () => void;
}

export interface ScrambleTextHandle {
  start: () => void;
  reset: () => void;
}

const ScrambleText = forwardRef<ScrambleTextHandle, ScrambleTextProps>(
  (
    {
      text,
      scrambleSpeed = 80,
      scrambledLetterCount = 2,
      characters = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
      className = '',
      scrambledClassName = '',
      autoStart = true,
      useIntersectionObserver = false,
      retriggerOnIntersection = false,
      intersectionThreshold = 0.3,
      intersectionRootMargin = '0px',
      onStart,
      onComplete,
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const hasCompletedOnce = useRef(false);

    const { ref: scrambleRef, replay } = useScramble({
      text,
      speed: scrambleSpeed / 100, // Convert to 0-1 range
      tick: scrambledLetterCount,
      step: 1,
      range: [65, 125], // Use default range (A-Z, a-z, and some special chars)
      scramble: scrambledLetterCount,
      playOnMount: autoStart && !useIntersectionObserver,
      onAnimationStart: onStart,
      onAnimationEnd: () => {
        hasCompletedOnce.current = true;
        onComplete?.();
      },
      overdrive: false, // Disable underscore characters
    });

    useImperativeHandle(ref, () => ({
      start: () => replay(),
      reset: () => {
        // Reset internal state
        hasCompletedOnce.current = false;
        // Replay the animation
        replay();
      },
    }));

    // Handle Intersection Observer
    useEffect(() => {
      if (!useIntersectionObserver || !containerRef.current) return;

      const observerOptions = {
        root: null,
        rootMargin: intersectionRootMargin,
        threshold: intersectionThreshold,
      };

      const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasCompletedOnce.current || retriggerOnIntersection) {
              replay();
            }

            // If not set to retrigger, unobserve after first animation
            if (!retriggerOnIntersection) {
              observer.unobserve(entry.target);
            }
          }
        });
      };

      const observer = new IntersectionObserver(
        handleIntersection,
        observerOptions,
      );
      observer.observe(containerRef.current);

      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }, [
      useIntersectionObserver,
      retriggerOnIntersection,
      intersectionThreshold,
      intersectionRootMargin,
      replay,
    ]);

    return (
      <>
        <span className="sr-only">{text}</span>
        <span
          ref={containerRef}
          className={cn("inline-block whitespace-pre-wrap", className)}
          aria-hidden="true"
        >
          <span ref={scrambleRef} className={scrambledClassName} />
        </span>
      </>
    );
  },
);

ScrambleText.displayName = 'ScrambleText';
export default ScrambleText;
