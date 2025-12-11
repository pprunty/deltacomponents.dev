"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import {
  ProductCard,
  ProductCardContent,
  ProductCardHeader,
  ProductCardImage,
  ProductCardMetric,
  ProductCardSubtitle,
  ProductCardTitle,
} from "@/registry/delta-ui/delta/product-card"
import { Badge } from "@/registry/delta-ui/ui/badge"

export function ProductCardCustomDemo() {
  const amazonUrl =
    "https://www.amazon.com/Creative-Act-Way-Being/dp/0593652886"

  return (
    <div className="flex w-full justify-center">
      <Link href={amazonUrl} target="_blank" rel="noopener noreferrer">
        <ProductCard size="small">
          <ProductCardImage
            src="https://pictures.abebooks.com/isbn/9781838858636-uk.jpg"
            alt="The Creative Act: A Way of Being"
          >
            <div className="absolute top-3 right-3 z-10">
              <span
                className="bg-secondary text-secondary-foreground flex size-8 items-center justify-center rounded-full"
                aria-label="View on Amazon"
              >
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </ProductCardImage>

          <ProductCardContent>
            <ProductCardHeader>
              <ProductCardTitle>
                The Creative Act: A Way of Being
              </ProductCardTitle>
              <ProductCardSubtitle className="flex flex-wrap gap-1 pt-1">
                <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                  Creativity
                </Badge>
                <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                  Self-Help
                </Badge>
                <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                  Art
                </Badge>
              </ProductCardSubtitle>
            </ProductCardHeader>
            <ProductCardMetric>$18</ProductCardMetric>
          </ProductCardContent>
        </ProductCard>
      </Link>
    </div>
  )
}
