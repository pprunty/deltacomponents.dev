"use client"

import * as React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import Modal from "@/delta/modal"

export default function ModalBlurDemo() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <Button onClick={openModal} className="w-40">
        Open Blur Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Blur Modal"
        subtitle="This modal uses blur background effect"
        type="blur"
        animationType="scale"
        borderBottom
        showCloseButton
      >
        <p className="mb-4 text-muted-foreground">
          This modal uses a blur effect for the background. Instead of a dark
          overlay, it applies a semi-transparent blur to the content behind the
          modal.
        </p>

        <p className="mb-6 text-muted-foreground">
          This creates a frosted glass effect that keeps the context visible but
          out of focus, directing attention to the modal content while
          maintaining visual connection with the page.
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
