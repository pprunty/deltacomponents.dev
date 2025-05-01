import React, { type ReactNode } from "react";

interface BlockquoteProps {
  children: ReactNode;
}

export function Blockquote({ children }: BlockquoteProps) {
  return (
    <blockquote className="border-l-4 border-muted-foreground pl-4 my-4 italic text-muted-foreground">
      {children}
    </blockquote>
  );
} 