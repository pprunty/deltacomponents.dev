import React, { type ReactNode } from "react";

interface PProps {
  children: ReactNode;
}

export function P({ children }: PProps) {
  return <p className="my-4 text-muted-foreground leading-7">{children}</p>;
} 