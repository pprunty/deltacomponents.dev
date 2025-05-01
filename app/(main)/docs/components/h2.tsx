import React, { type ReactNode } from "react";
import { Heading } from "./heading";

interface H2Props {
  children: ReactNode;
}

export function H2({ children }: H2Props) {
  return (
    <Heading as="h2" className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
      {children}
    </Heading>
  );
} 