"use client"

import { Button } from "@/delta/components/button"
import { useState } from "react"

export default function ButtonVariantsDemo() {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Standard Variants */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Standard Variants</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            title="Primary Button" 
            variant="primary"
            onClick={handleClick}
            isLoading={loading}
          />
          <Button 
            title="Secondary Button" 
            variant="secondary" 
          />
          <Button 
            title="Destructive Button" 
            variant="destructive" 
          />
          <Button 
            title="Action Button" 
            variant="action" 
          />
        </div>
      </div>

      {/* Button Sizes */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Button Sizes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            title="Small Button"
            variant="primary"
            className="py-1 text-xs"
          />
          <Button
            title="Default Size"
            variant="primary"
          />
          <Button
            title="Large Button"
            variant="primary"
            className="py-3 text-base"
          />
        </div>
      </div>

      {/* Width Variations */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Width Variations</h3>
        <div className="space-y-4">
          <Button
            title="Full Width Button"
            variant="primary"
          />
          <div className="flex justify-center">
            <Button
              title="Auto Width"
              variant="primary"
              className="w-auto"
            />
          </div>
          <div className="flex justify-center">
            <Button
              title="Fixed Width"
              variant="primary"
              className="w-[200px]"
            />
          </div>
        </div>
      </div>

      {/* Disabled States */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Disabled States</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button title="Primary" variant="primary" disabled />
          <Button title="Secondary" variant="secondary" disabled />
          <Button title="Destructive" variant="destructive" disabled />
          <Button title="Action" variant="action" disabled />
        </div>
      </div>
    </div>
  )
} 