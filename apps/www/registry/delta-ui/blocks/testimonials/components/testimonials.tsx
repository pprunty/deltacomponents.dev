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
      "https://cdn.sanity.io/images/2hv88549/production/fcdcbb0e010754abe55eaa640457c425b295d166-84x84.png?auto=format",
    link: "https://example.com",
  },
  {
    id: "2",
    quote:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    name: "shadcn",
    title: "Creator of shadcn/ui",
    avatar:
      "https://cdn.sanity.io/images/2hv88549/production/5b975491b9ace97040eca409dfa9819cbb80ab76-84x84.png?auto=format",
    link: "https://example.com",
  },
  {
    id: "3",
    quote:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est.",
    name: "Andrej Karpathy",
    title: "CEO, Eureka Labs",
    avatar:
      "https://cdn.sanity.io/images/2hv88549/production/4427316a06b0a5764ddf36b018ed04a7ead481f2-84x84.png?auto=format",
    link: "https://example.com",
  },
  {
    id: "4",
    quote:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi. Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit.",
    name: "Patrick Collison",
    title: "Co‑Founder & CEO, Stripe",
    avatar:
      "https://cdn.sanity.io/images/2hv88549/production/a8dcd16f0d888eed3f8e33299c2451eb2ae4a493-93x93.png?auto=format",
    link: "https://example.com",
  },
  {
    id: "5",
    quote:
      "Lorem ipsum.\n\nDolor sit amet.\nConsectetur adipiscing.\n\nElit sed do.",
    name: "ThePrimeagen",
    title: "@ThePrimeagen",
    avatar:
      "https://cdn.sanity.io/images/2hv88549/production/6e35a34559ef40d60cd05033ffcf062ac9f7caeb-84x84.png?auto=format",
    link: "https://example.com",
  },
  {
    id: "6",
    quote:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur.",
    name: "Greg Brockman",
    title: "President, OpenAI",
    avatar:
      "https://cdn.sanity.io/images/2hv88549/production/924c80c6c0c69a8fc6f3f9f4fd8a1a5e75bf74c7-400x400.jpg?auto=format",
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
