"use client"

import * as React from "react"
import {
  CreditCard,
  Crown,
  LogOut,
  Settings,
  User,
  UserCircle,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/components/dropdown-menu"

export default function DropdownMenuPositionsDemo() {
  return (
    <div className="relative h-[500px] w-full border rounded-lg p-4 bg-gradient-to-br from-muted/20 to-muted/40">
      {/* Center Instructions */}
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-foreground">
            Positioning Demo
          </p>
          <p className="text-sm text-muted-foreground">
            Click the avatars to see different alignments
          </p>
          <p className="text-xs text-muted-foreground">
            Top-left aligns start • Bottom-right aligns end
          </p>
        </div>
      </div>

      {/* Top-left avatar */}
      <div className="absolute top-4 left-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img
              src="https://patrickprunty.com/icon.webp"
              alt="User avatar"
              className="h-10 w-10 rounded-full border-2 border-border hover:border-primary transition-colors cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-64">
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
            <DropdownMenuSeparator />

            {/* Menu Items */}
            <DropdownMenuItem>
              <UserCircle className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Bottom-right avatar */}
      <div className="absolute bottom-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <img
              src="https://patrickprunty.com/icon.webp"
              alt="User avatar"
              className="h-10 w-10 rounded-full border-2 border-border hover:border-primary transition-colors cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="end" className="w-64">
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
            <DropdownMenuSeparator />

            {/* Menu Items */}
            <DropdownMenuItem>
              <UserCircle className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
