import React from "react";
import CodeBlock from "@/delta/components/code-block";

interface CodeProps {
  children: string;
  className?: string;
}

export function Code({ children, className }: CodeProps) {
  const language = className?.replace(/language-/, "");

  if (language) {
    return (
      <CodeBlock
        code={children}
        language={language}
        showLineNumbers={true}
        showCopyButton={true}
        showExpandButton={true}
        theme="default"
        maxHeight="400px"
        border={true}
      />
    );
  }

  return (
    <code className="px-1 py-0.5 bg-muted rounded text-sm font-mono text-muted-foreground">
      {children}
    </code>
  );
} 