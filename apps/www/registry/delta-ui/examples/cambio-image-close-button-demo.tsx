import { CambioImage } from "@/registry/delta-ui/delta/cambio-image"

export default function CambioImageCloseButtonDemo() {
  return (
    <div className="mx-auto w-full max-w-md">
      <CambioImage
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop"
        alt="Mountain landscape"
        width={1200}
        height={900}
        controls
        className="rounded-md"
      />
    </div>
  )
}
