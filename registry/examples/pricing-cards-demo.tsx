import { PricingCards } from "@/delta/pricing-cards"
import type { PricingPlan } from "@/delta/pricing-cards"

const samplePlans: PricingPlan[] = [
  {
    id: "monthly",
    name: "Monthly",
    description:
      "Gives you the most freedom. Perfect if you want to try the membership out.",
    price: {
      monthly: 29,
      yearly: 25,
      currency: "$",
    },
    billingNote: "pause or cancel anytime",
    features: [
      { text: "Unlimited requests", included: true },
      { text: "Unlimited brands", included: true },
      { text: "1 Bruno Talent (Designer, Developer...)", included: true },
      { text: "Shared Slack channel", included: true },
      { text: "Pause or cancel anytime", included: true },
    ],
    cta: {
      text: "Start Today",
      variant: "outline",
    },
    badge: "most popular",
  },
  {
    id: "quarterly",
    name: "Quarterly",
    description:
      "Our clients' favorite! For companies of all sizes, who know what they need.",
    price: {
      monthly: 19,
      yearly: 15,
      currency: "$",
    },
    billingNote: "paid quarterly",
    features: [
      { text: "Unlimited requests", included: true },
      { text: "Unlimited brands", included: true },
      { text: "1 Bruno Talent (Designer, Developer...)", included: true },
      { text: "1 Project Manager", included: true },
      { text: "Shared Slack channel", included: true },
    ],
    cta: {
      text: "Start Today",
    },
  },
  {
    id: "yearly",
    name: "Yearly",
    description:
      "The most cost-effective option. For a long-term relationship with us. Perfect for established businesses.",
    price: {
      monthly: 12,
      yearly: 9,
      currency: "$",
    },
    billingNote: "paid annually",
    features: [
      { text: "Unlimited requests", included: true },
      { text: "Unlimited brands", included: true },
      { text: "1 Bruno Talent (Designer, Developer...)", included: true },
      { text: "1 Project Manager", included: true },
      { text: "Shared Slack channel", included: true },
    ],
    cta: {
      text: "Call Bruno",
      variant: "outline",
    },
    popular: true,
  },
]

const contactCard = {
  title: "Are you interested in a quoted project?",
  description:
    "If your project doesn't fit in the above plans, or if you'd like to discuss before making up your mind, book a call with us.",
  cta: {
    text: "Call Bruno",
    variant: "default" as const,
  },
  onContact: () => {
    console.log("Contact button clicked")
    // Handle contact logic here
  },
}

export default function PricingCardsDemo() {
  const handlePlanSelect = (planId: string) => {
    console.log(`Selected plan: ${planId}`)
    // Handle plan selection logic here
  }

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <p className="text-muted-foreground mb-2">Discover</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our flat
          <br />
          Pricing
        </h1>
      </div>

      <PricingCards
        plans={samplePlans}
        defaultBillingCycle="yearly"
        showBillingToggle={true}
        onPlanSelect={handlePlanSelect}
        contactCard={contactCard}
      />
    </div>
  )
}
