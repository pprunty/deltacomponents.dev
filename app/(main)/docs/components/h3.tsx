import React, { type ReactNode } from "react";
import { Heading } from "./heading";

interface H3Props {
  children: ReactNode;
}

export function H3({ children }: H3Props) {
  return (
    <Heading as="h3" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4">
      {children}
    </Heading>
  );
} 