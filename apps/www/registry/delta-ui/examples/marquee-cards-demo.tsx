"use client"

import { Marquee } from "@/registry/delta-ui/blocks/marquee"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
    content:
      "This component library has revolutionized our development workflow. The quality and attention to detail is exceptional.",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Alex Rodriguez",
    role: "Senior Developer",
    company: "StartupXYZ",
    content:
      "Beautiful components that are actually usable in production. The documentation is clear and examples are helpful.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Emily Johnson",
    role: "Design Lead",
    company: "CreativeStudio",
    content:
      "Perfect balance between design and functionality. These components save us hours of development time.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Michael Kim",
    role: "Frontend Engineer",
    company: "DevTeam",
    content:
      "Clean, well-documented, and performant. Everything we need for modern web applications.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Jessica Wu",
    role: "UI/UX Designer",
    company: "DesignLab",
    content:
      "These components bridge the gap between design and development perfectly. Highly recommended!",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
]

export default function MarqueeCardsDemo() {
  return (
    <div className="w-full py-12">
      <Marquee speed={35} gap={32} itemClassName="w-80" className="py-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="bg-card border-border rounded-lg border p-6 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="mb-2">
                  <h4 className="text-sm font-semibold">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  )
}
