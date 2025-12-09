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

export function ProductCardInnerDemo() {
  const [isWishlisted, setIsWishlisted] = React.useState(false)

  return (
    <div className="w-full max-w-xs">
      <ProductCard variant="inner">
        <ProductCardImage
          src="https://what-i-love-now.vercel.app/_next/image?url=%2Fimages%2Ftwemco-clock.png&w=3840&q=75"
          alt="Twemco Clock"
          unoptimized
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

          <ProductCardContent>
            <ProductCardHeader>
              <ProductCardTitle>Twemco Clock</ProductCardTitle>
              <ProductCardSubtitle>Clock</ProductCardSubtitle>
            </ProductCardHeader>
            <ProductCardMetric>12</ProductCardMetric>
          </ProductCardContent>
        </ProductCardImage>
      </ProductCard>
    </div>
  )
}
