"use client"

import { AuthForm } from "@/registry/delta-ui/blocks/auth-form/components/auth-form"

export default function AuthFormPage() {
  return (
    <main className="bg-background flex min-h-svh items-center justify-center">
      <AuthForm mode="login" />
    </main>
  )
}
