export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  label?: string
  hide?: boolean
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
  hide?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = NavItemWithChildren
