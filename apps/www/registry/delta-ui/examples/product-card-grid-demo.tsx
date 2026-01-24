import {
  ProductCard,
  ProductCardContent,
  ProductCardHeader,
  ProductCardImage,
  ProductCardTitle,
} from "@/registry/delta-ui/delta/product-card"

const essays = [
  {
    title: "Buy Wisely",
    image: "/images/essays/buy-wisely.jpg",
    author: "Paul Graham",
    url: "https://stephango.com/buy-wisely",
  },
  {
    title: "On Becoming Competitive",
    image: "/images/essays/on-becoming-competitive.jpg",
    author: "Naval Ravikant",
    url: "https://ludwigabap.bearblog.dev/on-becoming-competitive-when-joining-a-new-company/",
  },
  {
    title: "Salary Negotiations",
    image: "/images/essays/salary-negotiations.jpg",
    author: "Patrick McKenzie",
    url: "https://www.kalzumeus.com/2012/01/23/salary-negotiation/",
  },
  {
    title: "Solution Space & Taste",
    image: "/images/essays/solution-space-taste.jpg",
    author: "Jessica Livingston",
    url: "https://grantslatton.com/solution-space-taste",
  },
  {
    title: "The Bear Manifesto",
    image: "/images/essays/the-bear-manifesto.jpg",
    author: "Nassim Taleb",
    url: "https://herman.bearblog.dev/manifesto/",
  },
  {
    title: "Write Like You Talk",
    image: "/images/essays/write-like-you-talk.jpg",
    author: "Paul Graham",
    url: "https://paulgraham.com/talk.html",
  },
]

export default function ProductCardGridDemo() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {essays.map((essay) => (
        <a key={essay.title} href={essay.url} className="block">
          <ProductCard className="w-full">
            <ProductCardImage src={essay.image} alt={essay.title} />
            <ProductCardContent>
              <ProductCardHeader>
                <ProductCardTitle>{essay.title}</ProductCardTitle>
                <div className="text-muted-foreground text-sm">
                  by {essay.author}
                </div>
              </ProductCardHeader>
            </ProductCardContent>
          </ProductCard>
        </a>
      ))}
    </div>
  )
}
