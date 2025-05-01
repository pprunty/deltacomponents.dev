import React, { type ReactNode } from "react";
import { Heading } from "./heading";

interface H1Props {
  children: ReactNode;
}

export function H1({ children }: H1Props) {
  return (
    <Heading as="h1" className="scroll-m-20 text-4xl font-bold tracking-tight mt-6 mb-4">
      {children}
    </Heading>
  );
} 