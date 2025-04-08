import Link from "next/link"
import { cn } from "@/lib/utils"

// Hardcoded navigation links
const NAVIGATION_LINKS = [
  { name: "Visit", href: "/visit" },
  { name: "About", href: "/about" },
  { name: "Shop", href: "/shop" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
  { name: "Gallery", href: "/gallery" },
  { name: "Partners", href: "/partners" },
  { name: "Land", href: "/land" },
  { name: "Instagram", href: "https://instagram.com" },
]

// Hardcoded store information
const STORE_INFO = {
  name: "Corners New York",
  description: "An Art & Design store in the Catskills, upstate New York.",
  address: {
    street: "49 Main St.",
    city: "Livingston Manor",
    state: "NY",
    zip: "12758",
    country: "USA",
  },
}

// Default header text
const DEFAULT_HEADER_TEXT = "( THINK WITH YOUR EYES )"

interface FooterProps {
  className?: string
  storeInfo?: typeof STORE_INFO
  navigationLinks?: typeof NAVIGATION_LINKS
  showHeader?: boolean
  showCopyright?: boolean
  headerText?: string
  copyrightText?: string
  companyName?: string
  layout?: "3-column" | "2-column" | "stacked"
  spacing?: "default" | "compact" | "spacious"
  fontWeight?: "normal" | "medium" | "semibold" | "bold"
  fontSize?: "small" | "medium" | "large"
  pathname?: string
}

export default function Footer({
  className,
  storeInfo = STORE_INFO,
  navigationLinks = NAVIGATION_LINKS,
  showHeader = true,
  showCopyright = true,
  headerText = DEFAULT_HEADER_TEXT,
  copyrightText,
  companyName = "Studio DMCG Inc. DBA Corners New York",
  layout = "3-column",
  spacing = "default",
  fontWeight = "semibold",
  fontSize = "medium",
  pathname,
}: FooterProps) {
  // Determine spacing classes
  const spacingClasses = {
    compact: "py-8 px-4 gap-4 md:gap-8 mb-12 mt-12", // Increased mb from 8 to 12
    default: "py-16 px-8 gap-8 md:gap-16 mb-24 mt-24", // Increased mb from 16 to 24
    spacious: "py-24 px-12 gap-12 md:gap-24 mb-32 mt-32", // Increased mb from 24 to 32
  }[spacing]

  // Determine font weight classes
  const fontWeightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  }[fontWeight]

  // Determine font size classes
  const fontSizeClasses = {
    small: "text-base md:text-lg", // Increased from text-sm to text-base and text-base to text-lg
    medium: "text-lg md:text-2xl", // Increased from text-base to text-lg and text-xl to text-2xl
    large: "text-2xl md:text-3xl", // Increased from text-xl to text-2xl and text-2xl to text-3xl
  }[fontSize]

  // Determine layout classes
  const layoutClasses = {
    "3-column": "grid-cols-1 md:grid-cols-3",
    "2-column": "grid-cols-1 md:grid-cols-2",
    stacked: "grid-cols-1",
  }[layout]

  // Generate copyright text
  const copyright = copyrightText || `© ${new Date().getFullYear()} ${companyName}`

  return (
    <footer className={cn("w-full bg-background text-foreground", fontWeightClasses, className)}>
      {/* Header Text */}
      {showHeader && (
        <div className={cn("max-w-7xl mx-auto", spacingClasses.split(" ")[3])}>
          <h2 className="text-5xl md:text-6xl font-bold italic tracking-tight text-primary">{headerText}</h2>
        </div>
      )}

      <div
        className={cn(
          "max-w-7xl mx-auto grid pt-10",
          layoutClasses,
          spacingClasses.split(" ")[2],
          `px-${spacingClasses.split(" ")[1].split("-")[1]}`,
        )}
      >
        {/* Store Description */}
        <div>
          <p className={cn("leading-relaxed text-foreground", fontSizeClasses, fontWeightClasses)}>{storeInfo.description}</p>
        </div>

        {/* Address */}
        <div className={cn("leading-relaxed text-foreground", fontSizeClasses, fontWeightClasses)}>
          <p>{storeInfo.address.street}</p>
          <p>{storeInfo.address.city}</p>
          <p>
            {storeInfo.address.state} {storeInfo.address.zip} {storeInfo.address.country}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                fontSizeClasses,
                fontWeightClasses,
                "text-foreground hover:underline transition-colors",
                pathname === link.href ? "underline" : ""
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Copyright */}
      {showCopyright && (
        <div className={cn("max-w-7xl py-8 px-8 mx-auto", spacingClasses.split(" ")[4])}>
          <p className={cn("text-muted-foreground", fontSizeClasses, fontWeightClasses)}>{copyright}</p>
        </div>
      )}
    </footer>
  )
}

