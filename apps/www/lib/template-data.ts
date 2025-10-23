export interface TemplateData {
  name: string
  value: string
  description: string
  previewImage: string
  category: "blog" | "ai-chat" | "dashboard" | "landing"
  features: string[]
  components: string[]
  demoUrl?: string
  vercelDeployUrl: string
}

export const TEMPLATE_DATA: TemplateData[] = [
  {
    name: "Modern Blog",
    value: "modern-blog",
    description: "A clean, responsive blog template with markdown support and SEO optimization.",
    previewImage: "/templates/blog-preview.jpg",
    category: "blog",
    features: [
      "Responsive design",
      "Markdown support",
      "SEO optimized",
      "Dark mode",
      "Reading time estimation"
    ],
    components: ["card", "button", "typography", "navigation"],
    demoUrl: "/templates/blog-demo",
    vercelDeployUrl: "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpprunty%2Fdeltacomponents.dev%2Ftree%2Fmain%2Ftemplates%2Fmodern-blog"
  },
  {
    name: "AI Chat Interface",
    value: "ai-chat-interface",
    description: "Complete AI chat interface with voice input, audio playback, and conversation management.",
    previewImage: "/templates/ai-chat-preview.jpg",
    category: "ai-chat",
    features: [
      "Voice input & output",
      "Real-time streaming",
      "Conversation history",
      "Multi-modal support",
      "Custom avatars"
    ],
    components: ["chat", "voice-button", "audio-player", "conversation", "message"],
    demoUrl: "/templates/ai-chat-demo",
    vercelDeployUrl: "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpprunty%2Fdeltacomponents.dev%2Ftree%2Fmain%2Ftemplates%2Fai-chat-interface"
  },
  {
    name: "SaaS Dashboard",
    value: "saas-dashboard",
    description: "Comprehensive SaaS dashboard template with analytics, user management, and subscription metrics.",
    previewImage: "/templates/saas-dashboard-preview.jpg",
    category: "dashboard",
    features: [
      "User analytics",
      "Subscription metrics",
      "Revenue tracking",
      "Team management",
      "API monitoring"
    ],
    components: ["charts", "tables", "cards", "navigation", "sidebar"],
    demoUrl: "/templates/saas-dashboard-demo",
    vercelDeployUrl: "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpprunty%2Fdeltacomponents.dev%2Ftree%2Fmain%2Ftemplates%2Fsaas-dashboard"
  },
  {
    name: "SaaS Landing Page",
    value: "saas-landing",
    description: "High-converting landing page template for SaaS products with pricing and testimonials.",
    previewImage: "/templates/landing-preview.jpg",
    category: "landing",
    features: [
      "Hero section",
      "Pricing tables",
      "Testimonials",
      "CTA sections",
      "Mobile optimized"
    ],
    components: ["hero", "pricing", "testimonials", "cta", "navigation"],
    demoUrl: "/templates/landing-demo",
    vercelDeployUrl: "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpprunty%2Fdeltacomponents.dev%2Ftree%2Fmain%2Ftemplates%2Fsaas-landing"
  },
  {
    name: "Documentation Blog",
    value: "docs-blog",
    description: "Technical blog template with code highlighting, table of contents, and search functionality.",
    previewImage: "/templates/docs-blog-preview.jpg",
    category: "blog",
    features: [
      "Code highlighting",
      "Table of contents",
      "Search functionality",
      "Categories & tags",
      "Author profiles"
    ],
    components: ["code-block", "search", "navigation", "toc", "author-card"],
    demoUrl: "/templates/docs-blog-demo",
    vercelDeployUrl: "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpprunty%2Fdeltacomponents.dev%2Ftree%2Fmain%2Ftemplates%2Fdocs-blog"
  },
  {
    name: "Agency Landing",
    value: "agency-landing",
    description: "Professional agency landing page with portfolio showcase and contact forms.",
    previewImage: "/templates/agency-landing-preview.jpg",
    category: "landing",
    features: [
      "Portfolio showcase",
      "Team profiles",
      "Contact forms",
      "Service sections",
      "Case studies"
    ],
    components: ["portfolio", "team-cards", "contact-form", "hero", "testimonials"],
    demoUrl: "/templates/agency-landing-demo",
    vercelDeployUrl: "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpprunty%2Fdeltacomponents.dev%2Ftree%2Fmain%2Ftemplates%2Fagency-landing"
  }
]

export const TEMPLATE_CATEGORIES = [
  { value: "all", label: "All Templates" },
  { value: "blog", label: "Blog" },
  { value: "ai-chat", label: "AI Chat Interface" },
  { value: "dashboard", label: "Dashboard" },
  { value: "landing", label: "Landing Page" }
] as const

export type TemplateCategory = typeof TEMPLATE_CATEGORIES[number]["value"]