"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { Cross as Hamburger } from 'hamburger-react';

import { docsConfig } from "@/config/docs"
import { cn } from "@/lib/utils"
import { useMetaColor } from "@/hooks/use-meta-color"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerBody,
  DrawerPortal,
  DrawerOverlay,
  DrawerHandle,
  DrawerTitle,
} from "@/registry/components/drawer"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const { setMetaColor, metaColor } = useMetaColor()

  const onOpenChange = React.useCallback(
    (open: boolean) => {
      setOpen(open)
      setMetaColor(open ? "#09090b" : metaColor)
    },
    [setMetaColor, metaColor]
  )

  return (
    <Drawer open={open} onOpenChange={onOpenChange} size="xl">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 size-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <div className="mx-1">
            <Hamburger 
              size={18} 
              toggled={open} 
              toggle={setOpen} 
              label="Toggle menu"
              hideOutline={false}
              rounded
            />
          </div>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent className="bg-background flex flex-col rounded-t-lg mt-12 h-[80vh] fixed bottom-0 left-0 right-0 z-[100] outline-none">
          <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
          <DrawerHandle />
          <DrawerBody className="flex-1 overflow-auto p-6">
            <div className="flex flex-col gap-y-3">
              {docsConfig.mainNav?.map(
                (item) =>
                  item.href && (
                    <MobileLink
                      key={item.href}
                      href={item.href}
                      onOpenChange={setOpen}
                    >
                      {item.title}
                    </MobileLink>
                  )
              )}
            </div>
            <div className="flex flex-col space-y-2">
              {docsConfig.sidebarNav.map((item, index) => (
                <div key={index} className="flex flex-col space-y-3 pt-6">
                  <h4 className="font-medium">{item.title}</h4>
                  {item?.items?.length &&
                    item.items.map((item) => (
                      <React.Fragment key={item.href}>
                        {!item.disabled &&
                          (item.href ? (
                            <MobileLink
                              href={item.href}
                              onOpenChange={setOpen}
                              className="text-muted-foreground"
                            >
                              {item.title}
                              {item.label && (
                                <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                                  {item.label}
                                </span>
                              )}
                            </MobileLink>
                          ) : (
                            item.title
                          ))}
                      </React.Fragment>
                    ))}
                </div>
              ))}
            </div>
          </DrawerBody>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn("text-base", className)}
      {...props}
    >
      {children}
    </Link>
  )
}
