"use client"

import type React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"
import { Admonition } from "@/registry/ui/admonition"
import type { ComponentPreview } from "@/lib/registry/schema"
import { ClipLoader } from "react-spinners"
import NeobrutalismCardBasicDemo from "@/registry/examples/neobrutalism-card-basic-demo"
import SmartFormPaymentDemo from "@/registry/examples/smart-form-payment-demo"
import CodeBlockBasicDemo from "@/registry/examples/code-block-basic-demo"
import ButtonBasicDemo from "@/registry/examples/button-basic-demo"
import TabsBasicDemo from "@/registry/examples/tabs-basic-demo"
import TextInputBasicDemo from "@/registry/examples/text-input-basic-demo"
import SelectInputBasicDemo from "@/registry/examples/select-input-basic-demo"
import BackButtonBasicDemo from "@/registry/examples/back-button-basic-demo"
import SwitchInputBasicDemo from "@/registry/examples/switch-input-basic-demo"
import OtpInputBasicDemo from "@/registry/examples/otp-input-basic-demo"
import ScrambleInObserverDemo from "@/registry/examples/scramble-in-observer-demo"
import TextareaInputBasicDemo from "@/registry/examples/textarea-input-basic-demo"
import DateInputBasicDemo from "@/registry/examples/date-input-basic-demo"
import FileInputBasicDemo from "@/registry/examples/file-input-basic-demo"
import FloatingButtonBasicDemo from "@/registry/examples/floating-button-basic-demo"
import CheckboxInputBasicDemo from "@/registry/examples/checkbox-input-basic-demo"
import RadioInputBasicDemo from "@/registry/examples/radio-input-basic-demo"
import ModalBasicDemo from "@/registry/examples/modal-basic-demo"

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
}

interface ComponentPreviewProps {
  title: string
  name: string
  badge?: React.ReactNode
}

export function ComponentPreview({ title, name, badge }: ComponentPreviewProps) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null)

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
        <h2 className="text-base font-medium text-primary group-hover:underline group-active:underline cursor-pointer">
          {title}
        </h2>
        {badge}
      </div>

      <Link href={`/docs/${name}`} className="block">
        {/* Fixed Card with consistent border and transform-gpu for hardware acceleration */}
        <Card className="p-4 rounded-xl border border-border shadow-none overflow-hidden relative will-change-transform">
          {/* Solid background - replacing gradient */}
          <div className="absolute inset-0 bg-accent/30" />

          {/* Commented out gradient background - keep for later if needed
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle, transparent 0%, hsl(var(--accent)/0.8) 50%, hsl(var(--accent)) 100%)",
            }}
          />
          */}

          {/* Container for the component or image - fixed transform with translate3d for better performance */}
          <div
            ref={containerRef}
            className="relative z-10 w-full h-[200px] sm:h-[120px] transform-gpu transition-transform duration-300 group-hover:translate-y-[-4px] group-active:translate-y-[-4px]"
          >
            {mounted && hasComponent && portalContainer ? (
              // Render the component using a portal if we have a mapping for it
              createPortal(
                <div className="w-full h-full flex items-center justify-center">
                  {/* Balanced width and height */}
                  <div className="w-full h-full flex items-center justify-center relative">
                    <FitContainer>{componentMap[name]}</FitContainer>

                    {/* Transparent overlay to prevent interaction with the component */}
                    <div className="absolute inset-0 z-10 cursor-pointer" />
                  </div>
                </div>,
                portalContainer,
              )
            ) : (
              // Loading spinner when component is loading
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
    files: ["registry/ui/admonition.tsx"],
    type: "components",
    category: "Feedback",
    subcategory: "Alert",
    example: "registry/examples/admonition-basic-demo.tsx",
    style: "default",
  },
  "neobrutalism-card": {
    name: "Neobrutalism Card",
    description: "A card component with a neobrutalism design style, featuring bold borders and shadows.",
    dependencies: [],
    registryDependencies: [],
    files: ["registry/ui/neobrutalism-card.tsx"],
    type: "components",
    category: "Layout",
    subcategory: "Card",
    example: "registry/examples/neobrutalism-card-basic-demo.tsx",
    style: "neobrutalism",
  },
  "smart-form": {
    name: "Smart Form",
    description: "An intelligent form component with built-in validation and error handling.",
    dependencies: [],
    registryDependencies: [],
    files: ["registry/ui/smart-form.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "registry/examples/smart-form-payment-demo.tsx",
    style: "default",
  },
  "code-block": {
    name: "Code Block",
    description: "A syntax-highlighted code block component for displaying code snippets.",
    dependencies: [],
    registryDependencies: [],
    files: ["registry/ui/code-block.tsx"],
    type: "components",
    category: "Display",
    subcategory: "Code",
    example: "registry/examples/code-block-basic-demo.tsx",
    style: "default",
  },
  button: {
    name: "Button",
    description: "A versatile button component with multiple variants and styles.",
    dependencies: [],
    registryDependencies: [],
    files: ["registry/ui/button.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Button",
    example: "registry/examples/button-basic-demo.tsx",
    style: "default",
  },
  tabs: {
    name: "Tabs",
    description: "A tabbed interface component for organizing content into sections.",
    dependencies: [],
    registryDependencies: [],
    files: ["registry/ui/tabs.tsx"],
    type: "components",
    category: "Navigation",
    subcategory: "Tabs",
    example: "registry/examples/tabs-basic-demo.tsx",
    style: "default",
  },
  "text-input": {
    name: "Text Input",
    description: "A customizable text input component with various states and styles.",
    dependencies: [],
    registryDependencies: [],
    files: ["registry/ui/text-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "registry/examples/text-input-basic-demo.tsx",
    style: "default",
  },
  "select-input": {
    name: "Select Input",
    description: "A dropdown select component with customizable options and styling.",
    dependencies: [],
    registryDependencies: [],
    files: ["registry/ui/select-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "registry/examples/select-input-basic-demo.tsx",
    style: "default",
  },
  "back-button": {
    name: "Back Button",
    description: "A smart back button component that intelligently handles navigation history with a fallback to root.",
    dependencies: ["@phosphor-icons/react"],
    registryDependencies: [],
    files: ["registry/ui/back-button.tsx"],
    type: "components",
    category: "Navigation",
    subcategory: "Button",
    example: "registry/examples/back-button-basic-demo.tsx",
    style: "default",
  },
  "switch-input": {
    name: "Switch Input",
    description: "A customizable switch input component with validation, variants, and accessibility features.",
    dependencies: [],
    registryDependencies: [],
    files: ["registry/ui/switch-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "registry/examples/switch-input-basic-demo.tsx",
    style: "default",
  },
  "textarea-input": {
    name: "Textarea Input",
    description: "A customizable textarea input component with validation support, multiple style variants, and accessibility features.",
    dependencies: [],
    registryDependencies: [],
    files: ["registry/ui/textarea-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "registry/examples/textarea-input-basic-demo.tsx",
    style: "default",
  },
  "date-input": {
    name: "Date Input",
    description: "A flexible date input component with an integrated calendar picker, validation support, and customizable styling options.",
    dependencies: [],
    registryDependencies: [],
    files: ["registry/ui/date-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "registry/examples/date-input-basic-demo.tsx",
    style: "default",
  },
  "file-input": {
    name: "File Input",
    description: "A versatile file input component with drag-and-drop support, file previews, validation, and multiple style variants.",
    dependencies: ["@phosphor-icons/react"],
    registryDependencies: [],
    files: ["registry/ui/file-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "registry/examples/file-input-basic-demo.tsx",
    style: "default",
  },
  "floating-button": {
    name: "Floating Button",
    description: "A versatile floating button component with customizable position, tooltip support, and responsive behavior.",
    dependencies: ["lucide-react"],
    registryDependencies: [],
    files: ["registry/ui/floating-button.tsx"],
    type: "components",
    category: "Navigation",
    subcategory: "Button",
    example: "registry/examples/floating-button-basic-demo.tsx",
    style: "default",
  },
  "checkbox-input": {
    name: "Checkbox Input",
    description: "A customizable checkbox input component with validation support, error handling, and accessibility features.",
    dependencies: [],
    registryDependencies: [],
    files: ["registry/ui/checkbox-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "registry/examples/checkbox-input-basic-demo.tsx",
    style: "default",
  },
  "radio-input": {
    name: "Radio Input",
    description: "A customizable radio input component with validation support, orientation options, and accessibility features.",
    dependencies: [],
    registryDependencies: [],
    files: ["registry/ui/radio-input.tsx"],
    type: "components",
    category: "Form",
    subcategory: "Input",
    example: "registry/examples/radio-input-basic-demo.tsx",
    style: "default",
  },
  "modal": {
    name: "Modal",
    description: "A versatile modal component with customizable overlay, animations, and multiple content layout options.",
    dependencies: ["framer-motion", "lucide-react"],
    registryDependencies: [],
    files: ["registry/ui/modal.tsx"],
    type: "components",
    category: "Overlay",
    subcategory: "Dialog",
    example: "registry/examples/modal-basic-demo.tsx",
    style: "default",
  },
}
