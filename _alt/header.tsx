"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { List, X } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

// Placeholder Logo component
function Logo({ 
  onClick, 
  showName = false, 
  width = 32, 
  height = 32 
}: { 
  onClick?: () => void; 
  showName?: boolean; 
  width?: number; 
  height?: number 
}) {
  return (
    <div 
      onClick={onClick} 
      className="flex items-center gap-2 cursor-pointer"
    >
      <div 
        style={{ width, height }}
        className="bg-primary rounded-sm"
      />
      {showName && <span className="font-bold">Logo</span>}
    </div>
  )
}

// Define routes as an object at the top of the file
const routes = [
  { name: "Visit", path: "/visit" },
  { name: "Shop", path: "/shop" },
  { name: "Events", path: "/events" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Instagram", path: "https://instagram.com" },
]

// Mobile Menu Overlay component moved into the same file
interface MobileMenuOverlayProps {
  isOpen: boolean
  onClick: () => void
}

function MobileMenuOverlay({ isOpen, onClick }: MobileMenuOverlayProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-30 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      onClick={onClick}
      aria-hidden="true"
    />
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Check if the route is active
  const isActive = (path: string) => {
    // Handle home page special case
    if (path === "/" && pathname === "/") {
      return true
    }
    // For other routes, check if pathname starts with the path
    // This handles both exact matches and sub-routes
    return path !== "/" && pathname.startsWith(path)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div className="mx-4 my-4">
          <div className="flex h-16 items-center justify-between rounded-3xl bg-background/80 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Navigation - Left Side */}
            <div className="flex items-center gap-6">
              {/* Logo - Using the new Logo component */}
              <Logo
                onClick={closeMenu}
                showName={false}
                width={32}
                height={32}
              />

              {/* Desktop Navigation - Updated to be smaller but bolder */}
              <div className="hidden md:block rounded-2xl bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-2">
                <nav className="flex items-center space-x-6">
                  {routes.map((route) => (
                    <Link
                      key={route.name}
                      href={route.path}
                      className={cn(
                        "text-sm font-semibold tracking-wide transition-colors hover:text-foreground hover:underline",
                        isActive(route.path) ? "text-foreground underline" : "text-muted-foreground",
                      )}
                    >
                      {route.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            {/* Right Side - Login Button */}
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <span>Log in</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-foreground p-2 focus:outline-none"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown - Updated to be smaller but bolder */}
          <div
            className={cn(
              "fixed inset-x-0 top-[5.5rem] z-40 mx-4 overflow-hidden rounded-2xl border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out",
              isMenuOpen ? "max-h-[calc(100vh-6rem)] opacity-100" : "max-h-0 opacity-0 pointer-events-none",
            )}
          >
            <nav className="flex flex-col p-6 space-y-4">
              {routes.map((route) => (
                <Link
                  key={route.name}
                  href={route.path}
                  className={cn(
                    "text-sm font-semibold uppercase tracking-wide transition-all duration-200 ease-in-out",
                    "hover:text-foreground hover:underline",
                    isActive(route.path) ? "text-foreground underline" : "text-muted-foreground",
                  )}
                  onClick={closeMenu}
                >
                  {route.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="flex items-center justify-center gap-1.5 px-4 py-2 mt-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                onClick={closeMenu}
              >
                <span>Log in</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Overlay that appears behind the menu */}
      <MobileMenuOverlay isOpen={isMenuOpen} onClick={closeMenu} />
    </>
  )
}
