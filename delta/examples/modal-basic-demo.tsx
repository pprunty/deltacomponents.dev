"use client"

import { useState } from "react"
import { Button } from "@/delta/components/button"
import Modal from "@/delta/components/modal"

export default function ModalBasicDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex items-center justify-center p-4">
      <Button
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
        subtitle="This is a simple modal example"
      >
        <div className="space-y-4">
          <p>This is the modal content. You can put any components or text here.</p>
          
          <div className="flex justify-end">
            <Button
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
