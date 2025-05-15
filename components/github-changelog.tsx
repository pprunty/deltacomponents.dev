'use client';

import { useEffect, useState } from 'react';

interface Release {
  version: string;
  date: string;
  title: string;
  body: string;
  url: string;
}

export function GitHubChangelog() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChangelog() {
      try {
        setLoading(true);
        const response = await fetch('/api/changelog');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch changelog: ${response.status}`);
        }
        
        const data = await response.json();
        setReleases(data);
      } catch (err) {
        console.error('Error fetching changelog:', err);
        setError('Failed to load changelog. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchChangelog();
  }, []);

  if (loading) {
    return <div className="py-4 text-muted-foreground">Loading changelog...</div>;
  }

  if (error) {
    return <div className="py-4 text-destructive">{error}</div>;
  }

  if (releases.length === 0) {
    return <div className="py-4 text-muted-foreground">No releases found. Check back later for updates.</div>;
  }

  return (
    <div className="space-y-8 pb-8">
      {releases.map((release) => (
        <div key={release.version} className="pb-6 border-b border-border">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <a 
              href={release.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {release.title}
            </a>
            <span className="text-sm font-normal text-muted-foreground">
              {release.date}
            </span>
          </h2>
          <div className="mt-3 changelog-content prose dark:prose-invert">
            {formatReleaseBody(release.body)}
          </div>
        </div>
      ))}
    </div>
  );
}

// Helper function to format GitHub markdown content
function formatReleaseBody(body: string) {
  // For now, we'll do a simple return, but you could add a markdown parser here
  return <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(body) }} />;
}

// Basic markdown to HTML conversion (you might want to use a proper markdown library)
function convertMarkdownToHtml(markdown: string) {
  // Convert headings
  let html = markdown
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/# (.*)/g, '<h1>$1</h1>');
  
  // Convert lists
  html = html
    .replace(/- (.*)/g, '<li>$1</li>')
    .replace(/<\/li>\n<li>/g, '</li><li>')
    .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
  
  // Convert paragraphs
  html = html
    .replace(/\n\n(.*)/g, '<p>$1</p>')
  
  // Convert links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  return html;
} 