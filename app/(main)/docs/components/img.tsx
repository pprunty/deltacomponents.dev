import React from "react";
import Image from "next/image";

interface ImgProps {
  src?: string;
  alt?: string;
}

export function Img({ src, alt }: ImgProps) {
  if (!src) {
    return null;
  }

  return (
    <Image 
      src={src} 
      alt={alt || ""} 
      width={800} 
      height={400} 
      className="rounded-lg my-4" 
    />
  );
} 