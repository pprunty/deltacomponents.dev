"use client"

import type React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"
import { Admonition } from "@/delta/components/admonition"
import type { ComponentPreview } from "@/lib/registry/schema"
import { ClipLoader } from "react-spinners"
import NeobrutalismCardBasicDemo from "@/delta/examples/neobrutalism-card-basic-demo"
import SmartFormPaymentDemo from "@/delta/examples/smart-form-payment-demo"
import CodeBlockBasicDemo from "@/delta/examples/code-block-basic-demo"
import ButtonBasicDemo from "@/delta/examples/button-basic-demo"
import TabsBasicDemo from "@/delta/examples/tabs-basic-demo"
import TextInputBasicDemo from "@/delta/examples/text-input-basic-demo"
import SelectInputBasicDemo from "@/delta/examples/select-input-basic-demo"
import BackButtonBasicDemo from "@/delta/examples/back-button-basic-demo"
import SwitchInputBasicDemo from "@/delta/examples/switch-input-basic-demo"
import OtpInputBasicDemo from "@/delta/examples/otp-input-basic-demo"
import ScrambleInObserverDemo from "@/delta/examples/scramble-in-observer-demo"
import TextareaInputBasicDemo from "@/delta/examples/textarea-input-basic-demo"
import DateInputBasicDemo from "@/delta/examples/date-input-basic-demo"
import FileInputBasicDemo from "@/delta/examples/file-input-basic-demo"
import FloatingButtonBasicDemo from "@/delta/examples/floating-button-basic-demo"
import CheckboxInputBasicDemo from "@/delta/examples/checkbox-input-basic-demo"
import RadioInputBasicDemo from "@/delta/examples/radio-input-basic-demo"
import ModalBasicDemo from "@/delta/examples/modal-basic-demo"
import ShareButtonBasicDemo from "@/delta/examples/share-button-basic-demo"
import AccordionBasicDemo from "@/delta/examples/accordion-basic-demo"

// Component mapping - maps component names to their implementations
const componentMap: Record<string, React.ReactNode> = {
  // Admonition examples - all using solid variant
  admonition: (
    <div className="space-y-4 w-[380px]">
      {/* Info admonition (solid) */}
      <Admonition type="info" solid>
        This is an info admonition with solid styling. It provides additional information that might be helpful.
      </Admonition>

      {/* Warning admonition (solid) */}
      <Admonition type="warning" title="Custom Warning Title" solid>
        This is a warning admonition with a custom title. It alerts users about potential issues.
      </Admonition>

      {/* Danger admonition (solid) */}
      <Admonition type="danger" solid>
        This is a solid danger admonition. It indicates a critical error or important warning.
      </Admonition>
    </div>
  ),
  "neobrutalism-card": <NeobrutalismCardBasicDemo />,
  "smart-form": <SmartFormPaymentDemo />,
  "code-block": <CodeBlockBasicDemo />,
  button: <ButtonBasicDemo />,
  tabs: <TabsBasicDemo />,
  "text-input": <TextInputBasicDemo />,
  "select-input": <SelectInputBasicDemo />,
  "back-button": <BackButtonBasicDemo />,
  "switch-input": <SwitchInputBasicDemo />,
  "otp-input": <OtpInputBasicDemo />,
  "scramble-in": <ScrambleInObserverDemo />,
  "textarea-input": <TextareaInputBasicDemo />,
  "date-input": <DateInputBasicDemo />,
  "file-input": <FileInputBasicDemo />,
  "floating-button": <FloatingButtonBasicDemo />,
  "checkbox-input": <CheckboxInputBasicDemo />,
  "radio-input": <RadioInputBasicDemo />,
  "modal": <ModalBasicDemo />,
  "share-button": <ShareButtonBasicDemo />,
  "accordion": <AccordionBasicDemo />,
}

interface ComponentPreviewProps {
  title: string
  name: string
  badge?: React.ReactNode
}

export function ComponentPreview({ title, name, badge }: ComponentPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState(false)

  // Set up the portal container
  useEffect(() => {
    if (containerRef.current && !portalContainer) {
      const container = document.createElement("div")
      container.className = "component-portal-container absolute inset-0 flex items-center justify-center"
      containerRef.current.appendChild(container)
      setPortalContainer(container)
    }

    return () => {
      if (portalContainer) {
        portalContainer.remove()
      }
    }
  }, [portalContainer])

  // Handle mounting state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine if we have a component implementation for this name
  const hasComponent = name in componentMap

  return (
    <div className="group flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-base font-medium text-primary sm:group-hover:underline sm:group-active:underline cursor-pointer">
          {title}
        </h2>
        {badge}
      </div>

      <Link href={`/docs/${name}`} className="block">
        <Card className="p-4 rounded-xl border border-border shadow-none overflow-hidden relative will-change-transform">
          <div className="absolute inset-0 bg-accent/60" />

          <div
            ref={containerRef}
            className="relative z-10 w-full h-[200px] sm:h-[120px] transform-gpu transition-transform duration-300 sm:group-hover:translate-y-[-4px] sm:group-active:translate-y-[-4px]"
          >
            {mounted && hasComponent && portalContainer ? (
              createPortal(
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center relative">
                    <FitContainer>{componentMap[name]}</FitContainer>
                    <div className="absolute inset-0 z-10 cursor-pointer" />
                  </div>
                </div>,
                portalContainer,
              )
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <ClipLoader size={20} color="var(--foreground)" />
                <div className="text-muted-foreground text-center text-xs">Loading component...</div>
              </div>
            )}
          </div>
        </Card>
      </Link>
    </div>
  )
}

// Component that automatically scales its children to fit within the container
function FitContainer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current || !contentRef.current) return

      const containerWidth = containerRef.current.clientWidth
      const containerHeight = containerRef.current.clientHeight
      const contentWidth = contentRef.current.scrollWidth
      const contentHeight = contentRef.current.scrollHeight

      // Calculate scale factors for width and height
      const widthScale = containerWidth / contentWidth
      const heightScale = containerHeight / contentHeight

      // Balanced approach - ensure content fits completely while maximizing size
      // Use 96% of the available space to ensure a small margin
      const newScale = Math.min(widthScale, heightScale) * 0.96

      setScale(newScale)
    })

    resizeObserver.observe(containerRef.current)
    resizeObserver.observe(contentRef.current)

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
      <div ref={contentRef} style={{ transform: `scale(${scale})` }} className="origin-center">
        {children}
      </div>
    </div>
  )
}

export const componentPreviewData: Record<string, ComponentPreview> = {
  admonition: {
    name: "Admonition",
    description: "A versatile admonition component for displaying important information, warnings, tips, and notes.",
    dependencies: ["@phosphor-icons/react"],
    registryDependencies: [],
    files: ["delta/components/admonition.tsx"],
    type: "components",
    category: "Feedback",
    subcategory: "Alert",
    example: "delta/examples/admonition-basic-demo.tsx",
    style: "default",
  },
  "neobrutalism-card": {
    name: "Neobrutalism Card",
    description: "A card component with a neobrutalism design style, featuring bold borders and shadows.",
    dependencies: [],
    registryDependencies: [],
    files: ["delta/components/neobrutalism-card.tsx"],
    type: "components",
    category: "Layout",
    subcategory: "Card",
    example: "delta/examples/neobrutalism-card-basic-demo.tsx",
    style: "neobrutalism",
  },
  "smart-form": {
    name: "Smart Form",
    description: "An intelligent form component with built-in validation and error handling.",
    dependencies: [],
    registryDependencies: [],
    files: ["delta/components/smart-form.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "delta/examples/smart-form-payment-demo.tsx",
    style: "default",
  },
  "code-block": {
    name: "Code Block",
    description: "A syntax-highlighted code block component for displaying code snippets.",
    dependencies: [],
    registryDependencies: [],
    files: ["delta/components/code-block.tsx"],
    type: "components",
    category: "Display",
    subcategory: "Code",
    example: "delta/examples/code-block-basic-demo.tsx",
    style: "default",
  },
  button: {
    name: "Button",
    description: "A versatile button component with multiple variants and styles.",
    dependencies: [],
    registryDependencies: [],
    files: ["delta/components/button.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Button",
    example: "delta/examples/button-basic-demo.tsx",
    style: "default",
  },
  tabs: {
    name: "Tabs",
    description: "A tabbed interface component for organizing content into sections.",
    dependencies: [],
    registryDependencies: [],
    files: ["delta/components/tabs.tsx"],
    type: "components",
    category: "Navigation",
    subcategory: "Tabs",
    example: "delta/examples/tabs-basic-demo.tsx",
    style: "default",
  },
  "text-input": {
    name: "Text Input",
    description: "A customizable text input component with various states and styles.",
    dependencies: [],
    registryDependencies: [],
    files: ["delta/components/text-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "delta/examples/text-input-basic-demo.tsx",
    style: "default",
  },
  "select-input": {
    name: "Select Input",
    description: "A dropdown select component with customizable options and styling.",
    dependencies: [],
    registryDependencies: [],
    files: ["delta/components/select-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "delta/examples/select-input-basic-demo.tsx",
    style: "default",
  },
  "back-button": {
    name: "Back Button",
    description: "A smart back button component that intelligently handles navigation history with a fallback to root.",
    dependencies: ["@phosphor-icons/react"],
    registryDependencies: [],
    files: ["delta/components/back-button.tsx"],
    type: "components",
    category: "Navigation",
    subcategory: "Button",
    example: "delta/examples/back-button-basic-demo.tsx",
    style: "default",
  },
  "switch-input": {
    name: "Switch Input",
    description: "A customizable switch input component with validation, variants, and accessibility features.",
    dependencies: [],
    registryDependencies: [],
    files: ["delta/components/switch-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "delta/examples/switch-input-basic-demo.tsx",
    style: "default",
  },
  "textarea-input": {
    name: "Textarea Input",
    description: "A customizable textarea input component with validation support, multiple style variants, and accessibility features.",
    dependencies: [],
    registryDependencies: [],
    files: ["delta/components/textarea-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "delta/examples/textarea-input-basic-demo.tsx",
    style: "default",
  },
  "date-input": {
    name: "Date Input",
    description: "A flexible date input component with an integrated calendar picker, validation support, and customizable styling options.",
    dependencies: [],
    registryDependencies: [],
    files: ["delta/components/date-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "delta/examples/date-input-basic-demo.tsx",
    style: "default",
  },
  "file-input": {
    name: "File Input",
    description: "A versatile file input component with drag-and-drop support, file previews, validation, and multiple style variants.",
    dependencies: ["@phosphor-icons/react"],
    registryDependencies: [],
    files: ["delta/components/file-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "delta/examples/file-input-basic-demo.tsx",
    style: "default",
  },
  "floating-button": {
    name: "Floating Button",
    description: "A versatile floating button component with customizable position, tooltip support, and responsive behavior.",
    dependencies: ["@phosphor-icons/react"],
    registryDependencies: [],
    files: ["delta/components/floating-button.tsx"],
    type: "components",
    category: "Navigation",
    subcategory: "Button",
    example: "delta/examples/floating-button-basic-demo.tsx",
    style: "default",
  },
  "checkbox-input": {
    name: "Checkbox Input",
    description: "A customizable checkbox input component with validation support, error handling, and accessibility features.",
    dependencies: [],
    registryDependencies: [],
    files: ["delta/components/checkbox-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "delta/examples/checkbox-input-basic-demo.tsx",
    style: "default",
  },
  "radio-input": {
    name: "Radio Input",
    description: "A customizable radio input component with validation support, orientation options, and accessibility features.",
    dependencies: [],
    registryDependencies: [],
    files: ["delta/components/radio-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "delta/examples/radio-input-basic-demo.tsx",
    style: "default",
  },
  "modal": {
    name: "Modal",
    description: "A versatile modal component with customizable overlay, animations, and multiple content layout options.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: [],
    files: ["delta/components/modal.tsx"],
    type: "components",
    category: "Overlay",
    subcategory: "Dialog",
    example: "delta/examples/modal-basic-demo.tsx",
    style: "default",
  },
  "share-button": {
    name: "Share Button",
    description: "A versatile share button component with customizable position, tooltip support, and responsive behavior.",
    dependencies: ["@phosphor-icons/react"],
    registryDependencies: [],
    files: ["delta/components/share-button.tsx"],
    type: "components",
    category: "Navigation",
    subcategory: "Button",
    example: "delta/examples/share-button-basic-demo.tsx",
    style: "default",
  },
}
