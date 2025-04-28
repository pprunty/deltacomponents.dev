'use client';

import { Button } from '@/components/ui/button';

export default function ButtonBasicDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <Button onClick={() => alert('Button has been clicked!')}>
        Click me
      </Button>
    </div>
  );
}
