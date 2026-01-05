import { CambioImage } from "@/registry/delta-ui/delta/cambio-image"

export default function CambioImageExample() {
  return (
    <div className="flex items-center justify-center p-8">
      <CambioImage
        src="/placeholder.jpg"
        alt="Example image"
        width={800}
        height={600}
      />
    </div>
  )
}
