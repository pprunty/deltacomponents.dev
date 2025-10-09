import { CardDeck } from "@/registry/delta-ui/ui/card-deck"

export default function CardDeckDemo() {
  const images = [
    {
      src: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=400&h=600&fit=crop",
      alt: "Coffee Cup",
    },
    {
      src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=600&fit=crop",
      alt: "Mountain Lake",
    },
    {
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop",
      alt: "Nature Path",
    },
  ]

  return (
    <div className="flex h-full w-full items-center justify-center">
      <CardDeck images={images} infinite={false} />
    </div>
  )
}
