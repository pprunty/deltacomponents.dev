'use client';

import ShareButton from '@/delta/components/share-button';
import { Share } from '@phosphor-icons/react';

export default function ShareButtonPopoverDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <ShareButton
        tooltip="Share this content"
        size="md"
        title="Share"
        variant="ghost"
        showTitle={true}
        className="[&>div>span]:text-sm"
        nativeShareOnDesktop={false}
        url="https://deltacomponents.dev"
        message="Check out Delta Components, a modern React UI library: "
      />
    </div>
  );
}
