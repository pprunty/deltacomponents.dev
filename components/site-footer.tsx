import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <div className="py-12 px-4 md:py-4 md:px-4">
      <footer className="md:border-t border-border h-14 md:h-20 md:rounded-2xl md:bg-background md:border md:px-4 flex items-center justify-center md:justify-start">
        <div className="text-balance text-center text-sm md:text-base leading-loose text-muted-foreground md:text-left">
          💙 Built by{" "}
          <a
            href="https://patrickprunty.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground no-underline transition-colors hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Patrick Prunty
          </a>
          . The source code is available on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground no-underline transition-colors hover:text-foreground relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            GitHub
          </a>
          .
        </div>
      </footer>
    </div>
  )
}
