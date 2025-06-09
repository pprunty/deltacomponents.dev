"use client"

import * as React from "react"

import Footer from "@/registry/layout/footer"

export default function FooterDemo() {
  const customSections = [
    {
      title: "Product",
      links: [
        { href: "/features", label: "Features" },
        { href: "/pricing", label: "Pricing" },
        { href: "/documentation", label: "Documentation" },
        { href: "/changelog", label: "Changelog" },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/guides", label: "Guides" },
        { href: "/tutorials", label: "Tutorials" },
        { href: "/api", label: "API Reference" },
        { href: "/support", label: "Support" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About Us" },
        { href: "/blog", label: "Blog" },
        { href: "/careers", label: "Careers" },
        { href: "/contact", label: "Contact" },
      ],
    },
  ]

  const socialLinks = [
    {
      href: "https://twitter.com/yourcompany",
      label: "Twitter",
      external: true,
    },
    { href: "https://github.com/yourcompany", label: "GitHub", external: true },
    {
      href: "https://linkedin.com/company/yourcompany",
      label: "LinkedIn",
      external: true,
    },
    {
      href: "https://discord.gg/yourcompany",
      label: "Discord",
      external: true,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Demo content above footer */}
      <div className="flex-1 flex items-center justify-center p-8 bg-muted/50">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Footer Component Demo</h2>
          <p className="text-muted-foreground">
            Scroll down to see the footer component in action
          </p>
        </div>
      </div>

      {/* Footer Demo */}
      <Footer
        brandName="Delta Components"
        brandHref="/"
        sections={customSections}
        socialLinks={socialLinks}
        copyright="© 2024 Delta Components. Crafted with care."
      />
    </div>
  )
}
