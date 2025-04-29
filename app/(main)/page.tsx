'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top section with logo and mobile attribution */}
      <div className="p-4 flex justify-between items-center">
        {/* Logo in top left */}
        <svg
          className="w-8 h-8 fill-foreground dark:fill-foreground transition-colors"
          viewBox="0 0 282 308"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M280.438 295.396L152.117 5.66075C151.645 3.87252 150.584 2.32152 149.12 1.29292C147.665 0.264327 145.896 -0.172778 144.147 0.0619372H120.258C118.509 -0.172778 116.74 0.264327 115.285 1.29292C113.821 2.32152 112.76 3.87252 112.288 5.66075L0.780777 295.396C0.171502 296.774 -0.0839596 298.294 0.0241376 299.81C0.132235 301.327 0.603995 302.788 1.40981 304.052C2.2058 305.318 3.30641 306.345 4.58392 307.034C5.87126 307.725 7.30596 308.054 8.75053 307.993H272.92C279.111 307.993 284.86 300.528 280.438 295.396ZM122.469 127.434L177.775 250.605C178.384 252.07 178.65 253.664 178.551 255.257C178.453 256.85 177.991 258.395 177.215 259.765C176.429 261.133 175.358 262.286 174.07 263.128C172.783 263.969 171.329 264.475 169.815 264.602H68.037C66.4941 264.493 64.9807 264.019 63.6246 263.213C62.2685 262.408 61.1089 261.293 60.2146 259.951C59.3204 258.607 58.7307 257.07 58.4752 255.454C58.2197 253.836 58.318 252.18 58.7504 250.605L106.539 127.434C107.266 125.856 108.397 124.525 109.802 123.594C111.207 122.663 112.838 122.169 114.499 122.169C116.17 122.169 117.791 122.663 119.206 123.594C120.612 124.525 121.741 125.856 122.469 127.434Z" />
        </svg>
        
        {/* By Patrick Prunty - visible only on mobile */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:hidden"
        >
          <p className="text-xs text-muted-foreground whitespace-nowrap">
            BY{' '}
            <a 
              href="https://patrickprunty.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              PATRICK PRUNTY
            </a>
          </p>
        </motion.div>
      </div>
      
      {/* Main content - Buttons in the middle */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-row gap-5 justify-center"
        >
          {/* Filled pill button */}
          <Link 
            href="/docs/introduction"
            prefetch
            className="inline-flex h-10 items-center justify-center rounded-full bg-primary text-primary-foreground px-8 text-xs font-medium transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_4px_12px_rgba(255,255,255,0.06)] hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            DOCUMENTATION
          </Link>
          
          {/* Outlined pill button */}
          <Link 
            href="https://github.com/pprunty/deltacomponents.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-full border border-foreground bg-transparent px-8 text-xs font-medium transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.03)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_4px_12px_rgba(255,255,255,0.06)] hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            GITHUB
          </Link>
        </motion.div>
      </div>
      
      {/* Footer container */}
      <div className="mt-auto w-full">
        {/* Mobile text block - positioned at bottom left */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-4 md:hidden"
        >
          <div className="space-y-3 font-mono uppercase tracking-wide text-muted-foreground text-left max-w-xs">
            <p className="text-xs">
              WELCOME TO MY INTERNET PLAYGROUND.
            </p>
            <p className="text-xs uppercase">
              Delta Components is a collection of high-performance, aesthetically refined UI elements designed to make the difference in your user interface.              
            </p>
          </div>
        </motion.div>
        
        {/* Desktop footer with text block and attribution side by side */}
        <div className="hidden md:flex p-6 justify-between items-end">
          {/* Desktop text block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-3 font-mono uppercase tracking-wide text-muted-foreground text-left max-w-xs">
              <p className="text-xs">
                WELCOME TO MY INTERNET PLAYGROUND.
              </p>
              <p className="text-xs uppercase">
                Delta Components is a collection of high-performance, aesthetically refined UI elements designed to make the difference in your user interface.              
              </p>
            </div>
          </motion.div>
          
          {/* By Patrick Prunty - desktop only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xs text-muted-foreground whitespace-nowrap">
              BY{' '}
              <a 
                href="https://patrickprunty.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                PATRICK PRUNTY
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 