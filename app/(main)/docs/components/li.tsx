import React, { type ReactNode } from "react";

interface LiProps {
  children: ReactNode;
}

export function Li({ children }: LiProps) {
  return <li className="mt-1 text-muted-foreground">{children}</li>;
} 