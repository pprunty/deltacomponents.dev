import {
  CardDeckContainer,
  CardDeckItem,
} from "@/registry/delta-ui/delta/card-deck"

export default function CardDeckBalatroDemo() {
  const images = [
    {
      src: "/images/stock/balatro/ace.webp",
      alt: "Balatro Ace Card",
    },
    {
      src: "/images/stock/balatro/king.png",
      alt: "Balatro King Card",
    },
    {
      src: "/images/stock/balatro/queen.png",
      alt: "Balatro Queen Card",
    },
    {
      src: "/images/stock/balatro/joker.png",
      alt: "Balatro Joker Card",
    },
    {
      src: "/images/stock/balatro/4.png",
      alt: "Balatro Four Card",
    },
  ]

  return (
    <div className="my-6 flex h-full w-full items-center justify-center p-12">
      <CardDeckContainer infinite={false}>
        {images.map((image, index) => (
          <CardDeckItem key={index} className="rounded-none">
            <img
              className="h-auto w-full object-cover"
              src={image.src}
              alt={image.alt}
            />
          </CardDeckItem>
        ))}
      </CardDeckContainer>
    </div>
  )
}
