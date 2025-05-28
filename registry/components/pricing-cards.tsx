"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface PricingFeature {
  text: string
  included: boolean
}

export interface PricingPlan {
  id: string
  name: string
  description?: string
  price?: {
    monthly: number
    yearly: number
    currency: string
  }
  customPrice?: {
    label: string
    sublabel?: string
  }
  features: PricingFeature[]
  cta: {
    text: string
    variant?: "default" | "outline" | "secondary"
  }
  popular?: boolean
  badge?: string
  credits?: string
  billingNote?: string
}

interface PricingCardProps {
  plan: PricingPlan
  billingCycle: "monthly" | "yearly"
  className?: string
  onSelect?: (planId: string) => void
}

export function PricingCard({
  plan,
  billingCycle,
  className,
  onSelect,
}: PricingCardProps) {
  const isPopular = plan.popular
  const price = plan.price ? plan.price[billingCycle] : null
  const yearlyDiscount = plan.price
    ? Math.round((1 - plan.price.yearly / (plan.price.monthly * 12)) * 100)
    : 0

  return (
    <Card
      className={cn(
        "relative flex flex-col w-full max-w-sm h-[480px] transition-all duration-200 rounded-3xl",
        isPopular && "border-primary shadow-lg",
        isPopular && "bg-primary text-primary-foreground",
        className
      )}
      data-card
    >
      {plan.badge && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-background border border-border text-foreground font-normal">
          {plan.badge}
        </Badge>
      )}

      {/* Header Section - Fixed Height */}
      <CardHeader className="pb-4 h-24 flex flex-col justify-start">
        <div className="flex-1">
          <CardTitle
            className={cn(
              "text-2xl font-light font-serif",
              isPopular && "text-primary-foreground"
            )}
          >
            {plan.name}
          </CardTitle>
          {plan.description && (
            <CardDescription
              className={cn(
                "text-sm mt-2 line-clamp-3",
                isPopular && "text-primary-foreground/80"
              )}
            >
              {plan.description}
            </CardDescription>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col pb-6">
        {/* Price Section - Fixed Height for Alignment */}
        <div className="h-24 mb-6 flex flex-col justify-center">
          {plan.customPrice ? (
            <div>
              <div
                className={cn(
                  "text-3xl font-light font-serif",
                  isPopular && "text-primary-foreground"
                )}
              >
                {plan.customPrice.label}
              </div>
              {plan.customPrice.sublabel && (
                <p
                  className={cn(
                    "text-sm text-muted-foreground mt-1",
                    isPopular && "text-primary-foreground/70"
                  )}
                >
                  {plan.customPrice.sublabel}
                </p>
              )}
            </div>
          ) : price !== null ? (
            <div>
              <div className="flex items-baseline gap-1">
                <span
                  className={cn(
                    "text-4xl font-light font-serif",
                    isPopular && "text-primary-foreground"
                  )}
                >
                  {plan.price?.currency}
                  {price.toLocaleString()}
                </span>
                <span
                  className={cn(
                    "text-sm text-muted-foreground",
                    isPopular && "text-primary-foreground/70"
                  )}
                >
                  /{billingCycle === "monthly" ? "mo" : "yr"}.
                </span>
              </div>
              {plan.billingNote && (
                <p
                  className={cn(
                    "text-[13px] text-muted-foreground mt-1",
                    isPopular && "text-primary-foreground/70"
                  )}
                >
                  {plan.billingNote}
                </p>
              )}
            </div>
          ) : null}
        </div>

        {/* CTA Button Section - Fixed Position */}
        <div className="mb-6">
          <Button
            className={cn(
              "w-full h-11",
              isPopular &&
                "bg-primary-foreground text-primary hover:bg-primary-foreground"
            )}
            variant={isPopular ? "secondary" : "default"}
            onClick={() => onSelect?.(plan.id)}
          >
            {plan.cta.text}
          </Button>
        </div>

        {/* Features Section - Flexible Height */}
        <div className="flex-1">
          <h4
            className={cn(
              "text-sm font-semibold mb-4",
              isPopular && "text-primary-foreground"
            )}
          >
            What's included
          </h4>
          <ul className="space-y-1">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-xs">
                <Check
                  className={cn(
                    "h-4 w-4 mt-0.5 shrink-0",
                    feature.included
                      ? isPopular
                        ? "text-primary-foreground"
                        : "text-primary"
                      : "text-muted-foreground",
                    !feature.included && "opacity-50"
                  )}
                />
                <span
                  className={cn(
                    "text-sm leading-relaxed",
                    isPopular && "text-primary-foreground",
                    !feature.included && "text-muted-foreground line-through"
                  )}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export interface ContactCard {
  title: string
  description: string
  cta: {
    text: string
    variant?: "default" | "outline" | "secondary"
  }
  onContact?: () => void
}

interface PricingCardsProps {
  plans: PricingPlan[]
  defaultBillingCycle?: "monthly" | "yearly"
  showBillingToggle?: boolean
  yearlyDiscount?: number
  onPlanSelect?: (planId: string) => void
  contactCard?: ContactCard
  className?: string
}

export function PricingCards({
  plans,
  defaultBillingCycle = "yearly",
  showBillingToggle = true,
  yearlyDiscount = 20,
  onPlanSelect,
  contactCard,
  className,
}: PricingCardsProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    defaultBillingCycle
  )

  return (
    <div className={cn("w-full", className)}>
      {showBillingToggle && (
        <div className="flex justify-center mb-8">
          <div className="flex items-center bg-muted rounded-full p-1">
            <Button
              variant={billingCycle === "monthly" ? "default" : "ghost"}
              size="sm"
              className="rounded-full px-6"
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "yearly" ? "default" : "ghost"}
              size="sm"
              className="rounded-full px-6 relative"
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
              {yearlyDiscount > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  -{yearlyDiscount}% off
                </span>
              )}
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-start justify-items-center">
        {plans.map((plan) => (
          <div key={plan.id} className="w-full max-w-sm">
            <PricingCard
              plan={plan}
              billingCycle={billingCycle}
              onSelect={onPlanSelect}
            />
          </div>
        ))}
      </div>

      {contactCard && (
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  {contactCard.title}
                </h3>
                <p className="text-muted-foreground">
                  {contactCard.description}
                </p>
              </div>
              <Button
                variant={contactCard.cta.variant || "default"}
                onClick={contactCard.onContact}
                className="md:ml-6"
              >
                {contactCard.cta.text}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
