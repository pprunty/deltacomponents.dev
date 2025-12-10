"use client"

import * as React from "react"

import {
  ProductCard,
  ProductCardBadge,
  ProductCardContent,
  ProductCardHeader,
  ProductCardImage,
  ProductCardMetric,
  ProductCardSubtitle,
  ProductCardTitle,
} from "@/registry/delta-ui/delta/product-card"

export function ProductCardDemo() {
  const [isWishlisted, setIsWishlisted] = React.useState(false)

  return (
    <div className="w-full max-w-xs">
      <ProductCard>
        <ProductCardImage
          src="https://what-i-love-now.vercel.app/_next/image?url=%2Fimages%2Ftwemco-clock.png&w=3840&q=75"
          alt="Twemco Clock"
        >
          <ProductCardBadge
            icon="✦"
            isActive={isWishlisted}
            onClick={() => setIsWishlisted(!isWishlisted)}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            Wishlist
          </ProductCardBadge>
        </ProductCardImage>

        <ProductCardContent>
          <ProductCardHeader>
            <ProductCardTitle>Twemco Clock</ProductCardTitle>
            <ProductCardSubtitle>Clock</ProductCardSubtitle>
          </ProductCardHeader>
          <ProductCardMetric>12</ProductCardMetric>
        </ProductCardContent>
      </ProductCard>
    </div>
  )
}
