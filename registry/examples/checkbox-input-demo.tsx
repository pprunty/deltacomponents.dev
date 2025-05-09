'use client';

import { CheckboxInput } from '@/registry/inputs/checkbox-input';

export default function CheckboxInputBasicDemo() {
  return (
    <div className="w-full min-w-[320px] max-w-md mx-auto p-4">
      <CheckboxInput
        label="Accept terms and conditions"
        name="terms"
        description="By accepting, you agree to our Terms of Service and Privacy Policy"
        hint="Required for account creation"
        required
      />
    </div>
  );
}
