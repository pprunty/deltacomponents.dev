"use client"

import { Marquee } from "@/registry/delta-ui/delta/marquee"
import { ScrollFadeEffect } from "@/registry/delta-ui/delta/scroll-fade-effect"

type Testimonial = {
  id: string
  quote: string
  name: string
  title: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    name: "Diana Hu",
    title: "General Partner, Y Combinator",
    avatar:
      "https://bookface-images.s3.amazonaws.com/avatars/36477564f07b2f9314a051cebc0237a9c117e07a.jpg?1617298669",
  },
  {
    id: "2",
    quote:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    name: "shadcn",
    title: "Creator of shadcn/ui",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "3",
    quote:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
    name: "Andrej Karpathy",
    title: "CEO, Eureka Labs",
    avatar: "https://github.com/karpathy.png",
  },
  {
    id: "4",
    quote:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
    name: "Patrick Collison",
    title: "Co‑Founder & CEO, Stripe",
    avatar: "https://github.com/pc.png",
  },
  {
    id: "5",
    quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    name: "ThePrimeagen",
    title: "@ThePrimeagen",
    avatar: "https://github.com/ThePrimeagen.png",
  },
  {
    id: "6",
    quote:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint.",
    name: "Greg Brockman",
    title: "President, OpenAI",
    avatar: "https://github.com/gdb.png",
  },
]

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="card border-border bg-card mx-3 flex w-[340px] shrink-0 overflow-hidden rounded-sm border p-5 whitespace-normal">
      <figure className="flex h-full w-full flex-col">
        <blockquote className="grow">
          <p className="text-foreground/90 text-base leading-relaxed">
            {t.quote}
          </p>
        </blockquote>
        <div className="mt-4 flex items-center gap-3">
          <div className="ring-border relative size-8 shrink-0 overflow-hidden rounded-sm ring-1 md:size-10">
            <img
              src={t.avatar || "/placeholder.svg"}
              alt={t.name}
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="text-sm">
            <div className="text-foreground font-medium">{t.name}</div>
            <div className="text-muted-foreground">{t.title}</div>
          </figcaption>
        </div>
      </figure>
    </div>
  )
}

export default function MarqueeCardsDemo() {
  return (
    <div className="w-full py-12">
      <ScrollFadeEffect orientation="horizontal" force intensity={96}>
        <Marquee speed={3} pauseOnHover className="items-stretch py-4">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} t={t} />
          ))}
        </Marquee>
      </ScrollFadeEffect>
    </div>
  )
}
