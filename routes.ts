import type { IconProps } from "@phosphor-icons/react"
import { BookOpen, GridFour, House, Gear, User } from "@phosphor-icons/react"

export interface Route {
  href: string
  label: string
  icon: React.ForwardRefExoticComponent<IconProps>
}

export const routes: Route[] = [
  {
    href: "/",
    label: "Home",
    icon: House,
  },
  {
    href: "/docs/components",
    label: "Components",
    icon: GridFour,
  },
  {
    href: "/docs/introduction",
    label: "Docs",
    icon: BookOpen,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: User,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Gear,
  },
]
