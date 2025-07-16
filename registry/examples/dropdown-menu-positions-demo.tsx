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

export default function DropdownMenuPositionsDemo() {
  return (
    <div className="relative h-[500px] w-full border rounded-lg p-4 bg-gradient-to-br from-muted/20 to-muted/40">
      {/* Center Instructions */}
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-foreground">
            Auto-Positioning Demo
          </p>
          <p className="text-sm text-muted-foreground">
            Click the avatars to see smart positioning
          </p>
          <p className="text-xs text-muted-foreground">
            Top-left opens below • Bottom-right opens above
          </p>
        </div>
      </div>

      {/* Top-left avatar */}
      <div className="absolute top-4 left-4">
        <Dropdown>
          <DropdownTrigger className="cursor-pointer">
            <img
              src="https://patrickprunty.com/icon.webp"
              alt="User avatar"
              className="h-10 w-10 rounded-full border-2 border-border hover:border-primary transition-colors"
            />
          </DropdownTrigger>
          <DropdownContent placement="auto" align="start" className="w-64">
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

      {/* Bottom-right avatar */}
      <div className="absolute bottom-4 right-4">
        <Dropdown>
          <DropdownTrigger className="cursor-pointer">
            <img
              src="https://patrickprunty.com/icon.webp"
              alt="User avatar"
              className="h-10 w-10 rounded-full border-2 border-border hover:border-primary transition-colors"
            />
          </DropdownTrigger>
          <DropdownContent placement="auto" align="end" className="w-64">
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
    </div>
  )
}
