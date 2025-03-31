import Link from 'next/link';
import { Button } from '@/delta/components/button';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6">
          Delta Components
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          A collection of modern, customizable React components built with Next.js and Tailwind CSS.
        </p>
        <div className="w-full max-w-2xl aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-8 flex items-center justify-center">
          <span className="text-gray-400 dark:text-gray-600">Component Preview Coming Soon</span>
        </div>
        <div className="flex gap-4">
          <Link href="/docs" className="w-auto">
            <Button
              title="View Components"
              variant="primary"
              className="w-full"
            />
          </Link>
          <Link 
            href="https://github.com/pprunty/deltacomponents.dev" 
            target="_blank"
            rel="noreferrer"
            className="w-auto"
          >
            <Button
              title="GitHub"
              variant="secondary"
              className="w-full"
            />
          </Link>
        </div>
      </section>
    </div>
  );
} 