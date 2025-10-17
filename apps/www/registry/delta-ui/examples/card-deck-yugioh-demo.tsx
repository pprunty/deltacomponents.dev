import {
  CardDeckContainer,
  CardDeckItem,
} from "@/registry/delta-ui/delta/card-deck"

export default function CardDeckYugiohDemo() {
  const images = [
    {
      src: "/images/yu-gi-oh/IMG_9598.JPG",
      alt: "Yu-Gi-Oh Card 1",
    },
    {
      src: "/images/yu-gi-oh/IMG_9599.JPG",
      alt: "Yu-Gi-Oh Card 2",
    },
    {
      src: "/images/yu-gi-oh/IMG_9600.JPG",
      alt: "Yu-Gi-Oh Card 3",
    },
    {
      src: "/images/yu-gi-oh/IMG_9601.JPG",
      alt: "Yu-Gi-Oh Card 4",
    },
    {
      src: "/images/yu-gi-oh/IMG_9602.JPG",
      alt: "Yu-Gi-Oh Card 5",
    },
    {
      src: "/images/yu-gi-oh/IMG_9603.JPG",
      alt: "Yu-Gi-Oh Card 6",
    },
    {
      src: "/images/yu-gi-oh/IMG_9604.JPG",
      alt: "Yu-Gi-Oh Card 7",
    },
    {
      src: "/images/yu-gi-oh/IMG_9605.JPG",
      alt: "Yu-Gi-Oh Card 8",
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
