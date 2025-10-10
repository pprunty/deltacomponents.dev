import { CambioImage } from "@/registry/delta-ui/ui/cambio-image"

export default function CambioImageDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="m-8 max-w-md">
        <CambioImage
          src="https://miro.medium.com/v2/resize:fit:1400/0*lPRgnXQFHZVSF8Zq.jpg"
          alt="Beautiful landscape photography"
          width={1170}
          height={600}
          motion="smooth"
          className="rounded-lg"
        />
      </div>
    </div>
  )
}
