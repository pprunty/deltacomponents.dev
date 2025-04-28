'use client';

import { TextareaInput } from '@/delta/components/textarea-input';

export default function TextareaInputBasicDemo() {
  return (
    <div className="flex flex-col space-y-4 max-w-md mx-auto">
      <TextareaInput
        label="Feedback"
        name="feedback"
        description="Share your thoughts with us"
        placeholder="Type your feedback here..."
      />
    </div>
  );
}
