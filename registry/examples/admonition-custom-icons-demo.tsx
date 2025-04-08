import { Admonition } from "@/registry/ui/admonition"
import { Lightbulb, Rocket, Shield, Zap } from "lucide-react"

export default function AdmonitionCustomIconsDemo() {
  return (
    <div className="space-y-4">
      <Admonition type="info" icon={<Lightbulb className="h-5 w-5" />}>
        Custom icons can help make your admonitions more visually distinctive and memorable.
      </Admonition>
      <Admonition type="tip" icon={<Rocket className="h-5 w-5" />}>
        Using custom icons is a great way to add personality to your application's notifications.
      </Admonition>
      <Admonition type="warning" icon={<Shield className="h-5 w-5" />}>
        Remember to choose icons that are clear and easily recognizable for your users.
      </Admonition>
      <Admonition type="danger" icon={<Zap className="h-5 w-5" />}>
        Custom icons should maintain good contrast and be visible against the admonition background.
      </Admonition>
    </div>
  )
} 