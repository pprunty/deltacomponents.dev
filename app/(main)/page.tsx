'use client';

import Link from 'next/link';
// import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-10">
      {/* Hero section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="flex justify-center mb-6">
          <svg
            className="w-16 h-16 fill-foreground dark:fill-foreground transition-colors"
            viewBox="0 0 282 308"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M280.438 295.396L152.117 5.66075C151.645 3.87252 150.584 2.32152 149.12 1.29292C147.665 0.264327 145.896 -0.172778 144.147 0.0619372H120.258C118.509 -0.172778 116.74 0.264327 115.285 1.29292C113.821 2.32152 112.76 3.87252 112.288 5.66075L0.780777 295.396C0.171502 296.774 -0.0839596 298.294 0.0241376 299.81C0.132235 301.327 0.603995 302.788 1.40981 304.052C2.2058 305.318 3.30641 306.345 4.58392 307.034C5.87126 307.725 7.30596 308.054 8.75053 307.993H272.92C279.111 307.993 284.86 300.528 280.438 295.396ZM122.469 127.434L177.775 250.605C178.384 252.07 178.65 253.664 178.551 255.257C178.453 256.85 177.991 258.395 177.215 259.765C176.429 261.133 175.358 262.286 174.07 263.128C172.783 263.969 171.329 264.475 169.815 264.602H68.037C66.4941 264.493 64.9807 264.019 63.6246 263.213C62.2685 262.408 61.1089 261.293 60.2146 259.951C59.3204 258.607 58.7307 257.07 58.4752 255.454C58.2197 253.836 58.318 252.18 58.7504 250.605L106.539 127.434C107.266 125.856 108.397 124.525 109.802 123.594C111.207 122.663 112.838 122.169 114.499 122.169C116.17 122.169 117.791 122.663 119.206 123.594C120.612 124.525 121.741 125.856 122.469 127.434Z" />
          </svg>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Delta Components
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          A modern component library for Next.js applications
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/docs/introduction"
            prefetch
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Documentation
          </Link>
          
          <Link 
            href="https://github.com/pprunty/deltacomponents.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Link>
        </div>
      </motion.div>
      
      {/* Features section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
      >
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Customizable</h2>
          <p className="text-muted-foreground">Easily adapt components to match your design system</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Accessible</h2>
          <p className="text-muted-foreground">Built with accessibility in mind following WCAG standards</p>
        </div>
        
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Performant</h2>
          <p className="text-muted-foreground">Optimized for performance and minimal bundle size</p>
        </div>
      </motion.div>
      
      {/* Creator section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <p className="text-sm text-muted-foreground">
          Created by{' '}
          <a 
            href="https://patrickprunty.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            Patrick Prunty
          </a>
        </p>
      </motion.div>
    </div>
  );
} 