export async function GET() {
  const llmsContent = `# Delta Components UI

Delta Components UI is a custom shadcn registry built on top of shadcn/ui. It focuses on the high-impact, production-ready components that shadcn/ui doesn't cover out of the box: LLM chat, interactive media, code display, content callouts, and pre-built layout blocks.

## Overview

Delta Components UI helps developers ship polished, AI-ready interfaces faster. Components are distributed through the shadcn CLI — you copy the code into your project and own it.

Built for:

- AI and chat applications (streaming chat, message primitives)
- Rich media experiences (zoomable images, card decks, marquees, maps)
- Content-heavy interfaces (admonitions, code blocks, scroll effects)
- Landing pages and dashboards (pre-built blocks ready to drop in)

## Installation

Install any component via the shadcn CLI with the registry URL:

\`\`\`bash
npx shadcn@latest add https://deltacomponents.dev/r/<component-name>.json
\`\`\`

Prerequisites: Node.js 18+ and a shadcn/ui-initialized project (\`npx shadcn@latest init\`).

## Components

### Content & Callouts
- **Admonition** (https://deltacomponents.dev/docs/components/admonition.md): Semantic callout blocks (note, warning, success, caution, danger, info, tip) with automatic icons, plus dismissible and collapsible variants.
- **Code Block** (https://deltacomponents.dev/docs/components/code-block.md): Syntax-highlighted code display with Markdown-fence parsing, package-manager tabs, expandable viewport, and adaptive themes.

### Media
- **Cambio Image** (https://deltacomponents.dev/docs/components/cambio-image.md): Physics-based zoomable image component with blur-up loading and gesture dismissal.
- **Card Deck** (https://deltacomponents.dev/docs/components/card-deck.md): Swipeable, physics-based card stack with autoplay and customizable motion.
- **Marquee** (https://deltacomponents.dev/docs/components/marquee.md): Infinite-scrolling rail for logos, testimonials, or feature cards.
- **QR Code** (https://deltacomponents.dev/docs/components/qrcode.md): Customizable QR code generator with theme-aware coloring, custom dot styling, and centered logo embedding.
- **X Card (Twitter)** (https://deltacomponents.dev/docs/components/x-card.md): Themed, static, high-performance embeds for X/Twitter posts.

### Navigation & Layout
- **Animated Tabs** (https://deltacomponents.dev/docs/components/tabs.md): Tabs with smooth CSS transitions, three visual variants (underlined, ghost, pill), and entrance animations.
- **Navigation Menu** (https://deltacomponents.dev/docs/components/navigation-menu.md): Accessible link groups for desktop and mobile site navigation.
- **Scroll Fade Effect** (https://deltacomponents.dev/docs/components/scroll-fade-effect.md): Scroll container with edge fades indicating available content; supports vertical, horizontal, and both.
- **Vanishing Scrollbar** (https://deltacomponents.dev/docs/components/vanishing-scrollbar.md): Scroll container that hides the native scrollbar and fades it in on hover.

### Maps & Commerce
- **MapBox Pointer** (https://deltacomponents.dev/docs/components/mapbox-pointer.md): Interactive maps with custom React markers on top of Mapbox GL JS.
- **Product Card** (https://deltacomponents.dev/docs/components/product-card.md): Compound commerce component with multiple layout variants, sizing options, and hover states.

### Forms
- **Input OTP** (https://deltacomponents.dev/docs/components/input-otp.md): Accessible one-time password input with copy-paste support and pill / separator variants.

### AI & Chat
- **LLM Chat** (https://deltacomponents.dev/docs/components/chat.md): Complete AI chat interface with streaming responses, file uploads, and model selection. Composable message / conversation / response primitives for custom chat UIs.

## Blocks

Pre-built page sections and layouts you can install with the same CLI:

- **AI Chat Sidebar** (https://deltacomponents.dev/blocks/ai-elements): Sidebar layout for AI chat applications.
- **Chatbot Window** (https://deltacomponents.dev/blocks/ai-elements): Resizable AI chatbot interface with collapsible sidebar.
- **Interactive Feature Showcase** (https://deltacomponents.dev/blocks/landing-page): Feature grid with interactive media cards for landing pages.
- **Testimonials** (https://deltacomponents.dev/blocks/landing-page): Customer testimonials grid for social proof.
- **MapBox Grid Block** (https://deltacomponents.dev/blocks/landing-page): Three-column grid of global locations on Mapbox maps.
- **Bottom Mobile Nav** (https://deltacomponents.dev/blocks/layout): Mobile-first layout with a bottom navigation bar.
- **Admin Inset Layout** (https://deltacomponents.dev/blocks/dashboard): Admin dashboard layout with inset sidebar, breadcrumbs, command menu.
- **SaaS Dashboard** (https://deltacomponents.dev/blocks/dashboard): SaaS dashboard with inset sidebar, navigation, and search.
- **Auth Form** (https://deltacomponents.dev/blocks/authentication): Authentication form with SSO, email, passkey, and SAML options.

## Technical Details

- React 18+ and Next.js 13+
- Tailwind CSS 3 for styling
- Full TypeScript support
- OKLCH-based theme system with multiple built-in themes (Dublin, Kerry, Galway, Kilkenny, Wexford, Limerick, Sligo)
- Accessibility-first: keyboard navigation, ARIA, and focus management
- Responsive by default
- Works in light and dark modes out of the box

## Use Cases

- AI agent interfaces and chat applications
- SaaS dashboards and admin tools
- Landing pages with interactive media
- Documentation and content-heavy sites
- E-commerce product interfaces
- Authentication and onboarding flows

## Repository

Source code and documentation: https://github.com/pprunty/deltacomponents.dev

## License

MIT. Components are open source and can be customized and extended for any project.
`

  return new Response(llmsContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
