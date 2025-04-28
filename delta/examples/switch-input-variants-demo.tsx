'use client';

import { SwitchInput } from '@/delta/components/switch-input';

export default function SwitchInputVariantsDemo() {
  return (
    <div className="space-y-8 p-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Appearance Settings</h3>
        <div className="space-y-6">
          <SwitchInput
            label="Dark Mode"
            name="dark-mode"
            variant="pill"
            hint="Toggle between light and dark theme"
            defaultChecked
          />
          <SwitchInput
            label="Notifications"
            name="notifications"
            description="Receive updates about your account"
            defaultChecked
          />
          <SwitchInput
            label="Large Size"
            name="large-size"
            size="large"
            hint="A larger switch for better visibility"
            defaultChecked
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Colors</h3>
        <div className="space-y-6">
          <SwitchInput
            label="Success State"
            name="success"
            activeColor="#22c55e"
            variant="pill"
            hint="Green color for success states"
            defaultChecked
          />
          <SwitchInput
            label="Warning State"
            name="warning"
            activeColor="#f59e0b"
            variant="pill"
            hint="Orange color for warning states"
            defaultChecked
          />
          <SwitchInput
            label="Danger State"
            name="danger"
            activeColor="#ef4444"
            variant="pill"
            hint="Red color for danger states"
            defaultChecked
          />
          <SwitchInput
            label="Info State"
            name="info"
            activeColor="#3b82f6"
            variant="pill"
            hint="Blue color for info states"
            defaultChecked
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Form States</h3>
        <div className="space-y-6">
          <SwitchInput
            label="Required Field"
            name="required"
            required
            error="This field is required"
            hint="This switch must be enabled"
          />
          <SwitchInput
            label="Disabled State"
            name="disabled"
            disabled
            defaultChecked
            hint="This switch cannot be toggled"
          />
          <SwitchInput
            label="With Description"
            name="description"
            description="This is a detailed description of what this switch does"
            defaultChecked
          />
        </div>
      </div>
    </div>
  );
}
