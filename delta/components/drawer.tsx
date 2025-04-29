'use client';

import { ReactNode } from 'react';
import { Drawer as VaulDrawer } from 'vaul';
import { X } from '@phosphor-icons/react';

interface DrawerProps {
  trigger?: ReactNode;
  children?: ReactNode;
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showCloseButton?: boolean;
  position?: number;
}

export default function Drawer({
  trigger,
  children,
  title,
  description,
  open,
  onOpenChange,
  showCloseButton = true,
  position = 24,
}: DrawerProps) {
  return (
    <VaulDrawer.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <VaulDrawer.Trigger asChild>{trigger}</VaulDrawer.Trigger>}
      <VaulDrawer.Portal>
        <VaulDrawer.Overlay className="fixed inset-0 bg-black/40 z-[49] backdrop-blur-sm" />
        <VaulDrawer.Content className="bg-background flex flex-col rounded-t-lg mt-24 h-fit fixed bottom-0 left-0 right-0 z-[51] outline-none border-t border-border">
          <div className="p-4 bg-card rounded-t-lg flex-1">
            <div className="relative">
              <div aria-hidden className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-border mb-8" />
              {showCloseButton && (
                <button 
                  onClick={() => onOpenChange?.(false)}
                  className="absolute right-0 top-0 p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X size={16} weight="bold" />
                </button>
              )}
            </div>
            <div className="max-w-md mx-auto">
              {title && <VaulDrawer.Title className="font-medium text-lg mb-2 text-foreground">{title}</VaulDrawer.Title>}
              {description && <p className="text-muted-foreground mb-4 text-sm">{description}</p>}
              {children}
            </div>
          </div>
          <div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
            <div className="flex gap-6 justify-end max-w-md mx-auto">
              <a
                className="text-xs text-gray-600 flex items-center gap-0.25"
                href="https://github.com/emilkowalski/vaul"
                target="_blank"
              >
                GitHub
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  aria-hidden="true"
                  className="w-3 h-3 ml-1"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </a>
              <a
                className="text-xs text-gray-600 flex items-center gap-0.25"
                href="https://twitter.com/emilkowalski_"
                target="_blank"
              >
                Twitter
                <svg
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="16"
                  aria-hidden="true"
                  className="w-3 h-3 ml-1"
                >
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14L21 3"></path>
                </svg>
              </a>
            </div>
          </div>
        </VaulDrawer.Content>
      </VaulDrawer.Portal>
    </VaulDrawer.Root>
  );
}