import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { withHeadingId } from "./utils";

interface HeadingProps {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: ReactNode;
  className?: string;
}

export function Heading({ as: Component, children, className }: HeadingProps) {
  const { content, id } = withHeadingId(children);

  return (
    <Component id={id} className={cn("group flex text-foreground", className)}>
      <span className="relative">
        {content}
        <a
          href={`#${id}`}
          className="absolute -left-6 top-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Link to ${id}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </a>
      </span>
    </Component>
  );
} 