"use client"

import { FileInput } from "@/delta/components/file-input"

export default function FileInputBasicDemo() {
  return (
    <div className="flex flex-col space-y-4 max-w-md mx-auto">
      <FileInput
        label="Upload Document"
        name="document"
        description="Upload a file for your application"
        accept=".pdf,.docx,.jpg,.png"
        hint="Accepted formats: PDF, DOCX, JPG, PNG"
        showIcons={true}
      />
    </div>
  )
}
