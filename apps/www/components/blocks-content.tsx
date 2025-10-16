"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function BlocksContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  useEffect(() => {
    if (pathname !== prevPathname) {
      setIsLoading(true)
      setPrevPathname(pathname)

      // Simulate loading time for route change
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [pathname, prevPathname])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}
