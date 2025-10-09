import { CardDeck } from "@/registry/delta-ui/ui/card-deck"

export default function CardDeckDemoInteractive() {
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
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      alt: "Mountain View",
    },
    {
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop",
      alt: "Forest",
    },
  ]

  return (
    <div className="flex h-full w-full items-center justify-center">
      <CardDeck images={images} infinite={true} autoplay />
    </div>
  )
}
