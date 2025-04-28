'use client';

import ScrambleIn from '@/delta/components/scramble-in';

export default function ScrambleInObserverDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <ScrambleIn
        text="Scramble on Scroll"
        className="text-2xl font-bold"
        scrambledClassName="text-2xl font-bold"
        scrambleSpeed={30}
        scrambledLetterCount={4}
        useIntersectionObserver={true}
        retriggerOnIntersection={true}
        intersectionThreshold={0.5}
      />
    </div>
  );
}
