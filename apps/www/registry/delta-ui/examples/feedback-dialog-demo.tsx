"use client"

import { useState } from "react"
import { FeedbackDialog } from "@/registry/delta-ui/components/feedback-dialog"

export default function FeedbackDialogDemo() {
  const [config, setConfig] = useState({
    variant: 'default',
    size: 'medium',
    disabled: false
  })

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">FeedbackDialog Interactive Demo</h2>
          <p className="text-muted-foreground">
            Explore different configurations and features of the FeedbackDialog component.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Controls */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Configuration</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Variant</label>
                <select 
                  value={config.variant}
                  onChange={(e) => setConfig({...config, variant: e.target.value})}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="default">Default</option>
                  <option value="secondary">Secondary</option>
                  <option value="outline">Outline</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Size</label>
                <select 
                  value={config.size}
                  onChange={(e) => setConfig({...config, size: e.target.value})}
                  className="w-full mt-1 p-2 border rounded-md"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  checked={config.disabled}
                  onChange={(e) => setConfig({...config, disabled: e.target.checked})}
                  className="rounded"
                />
                <label className="text-sm font-medium">Disabled</label>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preview</h3>
            <div className="border rounded-lg p-6 min-h-[200px] flex items-center justify-center">
              <FeedbackDialog 
                variant={config.variant}
                size={config.size}
                disabled={config.disabled}
              >
                FeedbackDialog Demo Content
              </FeedbackDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
