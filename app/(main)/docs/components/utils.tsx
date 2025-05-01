import React, { type ReactNode, Children } from "react";

/**
 * Converts a string to a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters except hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+/, "") // Trim hyphens from start
    .replace(/-+$/, ""); // Trim hyphens from end
}

/**
 * Extracts text content from React children
 */
export function extractTextFromChildren(children: ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }

  // Check if children is a React element with props.children
  if (
    children &&
    typeof children === "object" &&
    "props" in children &&
    children.props &&
    typeof children.props === "object" &&
    "children" in children.props
  ) {
    return extractTextFromChildren(children.props.children as React.ReactNode);
  }

  return "";
}

// This function supports manual IDs with [#id] syntax
export function withHeadingId(children: ReactNode): { content: ReactNode; id: string } {
  // Check for manual ID specification with [#id] pattern
  const childrenArray = Children.toArray(children);
  let id = "";
  let content = children;

  // Check the last child for [#id] pattern if it's a string
  const lastChild = childrenArray[childrenArray.length - 1];
  if (typeof lastChild === "string") {
    const re = /\[#([^\]]+)\]\s*$/m;
    const match = lastChild.match(re);

    if (match && match[1]?.length) {
      // Use the manually specified ID
      id = match[1];

      // Remove the [#id] part from the content
      const newChildren = [...childrenArray];
      newChildren[newChildren.length - 1] = lastChild.substring(0, match.index);
      content = newChildren;
    }
  }

  // If no manual ID was found, generate one from the text content
  if (!id) {
    const textContent = extractTextFromChildren(children);
    id = slugify(textContent);
  }

  return { content, id };
} 