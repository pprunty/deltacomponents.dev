"use client"

import { CambioImage } from "@/registry/delta-ui/delta/cambio-image"

export function CambioImageDismissOnScrollDemo() {
  return (
    <div className="w-[300px]">
      <CambioImage
        src="/images/stock/f3708938cd8eb2db8054906ea8008af4.png"
        alt="Impressionist painting of hikers in a colorful mountain canyon"
        width={600}
        height={600}
        motion="snappy"
        dismissible={false}
        dismissOnScroll={true}
      />
    </div>
  )
}
