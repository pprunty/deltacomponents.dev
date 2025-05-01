'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import React from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { DotPattern } from '@/components/dot-pattern';
import { cn } from "@/lib/utils"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background Dot Pattern */}
      <DotPattern className={cn("[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]")} />
      
      {/* Content remains unchanged but with z-10 to sit above the background */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-xs w-full flex flex-col items-center relative z-10"
      >
        {/* Centered logo - increased size */}
        <svg
          className="w-14 h-14 fill-foreground dark:fill-foreground transition-colors mb-8"
          viewBox="0 0 282 308"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M280.438 295.396L152.117 5.66075C151.645 3.87252 150.584 2.32152 149.12 1.29292C147.665 0.264327 145.896 -0.172778 144.147 0.0619372H120.258C118.509 -0.172778 116.74 0.264327 115.285 1.29292C113.821 2.32152 112.76 3.87252 112.288 5.66075L0.780777 295.396C0.171502 296.774 -0.0839596 298.294 0.0241376 299.81C0.132235 301.327 0.603995 302.788 1.40981 304.052C2.2058 305.318 3.30641 306.345 4.58392 307.034C5.87126 307.725 7.30596 308.054 8.75053 307.993H272.92C279.111 307.993 284.86 300.528 280.438 295.396ZM122.469 127.434L177.775 250.605C178.384 252.07 178.65 253.664 178.551 255.257C178.453 256.85 177.991 258.395 177.215 259.765C176.429 261.133 175.358 262.286 174.07 263.128C172.783 263.969 171.329 264.475 169.815 264.602H68.037C66.4941 264.493 64.9807 264.019 63.6246 263.213C62.2685 262.408 61.1089 261.293 60.2146 259.951C59.3204 258.607 58.7307 257.07 58.4752 255.454C58.2197 253.836 58.318 252.18 58.7504 250.605L106.539 127.434C107.266 125.856 108.397 124.525 109.802 123.594C111.207 122.663 112.838 122.169 114.499 122.169C116.17 122.169 117.791 122.663 119.206 123.594C120.612 124.525 121.741 125.856 122.469 127.434Z" />
        </svg>

      
        {/* Side-by-side uppercase text links instead of buttons */}
        <div className="flex text-muted-foreground/70 justify-center gap-10 mb-6 font-medium text-xs tracking-wider">
          <Link 
            href="/docs/introduction"
            prefetch
            className="uppercase hover:text-primary transition-colors underline"
          >
            Documentation
          </Link>
          
          <Link 
            href="https://github.com/pprunty/deltacomponents.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase hover:text-primary transition-colors flex items-center underline"
          >
            GitHub
            <ArrowUpRight size={12} className="ml-1" />
          </Link>
        </div>

        
        {/* Attribution with icon */}
        <div className="w-full flex justify-end items-center text-xs text-muted-foreground/70">
          <span>BY</span>
              <a 
                href="https://patrickprunty.com" 
                target="_blank" 
                rel="noopener noreferrer"
            className="flex items-center gap-1 ml-1 font-medium hover:text-primary"
              >
            <span className="underline">PATRICK PRUNTY</span>
            <ArrowUpRight
              size={16}
              weight="bold"
              className="text-muted-foreground ml-1"
            />
          </a>
        </div>
      </motion.div>
    </div>
  );
} 