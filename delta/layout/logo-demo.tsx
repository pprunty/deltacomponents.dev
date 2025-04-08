"use client"

import Logo from "./logo";

export default function LogoDemo() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-lg font-medium mb-4">Default Logo</h2>
        <div className="flex items-center gap-4">
          <Logo />
          <p className="text-muted-foreground">Using all default configuration with default title</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Logo without Name</h2>
        <div className="flex items-center gap-4">
          <Logo showName={false} />
          <p className="text-muted-foreground">Logo without title</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Custom Size</h2>
        <div className="flex items-center gap-4">
          <Logo width={60} height={60} />
          <p className="text-muted-foreground">Larger size (60x60) with default title</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Custom Logo</h2>
        <div className="flex items-center gap-4">
          <Logo 
            src="/custom-logo.svg"
            alt="Custom Logo"
            width={50}
            height={50}
          />
          <p className="text-muted-foreground">Custom source and alt text with default title</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">With Click Handler</h2>
        <div className="flex items-center gap-4">
          <Logo 
            onClick={() => alert("Logo clicked!")}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          />
          <p className="text-muted-foreground">Clickable logo with hover effect and default title</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Error State</h2>
        <div className="flex items-center gap-4">
          <Logo 
            src="/non-existent-logo.svg"
            fallbackSrc="/fallback-logo.svg"
            alt="Logo with Error"
          />
          <p className="text-muted-foreground">Shows fallback when main logo fails to load, with default title</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Custom Title</h2>
        <div className="flex items-center gap-4">
          <Logo 
            title="Custom Company Name"
          />
          <p className="text-muted-foreground">Logo with custom title</p>
        </div>
      </div>
    </div>
  );
}
