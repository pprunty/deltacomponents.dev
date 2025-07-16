"use client"

import * as React from "react"
import HeaderSleek from "@/delta/header-sleek"

export default function HeaderSleekDemo() {
  const [activeHref, setActiveHref] = React.useState("")

  React.useEffect(() => {
    // Set initial active href from URL hash
    const updateActiveHref = () => {
      setActiveHref(window.location.hash || "#features")
    }

    // Set initial value
    updateActiveHref()

    // Listen for hash changes
    window.addEventListener("hashchange", updateActiveHref)

    // Cleanup
    return () => {
      window.removeEventListener("hashchange", updateActiveHref)
    }
  }, [])

  const handleButtonClick = () => {
    alert("Get Started button clicked!")
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderSleek
        leftNavItems={[
          { href: "#features", label: "Features" },
          { href: "#pricing", label: "Pricing" },
        ]}
        rightNavItems={[
          { href: "#about", label: "About" },
          { href: "#contact", label: "Contact" },
        ]}
        buttonText="Start Free Trial"
        onButtonClick={handleButtonClick}
        activeHref={activeHref}
      />

      {/* Demo content to show the fixed header behavior */}
      <div className="pt-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">Header Sleek Demo</h1>
            <p className="text-xl text-muted-foreground">
              This demonstrates the sleek header component with fixed
              positioning, nav links on either side, and a center button. Click
              the navigation links to see the active state update based on the
              URL hash.
            </p>
          </section>

          {/* Features Section */}
          <section id="features" className="py-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6">Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-card rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">
                  Fixed Positioning
                </h3>
                <p className="text-muted-foreground">
                  The header stays fixed at the top with a sleek glass morphism
                  effect using backdrop blur and transparency.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">
                  Dynamic Active States
                </h3>
                <p className="text-muted-foreground">
                  Navigation links automatically highlight based on the current
                  URL hash, providing clear visual feedback to users.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">
                  Smooth Transitions
                </h3>
                <p className="text-muted-foreground">
                  Hover effects and font weight changes provide smooth,
                  professional interactions without layout shift.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">
                  Responsive Design
                </h3>
                <p className="text-muted-foreground">
                  The header adapts beautifully to different screen sizes while
                  maintaining its elegant appearance.
                </p>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6">Pricing</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-card rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">Basic</h3>
                <p className="text-3xl font-bold mb-4">
                  $9<span className="text-sm font-normal">/month</span>
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ Basic header component</li>
                  <li>✓ Standard transitions</li>
                  <li>✓ Basic customization</li>
                </ul>
              </div>
              <div className="p-6 bg-card rounded-lg border-2 border-primary">
                <h3 className="text-xl font-semibold mb-3">Pro</h3>
                <p className="text-3xl font-bold mb-4">
                  $19<span className="text-sm font-normal">/month</span>
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ Advanced header variants</li>
                  <li>✓ Custom animations</li>
                  <li>✓ Full customization</li>
                  <li>✓ Priority support</li>
                </ul>
              </div>
              <div className="p-6 bg-card rounded-lg border">
                <h3 className="text-xl font-semibold mb-3">Enterprise</h3>
                <p className="text-3xl font-bold mb-4">Custom</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ Everything in Pro</li>
                  <li>✓ Custom development</li>
                  <li>✓ Dedicated support</li>
                  <li>✓ SLA guarantee</li>
                </ul>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6">About</h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg mb-4">
                The Header Sleek component represents the pinnacle of modern web
                design, combining aesthetic appeal with functional excellence.
                Built with React and styled with Tailwind CSS, it provides a
                professional foundation for any web application.
              </p>
              <p className="mb-4">
                Our design philosophy centers around creating components that
                not only look beautiful but also provide exceptional user
                experience. The glass morphism effect, smooth transitions, and
                intelligent active state management work together to create a
                header that feels both modern and timeless.
              </p>
              <p>
                Whether you're building a startup's landing page or an
                enterprise application, Header Sleek adapts to your needs while
                maintaining its elegant character.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-16 scroll-mt-20">
            <h2 className="text-3xl font-bold mb-6">Contact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  <p className="flex items-center gap-3">
                    <span className="font-medium">Email:</span>
                    <span className="text-muted-foreground">
                      hello@example.com
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="font-medium">Phone:</span>
                    <span className="text-muted-foreground">
                      +1 (555) 123-4567
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="font-medium">Address:</span>
                    <span className="text-muted-foreground">
                      123 Design Street, Web City, WC 12345
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="space-y-3">
                  <p className="flex items-center gap-3">
                    <span className="font-medium">Twitter:</span>
                    <span className="text-muted-foreground">@headersleek</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="font-medium">GitHub:</span>
                    <span className="text-muted-foreground">
                      github.com/headersleek
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="font-medium">LinkedIn:</span>
                    <span className="text-muted-foreground">
                      linkedin.com/company/headersleek
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
