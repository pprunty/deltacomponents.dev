import React, { type ReactNode } from "react";
import { Heading } from "./heading";

interface H4Props {
  children: ReactNode;
}

export function H4({ children }: H4Props) {
  return (
    <Heading as="h4" className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-4">
      {children}
    </Heading>
  );
} 