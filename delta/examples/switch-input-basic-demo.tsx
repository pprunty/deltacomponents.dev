'use client';

import { CustomSwitch } from '@/delta/components/switch-input';

export default function SwitchInputBasicDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <CustomSwitch defaultChecked />
    </div>
  );
}
