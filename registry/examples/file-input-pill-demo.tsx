"use client"

import React from "react"

import { FileInput } from "@/delta/file-input"

export default function FileInputPillDemo() {
  return (
    <div className="w-full min-w-[320px] max-w-md mx-auto p-4">
      <FileInput
        label="Upload Files (Pill Style)"
        name="pillFiles"
        variant="pill"
        accept=".jpg,.png,.pdf"
        hint="Pill variant with colored border"
      />
    </div>
  )
}
