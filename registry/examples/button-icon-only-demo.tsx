"use client"

import { Button } from "@/registry/ui/button"
import { Plus, Heart, Settings, Bell, Menu } from "lucide-react"

export default function ButtonIconOnlyDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Icon Only Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            title=""
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            className="w-10"
          />
          <Button
            title=""
            variant="secondary"
            icon={<Heart className="w-4 h-4" />}
            className="w-10"
          />
          <Button
            title=""
            variant="destructive"
            icon={<Settings className="w-4 h-4" />}
            className="w-10"
          />
          <Button
            title=""
            variant="action"
            icon={<Bell className="w-4 h-4" />}
            className="w-10"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Ghost Variant</h3>
        <div className="flex flex-wrap gap-4">
          <Button
            title="Ghost Button"
            variant="ghost"
          />
          <Button
            title="With Icon"
            variant="ghost"
            icon={<Menu className="w-4 h-4" />}
          />
          <Button
            title=""
            variant="ghost"
            icon={<Settings className="w-4 h-4" />}
            className="w-10"
          />
        </div>
      </div>
    </div>
  )
} 