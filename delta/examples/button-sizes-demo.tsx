"use client"

import { Button } from "@/delta/components/button"

export default function ButtonSizesDemo() {
  return (
    <div className="space-y-8">
      {/* Primary Variant Sizes */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Primary Variant</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button title="Small" variant="primary" size="sm" />
          <Button title="Medium" variant="primary" size="md" />
          <Button title="Large" variant="primary" size="lg" />
        </div>
      </div>

      {/* Secondary Variant Sizes */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Secondary Variant</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button title="Small" variant="secondary" size="sm" />
          <Button title="Medium" variant="secondary" size="md" />
          <Button title="Large" variant="secondary" size="lg" />
        </div>
      </div>

      {/* Destructive Variant Sizes */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Destructive Variant</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button title="Small" variant="destructive" size="sm" />
          <Button title="Medium" variant="destructive" size="md" />
          <Button title="Large" variant="destructive" size="lg" />
        </div>
      </div>

      {/* Action Variant Sizes */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Action Variant</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button title="Small" variant="action" size="sm" />
          <Button title="Medium" variant="action" size="md" />
          <Button title="Large" variant="action" size="lg" />
        </div>
      </div>

      {/* Neobrutalism Variant Sizes */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Neobrutalism Variant</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button title="Small" variant="neobrutalism" size="sm" />
          <Button title="Medium" variant="neobrutalism" size="md" />
          <Button title="Large" variant="neobrutalism" size="lg" />
        </div>
      </div>
    </div>
  )
} 