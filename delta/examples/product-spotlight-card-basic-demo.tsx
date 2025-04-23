import ProductCard from "@/delta/components/product-spotlight-card"

export default function ProductSpotlightCardBasicDemo() {
  return (
    <div className="max-w-md mx-auto">
        <ProductCard
          imageSrc="/stock/switch.png"
          imageAlt="Nintendo Switch"
        />
    </div>
  )
}
