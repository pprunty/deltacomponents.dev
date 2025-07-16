"use client"

import * as React from "react"
import { CreditCard, LogOut, Settings, UserCircle } from "lucide-react"

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from "@/delta/dropdown-menu"

export default function DropdownMenuDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Dropdown>
        <DropdownTrigger className="cursor-pointer">
          <img
            src="https://patrickprunty.com/icon.webp"
            alt="User avatar"
            className="h-10 w-10 rounded-full border-2 border-border hover:border-primary transition-colors"
          />
        </DropdownTrigger>
        <DropdownContent align="end" className="w-56">
          <DropdownItem className="gap-2">
            <UserCircle className="h-4 w-4" />
            Profile
          </DropdownItem>
          <DropdownItem className="gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </DropdownItem>
          <DropdownItem className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem className="gap-2" destructive>
            <LogOut className="h-4 w-4" />
            Log out
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  )
}
