"use client"

import * as React from "react"
import { FileInput } from "@/delta/file-input"

export default function FileInputDemo() {
  return (
    <div className="w-full min-w-[320px] max-w-md mx-auto p-4">
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
