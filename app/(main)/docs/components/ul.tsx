import React, { type ReactNode } from "react";

interface UlProps {
  children: ReactNode;
}

export function Ul({ children }: UlProps) {
  return <ul className="list-disc pl-6 my-4 text-muted-foreground">{children}</ul>;
} 