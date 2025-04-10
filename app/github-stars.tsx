'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Star } from "@phosphor-icons/react/dist/ssr";

interface GitHubStarsProps {
  repo: string;
  className?: string;
}

interface CachedData {
  stars: number;
  timestamp: number;
}

const CACHE_KEY = 'github-stars';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds

function formatStarCount(count: number): string {
  if (count < 1000) return count.toString();
  
  const thousands = count / 1000;
  // If the decimal part is 0, show just the whole number
  if (thousands === Math.floor(thousands)) {
    return `${Math.floor(thousands)}k`;
  }
  // Otherwise show one decimal place
  return `${thousands.toFixed(1)}k`;
}

function getCachedData(repo: string): CachedData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    const data = cache[repo] as CachedData | undefined;
    
    if (!data) return null;
    
    // Check if cache is expired
    if (Date.now() - data.timestamp > CACHE_DURATION) {
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
}

function setCachedData(repo: string, stars: number): void {
  if (typeof window === 'undefined') return;
  
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
    cache[repo] = {
      stars,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error setting cache:', error);
  }
}

export function GitHubStars({ repo, className }: GitHubStarsProps) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    // Try to get cached data first
    const cachedData = getCachedData(repo);
    if (cachedData) {
      setStars(cachedData.stars);
      return;
    }

    // If no cache or expired, fetch from API
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => res.json())
      .then((data) => {
        const starCount = data.stargazers_count;
        setStars(starCount);
        setCachedData(repo, starCount);
      })
      .catch((error) => {
        console.error('Error fetching GitHub stars:', error);
      });
  }, [repo]);

  return (
    <Link 
      href={`https://github.com/${repo}`} 
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {stars !== null ? (
        <span className="inline-flex items-center">
          ({formatStarCount(stars)} <Star size={16} weight="fill" className="text-amber-500 inline-block mx-0.5" />)
        </span>
      ) : ''}
    </Link>
  );
} 