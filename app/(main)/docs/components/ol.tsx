import React, { type ReactNode } from "react";

interface OlProps {
  children: ReactNode;
}

export function Ol({ children }: OlProps) {
  return <ol className="list-decimal pl-6 my-4 text-muted-foreground">{children}</ol>;
} 