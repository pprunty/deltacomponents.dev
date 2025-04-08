"use client"

import { Button } from "@/registry/ui/button"
import { ArrowRight, Save, Trash, Download } from "lucide-react"

export default function ButtonIconsDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Button
        title="Continue"
        variant="primary"
        icon={<ArrowRight className="w-4 h-4" />}
      />

      <Button
        title="Save Changes"
        variant="secondary"
        icon={<Save className="w-4 h-4" />}
      />

      <Button
        title="Delete Item"
        variant="destructive"
        icon={<Trash className="w-4 h-4" />}
      />

      <Button
        title="Download"
        variant="action"
        icon={<Download className="w-4 h-4" />}
      />
    </div>
  )
} 