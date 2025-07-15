"use client"

import React from "react"

import { FileInput } from "@/delta/file-input"

export default function FileInputPreviewDemo() {
  return (
    <div className="w-full min-w-[320px] max-w-md mx-auto p-4">
      <FileInput
        label="File Type Icons Preview"
        name="previewFiles"
        multiple={true}
        maxFiles={8}
        showPreviews={true}
        showIcons={true}
        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.mp3,.mp4"
        hint="Upload different file types to see their custom SVG icons: Word docs, Excel files, PDFs, PowerPoint, MP3/MP4 files, and images"
      />
    </div>
  )
}
