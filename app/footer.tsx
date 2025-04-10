import Link from 'next/link';

// Simple inline implementation of SocialIcons
function SocialIcons({ 
  platforms = [], 
  containerClassName = '', 
  linkClassName = '' 
}: { 
  platforms: string[]; 
  containerClassName?: string; 
  linkClassName?: string; 
}) {
  return (
    <div className={containerClassName}>
      {platforms.map(platform => (
        <Link 
          key={platform}
          href={`https://${platform}.com`} 
          className={linkClassName}
          target="_blank"
          rel="noopener noreferrer"
        >
          {platform.charAt(0).toUpperCase() + platform.slice(1)}
        </Link>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <>
      <footer className={`container max-w-3xl mx-auto px-4 sm:px-12 py-12`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* 3) Stay Connected (Row 2, Col 1) */}
          <div>
            <div className="flex flex-wrap">
              <SocialIcons
                platforms={['github', 'twitter', 'linkedin', 'instagram']}
                containerClassName="flex space-x-4 social-link no-after"
                linkClassName="text-muted-foreground hover:text-foreground transition-colors social-link no-after"
              />
            </div>
            {/* © Section */}
            <div className="mt-4 text-xs font-mono text-gray-600 dark:text-[#999999]">
              © {new Date().getFullYear()}{' '}
              <Link
                href="https://patrickprunty.com"
                className="underline decoration-gray-600 dark:decoration-[#999999] underline-offset-4 hover:text-foreground hover:decoration-foreground active:text-primary active:decoration-primary transition-colors"
              >
                Patrick Prunty
              </Link>
              .
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
