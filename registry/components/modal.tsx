"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  allowEasyClose?: boolean
  title?: string
  subtitle?: string
  type?: "blur" | "overlay" | "none"
  showCloseButton?: boolean
  showEscText?: boolean
  borderBottom?: boolean
  className?: string
  /**
   * Adjust the vertical position of the modal.
   * Positive values move it up, negative values move it down.
   * @default 0
   */
  position?: number
  /**
   * Disable default padding of the modal content.
   * @default false
   */
  disablePadding?: boolean
}


const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  allowEasyClose = true,
  title,
  subtitle,
  type = "overlay",
  showCloseButton = true,
  showEscText = true,
  borderBottom = true,
  className,
  position = 0,
  disablePadding = false,
}) => {
  const getOverlayClasses = () => {
    switch (type) {
      case "blur":
        return "bg-background/60 backdrop-blur-[2px]"
      case "overlay":
        return "bg-black/50"
      case "none":
        return "bg-transparent"
      default:
        return "bg-black/50"
    }
  }

  const getContentClasses = () => {
    const baseClasses = cn(
      "w-auto max-w-[90%] sm:max-w-xl rounded-2xl shadow-lg m-4 p-0",
      type === "none" && "shadow-xl shadow-primary-foreground",
      className
    )
    
    // Position adjustment
    const positionClasses = position !== 0 
      ? `translate-y-[${position}px]` 
      : ""
    
    return cn(baseClasses, positionClasses)
  }

  return (
    <Dialog open={isOpen} onOpenChange={allowEasyClose ? onClose : undefined}>
      <DialogPortal>
        <DialogOverlay 
          className={getOverlayClasses()}
          onClick={allowEasyClose ? onClose : undefined}
        />
        <DialogContent
          className={getContentClasses()}
          onPointerDownOutside={allowEasyClose ? undefined : (e) => e.preventDefault()}
          onEscapeKeyDown={allowEasyClose ? undefined : (e) => e.preventDefault()}
        >
          {/* Custom close button - hide default one */}
          <div className="absolute right-4 top-4 opacity-0 pointer-events-none">
            <X className="size-4" />
          </div>
          
          {title ? (
            <div
              className={cn(
                "flex justify-between p-6 pb-4",
                borderBottom && "border-b border-border",
                subtitle ? "flex-col items-start gap-1" : "items-center"
              )}
            >
              <div>
                <h2 className="text-xl font-semibold">{title}</h2>
                {subtitle && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <div
                  className={cn(
                    "flex items-center gap-2",
                    subtitle && "absolute top-6 right-6"
                  )}
                >
                  {showEscText && (
                    <span className="hidden lg:inline px-2 py-1 text-[11px] font-medium bg-muted text-muted-foreground rounded">
                      ESC
                    </span>
                  )}
                  <button
                    className="p-1 rounded-md hover:bg-muted transition-colors"
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            showCloseButton && (
              <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
                {showEscText && (
                  <span className="hidden lg:inline px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded">
                    ESC
                  </span>
                )}
                <button
                  className="p-1 rounded-md hover:bg-muted transition-colors"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            )
          )}

          <div
            className={cn(!disablePadding && (!title ? "p-6 pt-12" : "p-6"))}
          >
            {children}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default Modal
