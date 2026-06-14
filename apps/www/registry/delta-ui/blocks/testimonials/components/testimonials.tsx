"use client"

type Testimonial = {
  id: string
  quote: string
  name: string
  title: string
  avatar: string
  alt?: string
  link?: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    name: "Diana Hu",
    title: "General Partner, Y Combinator",
    avatar:
      "https://bookface-images.s3.amazonaws.com/avatars/36477564f07b2f9314a051cebc0237a9c117e07a.jpg?1617298669",
    link: "https://example.com",
  },
  {
    id: "2",
    quote:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    name: "shadcn",
    title: "Creator of shadcn/ui",
    avatar: "https://github.com/shadcn.png",
    link: "https://example.com",
  },
  {
    id: "3",
    quote:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est.",
    name: "Andrej Karpathy",
    title: "CEO, Eureka Labs",
    avatar: "https://github.com/karpathy.png",
    link: "https://example.com",
  },
  {
    id: "4",
    quote:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi. Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit.",
    name: "Patrick Collison",
    title: "Co‑Founder & CEO, Stripe",
    avatar: "https://github.com/pc.png",
    link: "https://example.com",
  },
  {
    id: "5",
    quote:
      "Lorem ipsum.\n\nDolor sit amet.\nConsectetur adipiscing.\n\nElit sed do.",
    name: "ThePrimeagen",
    title: "@ThePrimeagen",
    avatar: "https://github.com/ThePrimeagen.png",
    link: "https://example.com",
  },
  {
    id: "6",
    quote:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur.",
    name: "Greg Brockman",
    title: "President, OpenAI",
    avatar: "https://github.com/gdb.png",
    link: "https://example.com",
  },
]

export function Testimonials() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((t) => {
        const content = (
          <figure className="flex h-full w-full flex-col">
            <blockquote className="grow">
              <p className="text-foreground/90 text-base leading-relaxed whitespace-pre-wrap">
                {t.quote}
              </p>
            </blockquote>
            <div className="mt-4 flex items-center gap-3">
              <div className="ring-border relative size-8 shrink-0 overflow-hidden rounded-sm ring-1 md:size-10">
                <img
                  src={t.avatar || "/placeholder.svg"}
                  alt={t.alt ?? t.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="text-sm">
                <div className="text-foreground font-medium">{t.name}</div>
                <div className="text-muted-foreground">{t.title}</div>
              </figcaption>
            </div>
          </figure>
        )

        if (t.link) {
          return (
            <a
              key={t.id}
              href={t.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card border-border bg-card col-span-1 flex overflow-hidden rounded-sm border p-5 transition-opacity hover:opacity-70"
            >
              {content}
            </a>
          )
        }

        return (
          <div
            key={t.id}
            className="card border-border bg-card col-span-1 flex overflow-hidden rounded-sm border p-5"
          >
            {content}
          </div>
        )
      })}
    </div>
  )
}
