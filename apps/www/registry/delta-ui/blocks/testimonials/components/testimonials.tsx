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
      "It was night and day from one batch to another, adoption went from single digits to over 80%. It just spread like wildfire, all the best builders were using Cursor.",
    name: "Diana Hu",
    title: "General Partner, Y Combinator",
    avatar:
      "https://cdn.sanity.io/images/2hv88549/production/fcdcbb0e010754abe55eaa640457c425b295d166-84x84.png?auto=format",
    link: "https://example.com",
  },
  {
    id: "2",
    quote:
      "The most useful AI tool that I currently pay for, hands down, is Cursor. It's fast, autocompletes when and where you need it to, handles brackets properly, sensible keyboard shortcuts, bring-your-own-model... everything is well put together.",
    name: "shadcn",
    title: "Creator of shadcn/ui",
    avatar:
      "https://cdn.sanity.io/images/2hv88549/production/5b975491b9ace97040eca409dfa9819cbb80ab76-84x84.png?auto=format",
    link: "https://example.com",
  },
  {
    id: "3",
    quote:
      "The best LLM applications have an autonomy slider: you control how much independence to give the AI. In Cursor, you can do Tab completion, Cmd+K for targeted edits, or you can let it rip with the full autonomy agentic version.",
    name: "Andrej Karpathy",
    title: "CEO, Eureka Labs",
    avatar:
      "https://cdn.sanity.io/images/2hv88549/production/4427316a06b0a5764ddf36b018ed04a7ead481f2-84x84.png?auto=format",
    link: "https://example.com",
  },
  {
    id: "4",
    quote:
      "Cursor quickly grew from hundreds to thousands of extremely enthusiastic Stripe employees. We spend more on R&D and software creation than any other undertaking, and there's significant economic outcomes when making that process more efficient and productive.",
    name: "Patrick Collison",
    title: "Co‑Founder & CEO, Stripe",
    avatar:
      "https://cdn.sanity.io/images/2hv88549/production/a8dcd16f0d888eed3f8e33299c2451eb2ae4a493-93x93.png?auto=format",
    link: "https://example.com",
  },
  {
    id: "5",
    quote:
      "It's official.\n\nI hate vibe coding.\nI love Cursor tab coding.\n\nIt's wild.",
    name: "ThePrimeagen",
    title: "@ThePrimeagen",
    avatar:
      "https://cdn.sanity.io/images/2hv88549/production/6e35a34559ef40d60cd05033ffcf062ac9f7caeb-84x84.png?auto=format",
    link: "https://example.com",
  },
  {
    id: "6",
    quote:
      "It's definitely becoming more fun to be a programmer. It's less about digging through pages and more about what you want to happen. We are at the 1% of what's possible, and it's in interactive experiences like Cursor where models like GPT-5 shine brightest.",
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
