"use client";

import React, { useState, useRef, useEffect } from 'react';

interface SpotifyProps {
  id: string;
  type?: 'track' | 'playlist';
  width?: string | number;
  height?: string | number;
}

export const Spotify: React.FC<SpotifyProps> = ({
  id,
  type,
  width = '100%',
  height,
}) => {
  // Infer type if not provided
  let resolvedType: 'track' | 'playlist' = 'track';
  if (type) {
    resolvedType = type;
  } else {
    // Heuristic: playlist ids are usually longer and sometimes start with '37' or '5', or contain 'playlist' in the url
    if (id.length > 22 || id.startsWith('37') || id.startsWith('5')) {
      resolvedType = 'playlist';
    }
  }
  const src = `https://open.spotify.com/embed/${resolvedType}/${id}?utm_source=generator`;
  // Default height: 152 for track, 380 for playlist
  const resolvedHeight = height ?? (resolvedType === 'playlist' ? 380 : 152);

  // Memoize loaded state per id+type
  const loadedMapRef = useRef<{ [key: string]: boolean }>({});
  const key = `${resolvedType}:${id}`;
  const [loaded, setLoaded] = useState(() => loadedMapRef.current[key] || false);

  useEffect(() => {
    setLoaded(loadedMapRef.current[key] || false);
  }, [key]);

  return (
    <div className="my-4 relative" style={{ width, height: resolvedHeight }}>
      <iframe
        src={src}
        width={width}
        height={resolvedHeight}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-2xl transition-opacity duration-300"
        style={{ opacity: loaded ? 1 : 0, pointerEvents: loaded ? 'auto' : 'none', position: 'relative', zIndex: 2 }}
        onLoad={() => {
          loadedMapRef.current[key] = true;
          setLoaded(true);
        }}
      />
      {!loaded && (
        <div
          className="absolute top-0 left-0 w-full h-full rounded-2xl bg-muted animate-pulse"
          style={{ backgroundColor: 'var(--muted)', zIndex: 1 }}
        />
      )}
    </div>
  );
};
