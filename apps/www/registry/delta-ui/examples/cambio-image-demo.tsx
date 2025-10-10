import { CambioImage } from "@/registry/delta-ui/ui/cambio-image"

export default function CambioImageDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="m-8 max-w-md">
        <CambioImage
          src="https://images.unsplash.com/photo-1611065695756-1d50152352e5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
