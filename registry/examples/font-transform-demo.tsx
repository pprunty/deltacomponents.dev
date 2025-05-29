import { FontTransform } from "@/registry/animations/font-transform"

export default function FontTransformDemo() {
  return (
    <div className="flex flex-col items-center justify-center bg-background w-full">
      <p className="mb-4 text-center">
        Hover over the text to see the effect in action. It is only visible on
        desktop.
      </p>
      <FontTransform className="text-3xl md:text-6xl font-bold text-center">
        Delta Components
      </FontTransform>
    </div>
  )
}
