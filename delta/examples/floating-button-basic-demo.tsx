'use client';

import { Plus } from 'lucide-react';
import Float from '@/delta/components/floating-button';
import { Button } from '@/delta/components/button';

export default function BasicExample() {
  return (
    <div className="flex items-center justify-center p-8 border rounded-lg relative h-48">
      <Float position="absolute" placement="bottom-right" offset={16}>
        <Button
          variant="primary"
          size="sm"
          onClick={() => alert('Floating button clicked!')}
        >
          <Plus size={20} />
        </Button>
      </Float>
    </div>
  );
}
