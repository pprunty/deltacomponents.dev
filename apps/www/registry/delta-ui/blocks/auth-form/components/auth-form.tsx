"use client"

import * as React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/delta-ui/ui/button"
import { Input } from "@/registry/delta-ui/ui/input"

// ---------------------------------------------------------------------------
// Config: Replace with your own site name
// ---------------------------------------------------------------------------
const SITE_NAME = "Acme"

// ---------------------------------------------------------------------------
// Inline Spinner
// ---------------------------------------------------------------------------
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2
      role="status"
      aria-label="Loading"
      className={cn("size-5 animate-spin [animation-duration:0.5s]", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Inline StatusBadge
// ---------------------------------------------------------------------------
function StatusBadge({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  const getLabelStyle = (l: string) => {
    switch (l.toLowerCase()) {
      case "last used":
        return "bg-muted text-muted-foreground"
      case "beta":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "new":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <span
      className={cn(
        "rounded-sm px-2 py-1 text-xs leading-none font-medium",
        getLabelStyle(label),
        className
      )}
    >
      {label}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Inline Logo (Delta logo SVG)
// ---------------------------------------------------------------------------
function Logo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 282 308"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M280.438 295.396L152.117 5.66075C151.645 3.87252 150.584 2.32152 149.12 1.29292C147.665 0.264327 145.896 -0.172778 144.147 0.0619372H120.258C118.509 -0.172778 116.74 0.264327 115.285 1.29292C113.821 2.32152 112.76 3.87252 112.288 5.66075L0.780777 295.396C0.171502 296.774 -0.0839596 298.294 0.0241376 299.81C0.132235 301.327 0.603995 302.788 1.40981 304.052C2.2058 305.318 3.30641 306.345 4.58392 307.034C5.87126 307.725 7.30596 308.054 8.75053 307.993H272.92C279.111 307.993 284.86 300.528 280.438 295.396ZM122.469 127.434L177.775 250.605C178.384 252.07 178.65 253.664 178.551 255.257C178.453 256.85 177.991 258.395 177.215 259.765C176.429 261.133 175.358 262.286 174.07 263.128C172.783 263.969 171.329 264.475 169.815 264.602H68.037C66.4941 264.493 64.9807 264.019 63.6246 263.213C62.2685 262.408 61.1089 261.293 60.2146 259.951C59.3204 258.607 58.7307 257.07 58.4752 255.454C58.2197 253.836 58.318 252.18 58.7504 250.605L106.539 127.434C107.266 125.856 108.397 124.525 109.802 123.594C111.207 122.663 112.838 122.169 114.499 122.169C116.17 122.169 117.791 122.663 119.206 123.594C120.612 124.525 121.741 125.856 122.469 127.434Z"
        fill="currentColor"
      />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Inline Validation Schemas
// ---------------------------------------------------------------------------
const emailSchema = z.string().email("Please enter a valid email address")

// ---------------------------------------------------------------------------
// Inline useLastUsedProvider hook (stub)
// ---------------------------------------------------------------------------
function useLastUsedProvider(_initialProvider?: string) {
  return { provider: _initialProvider ?? null, isLoading: false }
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type AuthMode = "login" | "signup"

interface AuthFormProps {
  mode?: AuthMode
  className?: string
}

// ---------------------------------------------------------------------------
// AuthForm Component
// ---------------------------------------------------------------------------
export function AuthForm({ mode = "login", className }: AuthFormProps) {
  const router = useRouter()
  const { provider: lastUsedProvider, isLoading: providerLoading } =
    useLastUsedProvider()

  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [githubLoading, setGithubLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({})
  const [authError, setAuthError] = useState<string | null>(null)

  const formRef = useRef<HTMLFormElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  const isLogin = mode === "login"
  const isAnyAuthLoading = isSubmitting || googleLoading || githubLoading

  const showGoogleBadge =
    isLogin && !providerLoading && lastUsedProvider === "google"
  const showGithubBadge =
    isLogin && !providerLoading && lastUsedProvider === "github"

  const handleGoogleAuth = useCallback(async () => {
    setGoogleLoading(true)
    try {
      toast.success("Redirecting to Google...")
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/dashboard")
    } catch {
      setGoogleLoading(false)
    }
  }, [router])

  const handleGitHubAuth = useCallback(async () => {
    setGithubLoading(true)
    try {
      toast.success("Redirecting to GitHub...")
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/dashboard")
    } catch {
      setGithubLoading(false)
    }
  }, [router])

  const handleEmailAuth = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setAuthError(null)
      setValidationErrors({})

      const result = emailSchema.safeParse(email)
      if (!result.success) {
        setValidationErrors({ email: result.error.errors[0].message })
        return
      }

      setIsSubmitting(true)
      try {
        toast.success("Magic link sent! Check your inbox.")
        await new Promise((resolve) => setTimeout(resolve, 1500))
        router.push("/dashboard")
      } catch {
        setAuthError("Authentication failed")
        toast.error("Authentication failed")
      } finally {
        setIsSubmitting(false)
      }
    },
    [email, router]
  )

  // Reset OAuth loading states when user returns to page
  useEffect(() => {
    const handleFocus = () => {
      if (googleLoading || githubLoading) {
        setGoogleLoading(false)
        setGithubLoading(false)
      }
    }
    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [googleLoading, githubLoading])

  if (providerLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner className="text-muted-foreground size-6" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-sm flex-col items-center px-6 sm:px-0",
        className
      )}
    >
      {/* Logo */}
      <Link href="/">
        <Logo className="mx-auto h-12 w-12" />
      </Link>

      {/* Card */}
      <div className="bg-card border-border mx-4 mt-8 w-full max-w-md min-w-0 rounded-[2rem] border p-7 shadow-[0_4px_24px_0_rgba(0,0,0,0.02),0_4px_32px_0_rgba(0,0,0,0.02),0_2px_64px_0_rgba(0,0,0,0.01),0_16px_32px_0_rgba(0,0,0,0.01)] sm:mx-auto">
        <div className="flex flex-col gap-5">
          {authError && (
            <div className="rounded-[0.6rem] border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
              {authError}
            </div>
          )}

          {/* SSO Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="bg-background hover:bg-accent relative h-11 w-full justify-center gap-2 overflow-visible rounded-[0.6rem] font-medium transition duration-100 active:scale-[0.985]"
              onClick={handleGoogleAuth}
              disabled={isAnyAuthLoading}
            >
              {googleLoading ? (
                <Spinner className="size-4 flex-shrink-0" />
              ) : (
                <svg
                  className="h-4 w-4 flex-shrink-0"
                  viewBox="0 0 24 24"
                  aria-label="Google"
                  role="img"
                >
                  <title>Google</title>
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
              <StatusBadge
                label="Last Used"
                className={cn(
                  "pointer-events-none absolute -top-2 -right-2 z-10 origin-top-right border-0 transition-all duration-500 ease-in-out",
                  showGoogleBadge
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0"
                )}
              />
            </Button>

            <Button
              variant="outline"
              className="bg-background hover:bg-accent relative h-11 w-full justify-center gap-2 overflow-visible rounded-[0.6rem] font-medium transition duration-100 active:scale-[0.985]"
              onClick={handleGitHubAuth}
              disabled={isAnyAuthLoading}
            >
              {githubLoading ? (
                <Spinner className="size-4 flex-shrink-0" />
              ) : (
                <svg
                  className="h-4 w-4 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-label="GitHub"
                  role="img"
                >
                  <title>GitHub</title>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              )}
              <span>Continue with GitHub</span>
              <StatusBadge
                label="Last Used"
                className={cn(
                  "pointer-events-none absolute -top-2 -right-2 z-10 origin-top-right border-0 transition-all duration-500 ease-in-out",
                  showGithubBadge
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0"
                )}
              />
            </Button>
          </div>

          {/* Divider */}
          <p className="text-muted-foreground pb-px text-center text-xs uppercase">
            or
          </p>

          {/* Email Form */}
          <form
            ref={formRef}
            onSubmit={handleEmailAuth}
            className="flex flex-col gap-4"
          >
            <div className="space-y-1">
              <Input
                ref={emailRef}
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (validationErrors.email) {
                    setValidationErrors((prev) => ({ ...prev, email: "" }))
                  }
                }}
                className={cn(
                  "bg-background h-11 rounded-[0.6rem]",
                  validationErrors.email &&
                    "border-red-500 focus:border-red-500"
                )}
                required
              />
              {validationErrors.email && (
                <p className="text-xs text-red-600">
                  {validationErrors.email}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-foreground text-background hover:bg-foreground/90 h-11 w-full rounded-[0.6rem] font-medium transition-transform duration-150 ease-[cubic-bezier(0.165,0.85,0.45,1)] active:scale-[0.985]"
              disabled={isAnyAuthLoading}
            >
              {isSubmitting ? <Spinner /> : "Continue with Email"}
            </Button>
          </form>
        </div>

        {/* Terms */}
        <p className="text-muted-foreground/75 mt-5 text-center text-xs leading-relaxed">
          By continuing, you agree to {SITE_NAME}&apos;s{" "}
          <Link
            href="#"
            className="underline decoration-current/40 underline-offset-[3px] hover:decoration-current"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="underline decoration-current/40 underline-offset-[3px] hover:decoration-current"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      {/* Alternate Link */}
      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">
          {isLogin ? "Don\u2019t have an account?" : "Already have an account?"}{" "}
        </span>
        <Link
          href="#"
          className="font-medium underline decoration-current/40 underline-offset-[3px] hover:decoration-current"
          onClick={(e) => {
            e.preventDefault()
            toast.info(
              isLogin ? "Navigating to sign up..." : "Navigating to login..."
            )
          }}
        >
          {isLogin ? "Sign Up" : "Log In"}
        </Link>
      </div>
    </div>
  )
}
