"use client"

import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import Modal from "@/registry/components/modal"

export default function ModalNoOverlayCloseDemo() {
  const [isEasyCloseOpen, setIsEasyCloseOpen] = useState(false)
  const [isNoEasyCloseOpen, setIsNoEasyCloseOpen] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {/* Easy Close Modal */}
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-sm font-medium text-center">
            Easy Close Enabled
          </h3>
          <Button onClick={() => setIsEasyCloseOpen(true)} className="w-40">
            Open Modal
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Click overlay or press ESC to close
          </p>
        </div>

        {/* No Easy Close Modal */}
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-sm font-medium text-center">
            Easy Close Disabled
          </h3>
          <Button onClick={() => setIsNoEasyCloseOpen(true)} className="w-40">
            Open Modal
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Must use close button to close
          </p>
        </div>
      </div>

      {/* Easy Close Modal */}
      <Modal
        isOpen={isEasyCloseOpen}
        onClose={() => setIsEasyCloseOpen(false)}
        title="Easy Close Modal"
        subtitle="Click overlay or press ESC to close"
        allowEasyClose={true}
      >
        <p className="mb-4 text-muted-foreground">
          This modal can be closed by clicking the overlay background or
          pressing the ESC key.
        </p>
        <p className="mb-6 text-muted-foreground">
          Try clicking outside the modal or pressing ESC to see it in action.
        </p>
        <div className="flex justify-end">
          <Button onClick={() => setIsEasyCloseOpen(false)} variant="outline">
            Close with Button
          </Button>
        </div>
      </Modal>

      {/* No Easy Close Modal */}
      <Modal
        isOpen={isNoEasyCloseOpen}
        onClose={() => setIsNoEasyCloseOpen(false)}
        title="No Easy Close Modal"
        subtitle="Only the close button will work"
        allowEasyClose={false}
      >
        <p className="mb-4 text-muted-foreground">
          This modal cannot be closed by clicking the overlay or pressing ESC.
        </p>
        <p className="mb-6 text-muted-foreground">
          Try clicking outside or pressing ESC - nothing will happen. You must
          use the close button.
        </p>
        <div className="flex justify-end">
          <Button onClick={() => setIsNoEasyCloseOpen(false)}>
            Close Modal
          </Button>
        </div>
      </Modal>
    </div>
  )
}
