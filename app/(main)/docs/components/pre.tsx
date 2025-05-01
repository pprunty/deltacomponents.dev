import React, { type ReactNode } from "react";

interface PreProps {
  children: ReactNode;
}

export function Pre({ children }: PreProps) {
  const codeElement = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === "code"
  );

  if (!React.isValidElement(codeElement)) {
    return <pre className="text-muted-foreground">{children}</pre>;
  }

  return codeElement;
} 