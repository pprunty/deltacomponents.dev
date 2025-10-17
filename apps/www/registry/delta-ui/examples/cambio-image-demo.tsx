import { CambioImage } from "@/registry/delta-ui/delta/cambio-image"

export default function CambioImageDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="m-8 max-w-md">
        <CambioImage
          src="/images/4d26c515-f5f1-43af-a9e5-e2be495ceddb.png"
          alt="Beautiful landscape photography"
          width={1170}
          height={600}
          motion="snappy"
          dismissOnImageClick={true}
        />
      </div>
    </div>
  )
}
