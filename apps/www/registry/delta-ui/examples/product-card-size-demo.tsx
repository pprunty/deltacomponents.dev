"use client"

import {
  ProductCard,
  ProductCardContent,
  ProductCardHeader,
  ProductCardImage,
  ProductCardMetric,
  ProductCardSubtitle,
  ProductCardTitle,
} from "@/registry/delta-ui/delta/product-card"

export function ProductCardSizeDemo() {
  return (
    <div className="w-full">
      <ProductCard size="lg">
        <ProductCardImage
          src="https://assets.curated.supply/Analogue_Pocket.webp"
          alt="Analogue Pocket"
        />

        <ProductCardContent>
          <ProductCardHeader>
            <ProductCardTitle>Analogue Pocket</ProductCardTitle>
            <ProductCardSubtitle>Gaming Console</ProductCardSubtitle>
          </ProductCardHeader>
          <ProductCardMetric>$219</ProductCardMetric>
        </ProductCardContent>
      </ProductCard>
    </div>
  )
}
