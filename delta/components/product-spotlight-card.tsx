import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface ProductSpotlightCardProps {
  imageSrc: string
  imageAlt: string
  title?: string
  description?: string
  href?: string
  className?: string
  sizes?: string
}

const ProductSpotlightCard = ({
  imageSrc,
  imageAlt,
  title,
  description,
  href = "",
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 192px",
}: ProductSpotlightCardProps) => {
  return (
    <div className={cn("group flex flex-col", className)}>
      {href ? (
        <Link href={href} className="block outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl">
          <Card className="p-8 mb-5 rounded-xl border-none shadow-none hover:shadow-sm transition-all duration-300 ease-in-out overflow-hidden relative">
            {/* Gradient background */}
            <div
              className="absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              style={{
                background:
                  "radial-gradient(circle, transparent 0%, hsl(var(--primary)/0.03) 50%, hsl(var(--primary)/0.06) 100%)",
              }}
            />

            <div className="flex items-center justify-center relative z-10">
              <div className="relative w-48 h-48 transition-transform duration-300 ease-in-out group-hover:translate-y-[-4px]">
                <Image
                  src={imageSrc || "/placeholder.svg"}
                  alt={imageAlt}
                  fill
                  className="object-contain"
                  sizes={sizes}
                  priority={false}
                />
              </div>
            </div>
          </Card>
        </Link>
      ) : (
        <div className="block rounded-xl">
          <Card className="p-8 mb-5 rounded-xl border-none shadow-none hover:shadow-sm transition-all duration-300 ease-in-out overflow-hidden relative">
            {/* Gradient background */}
            <div
              className="absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              style={{
                background:
                  "radial-gradient(circle, transparent 0%, hsl(var(--primary)/0.03) 50%, hsl(var(--primary)/0.06) 100%)",
              }}
            />

            <div className="flex items-center justify-center relative z-10">
              <div className="relative w-48 h-48 transition-transform duration-300 ease-in-out group-hover:translate-y-[-4px]">
                <Image
                  src={imageSrc || "/placeholder.svg"}
                  alt={imageAlt}
                  fill
                  className="object-contain"
                  sizes={sizes}
                  priority={false}
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Content section - only render if title or description exists */}
      {(title || description) && (
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-foreground" />
            {href ? (
              <Link href={href} className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
                {title && (
                  <h3 className="text-xl font-semibold leading-tight text-foreground max-w-xs group-hover:underline">
                    {title}
                  </h3>
                )}
              </Link>
            ) : (
              <div>
                {title && (
                  <h3 className="text-xl font-semibold leading-tight text-foreground max-w-xs">
                    {title}
                  </h3>
                )}
              </div>
            )}
          </div>
          {description && (
            <p className="text-lg font-medium leading-snug text-muted-foreground max-w-xs mt-1">{description}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductSpotlightCard
