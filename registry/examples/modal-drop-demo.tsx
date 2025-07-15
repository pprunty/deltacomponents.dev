"use client"

import * as React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import Modal from "@/delta/modal"

export default function ModalDropDemo() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <Button onClick={openModal} className="w-40">
        Open Drop Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Drop Animation Modal"
        subtitle="This modal uses default background with drop animation"
        animationType="drop"
        borderBottom
        showCloseButton
      >
        <p className="mb-4 text-muted-foreground">
          This modal demonstrates the drop animation type. The modal animates in
          from the bottom of the screen with a spring effect.
        </p>

        <p className="mb-6 text-muted-foreground">
          This animation style creates a dynamic entrance that draws attention
          while maintaining context through the blurred background. It's
          particularly effective for action confirmations or important
          notifications.
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
