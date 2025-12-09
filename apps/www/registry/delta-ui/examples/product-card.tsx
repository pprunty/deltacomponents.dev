import { ProductCard } from "@/registry/delta-ui/delta/product-card"

export default function ProductCardExample() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="space-y-2 text-center">
        <h3 className="text-lg font-semibold">ProductCard Demo</h3>
        <p className="text-muted-foreground text-sm">
          Interactive example of the ProductCard component
        </p>
      </div>
      <ProductCard>Demo content for ProductCard</ProductCard>
    </div>
  )
}
