"use client"

import React from "react"

import { FileInput } from "@/registry/inputs/file-input"

export default function FileInputMultipleDemo() {
  return (
    <div className="w-full min-w-[320px] max-w-md mx-auto p-4">
      <FileInput
        label="Upload Multiple Files"
        name="multipleFiles"
        multiple={true}
        maxFiles={5}
        accept=".pdf,.jpg,.png,.docx"
        hint="You can upload up to 5 files"
      />
    </div>
  )
}
