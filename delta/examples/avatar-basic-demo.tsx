'use client';

import { Avatar } from '@/delta/components/avatar';

export default function AvatarBasicDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <Avatar src="/icon.svg" name="Delta Components" size={40} />
    </div>
  );
}
