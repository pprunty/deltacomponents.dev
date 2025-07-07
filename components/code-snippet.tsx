"use client"

import React from "react"
import { Highlight, PrismTheme } from "prism-react-renderer"

import { cn } from "@/lib/utils"
import theme from "@/styles/prism-theme.json"

import { CopyButton } from "./copy-button"

interface CodeSnippetProps {
  title?: string
  code: string
  language?: string
  className?: string
}

export const CodeSnippet: React.FC<CodeSnippetProps> = ({
  title,
  code,
  language = "typescript",
  className,
}) => {
  const lines = code.trim().split("\n")

  return (
    <div
      className={cn(
        "border border-border rounded-2xl overflow-hidden pointer-events-auto",
        className
      )}
    >
      {title ? (
        <div
          className="flex items-center justify-between pl-4 pr-3 py-2 border-b h-11"
          style={{ backgroundColor: "#1a1a1a", borderBottomColor: "#2a2a2a" }}
        >
          <h3 className="text-sm font-medium" style={{ color: "#FFFFFF" }}>
            {title}
          </h3>
          <CopyButton value={code} />
        </div>
      ) : null}
      <div
        className="relative overflow-y-auto max-h-[calc(530px-44px)] py-4"
        style={{ backgroundColor: "#151515" }}
      >
        {!title && (
          <div
            className={`absolute ${
              lines.length === 1
                ? "top-1/2 -translate-y-1/2 right-3"
                : "top-4 right-3"
            }`}
          >
            <CopyButton value={code} />
          </div>
        )}
        <Highlight
          theme={theme as PrismTheme}
          code={code.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} text-[13px] overflow-x-auto font-mono font-medium`}
              style={style}
            >
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className="flex items-center py-px px-4"
                  style={{}}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#202020")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <span
                    className="mr-4 select-none text-right text-[10px] items-center flex"
                    style={{ color: "#757575" }}
                  >
                    {i + 1}
                  </span>
                  <span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}
