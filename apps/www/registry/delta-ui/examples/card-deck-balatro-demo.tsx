import {
  CardDeckContainer,
  CardDeckItem,
} from "@/registry/delta-ui/delta/card-deck"

export default function CardDeckBalatroDemo() {
  const images = [
    {
      src: "/images/balatro/ace.webp",
      alt: "Balatro Ace Card",
    },
    {
      src: "/images/balatro/king.png",
      alt: "Balatro King Card",
    },
    {
      src: "/images/balatro/queen.png",
      alt: "Balatro Queen Card",
    },
    {
      src: "/images/balatro/joker.png",
      alt: "Balatro Joker Card",
    },
    {
      src: "/images/balatro/4.png",
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
