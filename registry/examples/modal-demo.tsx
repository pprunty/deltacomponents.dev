"use client"

import * as React from "react"
import { useState } from "react"
import Modal from "@/delta/modal"

import { Button } from "@/components/ui/button"

export default function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <Button onClick={openModal} className="w-40">
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Example Modal"
        subtitle="This modal uses scale animation with overlay"
        type="overlay"
        borderBottom
        showCloseButton
      >
        <p className="mb-4 text-muted-foreground">
          This is an example modal component with a scale animation effect. When
          you open it, the modal scales up from the center with a smooth
          animation.
        </p>

        <p className="mb-6 text-muted-foreground">
          The overlay background creates a semi-transparent dark layer behind
          the modal to help focus attention on the modal content.
        </p>

        <div className="flex justify-end">
          <Button onClick={closeModal} variant="outline" className="mr-2">
            Cancel
          </Button>
          <Button onClick={closeModal}>Confirm</Button>
        </div>
      </Modal>
    </div>
  )
}
