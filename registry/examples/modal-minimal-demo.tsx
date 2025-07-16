"use client"

import React, { useState } from "react"
import Modal from "@/delta/modal"
import { Calendar, MessageCircle, User } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ModalMinimalDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Trigger Button */}
      <Button onClick={() => setIsOpen(true)} className="w-40">
        Open Minimal Modal
      </Button>

      {/* Minimal Modal - No title, no close button */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showCloseButton={false}
        animationType="scale"
        disablePadding={false}
      >
        <div className="space-y-6">
          {/* Clean Content */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Quick Update</h3>
            <p className="text-muted-foreground max-w-sm">
              Your settings have been successfully updated. You can now enjoy
              the new features.
            </p>
          </div>

          {/* Information Cards */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Profile Updated</p>
                <p className="text-xs text-muted-foreground">
                  Changes saved automatically
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Next Sync</p>
                <p className="text-xs text-muted-foreground">
                  Scheduled for tomorrow
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button onClick={() => setIsOpen(false)} className="flex-1">
              Got it
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
