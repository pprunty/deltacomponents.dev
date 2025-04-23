"use client"

import { Button } from "@/delta/components/button"
import { ArrowRight, Save, Trash, Download } from "lucide-react"

export default function ButtonIconOnlyDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Button
        variant="primary"
        icon={<ArrowRight className="w-4 h-4" />}
      />

      <Button
        variant="secondary"
        icon={<Save className="w-4 h-4" />}
      />

      <Button
        variant="destructive"
        icon={<Trash className="w-4 h-4" />}
      />

      <Button
        variant="action"
        icon={<Download className="w-4 h-4" />}
      />
    </div>
  )
} 