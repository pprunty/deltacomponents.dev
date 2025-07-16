"use client"

import * as React from "react"
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from "@/delta/dropdown-menu"
import {
  CreditCard,
  Crown,
  LogOut,
  Settings,
  User,
  UserCircle,
} from "lucide-react"

export default function DropdownMenuProfileDemo() {
  return (
    <div className="flex items-center justify-center min-h-[600px] p-8">
      <Dropdown>
        <DropdownTrigger className="cursor-pointer">
          <img
            src="https://patrickprunty.com/icon.webp"
            alt="User avatar"
            className="h-10 w-10 rounded-full border-2 border-border hover:border-primary transition-colors"
          />
        </DropdownTrigger>
        <DropdownContent align="end" className="w-64">
          {/* Profile Section */}
          <div className="flex items-center gap-3 p-3">
            <img
              src="https://patrickprunty.com/icon.webp"
              alt="User avatar"
              className="h-10 w-10 rounded-full"
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-foreground">
                patrick@example.com
              </p>
              <div className="flex items-center gap-1">
                <Crown className="h-3 w-3 text-amber-500" />
                <p className="text-xs text-muted-foreground">Pro Plan</p>
              </div>
            </div>
          </div>
          <DropdownSeparator />

          {/* Menu Items */}
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
