'use client';

import { Avatar } from '@/delta/components/avatar';

export default function AvatarFallbackDemo() {
  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Size variants */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground">Size Variants</span>
        <div className="flex items-center gap-4">
          <Avatar name="Small" size={24} />
          <Avatar name="Medium" size={40} />
          <Avatar name="Large" size={64} />
        </div>
      </div>

      {/* Fallback variants */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground">Fallback Variants</span>
        <div className="flex items-center gap-4">
          <Avatar name="John Doe" size={40} />
          <Avatar name="Jane" size={40} />
          <Avatar size={40} />
        </div>
      </div>

      {/* Interactive variants */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-sm text-muted-foreground">
          Interactive Variants
        </span>
        <div className="flex items-center gap-4">
          <Avatar
            name="Click Me"
            size={40}
            src="/icon.png"
            onClick={() => alert('Avatar clicked!')}
          />
          <Avatar
            name="No Image"
            size={40}
            onClick={() => alert('Fallback avatar clicked!')}
          />
        </div>
      </div>
    </div>
  );
}
