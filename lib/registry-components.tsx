import type React from 'react';
// This file will serve as our component registry

// Create placeholder components to fix build
const PlaceholderComponent: React.FC = () => (
  <div>Component Demo Placeholder</div>
);

// Comment out imports that don't exist and use placeholder components instead
// import ShareButtonDemo from "@/delta/components/share-button-demo"
// import AccordionDemo from "@/delta/components/accordion-demo"
// import AccordionNeobrutalismDemo from "@/delta/examples/accordion-neobrutalism-demo"
// import AvatarDemo from "@/delta/components/avatar-demo"
// import AvatarFallbackDemo from "@/delta/examples/avatar-fallback-demo"
// import CommentsSectionDemo from "@/delta/blocks/comments-section-demo"
// import TextEditorDemo from "@/delta/components/text-editor-demo"
// import SnapScrollDemo from "@/delta/components/snap-scroll-demo"
// import TagsInputDemo from "@/delta/components/tags-input-demo"
// import ShareButtonPopoverDemo from "@/delta/examples/share-button-popover-demo"
// import ProductSpotlightCardDemo from "@/delta/components/product-spotlight-card-demo"
// import FooterDemo from "@/delta/components/footer-demo"
// import SocialIconsDemo from "@/delta/components/social-icons-demo"
// import SocialIconsVariantsDemo from "@/delta/examples/social-icons-variants-demo"

// Use placeholder components
const ShareButtonDemo = PlaceholderComponent;
const AccordionDemo = PlaceholderComponent;
const AccordionNeobrutalismDemo = PlaceholderComponent;
const AvatarDemo = PlaceholderComponent;
const AvatarFallbackDemo = PlaceholderComponent;
const CommentsSectionDemo = PlaceholderComponent;
const TextEditorDemo = PlaceholderComponent;
const SnapScrollDemo = PlaceholderComponent;
const TagsInputDemo = PlaceholderComponent;
const ShareButtonPopoverDemo = PlaceholderComponent;
const ProductSpotlightCardDemo = PlaceholderComponent;
const FooterDemo = PlaceholderComponent;
const SocialIconsDemo = PlaceholderComponent;
const SocialIconsVariantsDemo = PlaceholderComponent;

// Create a registry object that maps component names to their implementations
export const registry: Record<string, { component: React.ComponentType }> = {
  'share-button': {
    component: ShareButtonDemo,
  },
  accordion: {
    component: AccordionDemo,
  },
  'accordion-neobrutalism': {
    component: AccordionNeobrutalismDemo,
  },
  avatar: {
    component: AvatarDemo,
  },
  'avatar-fallback': {
    component: AvatarFallbackDemo,
  },
  'comments-section': {
    component: CommentsSectionDemo,
  },
  'text-editor': {
    component: TextEditorDemo,
  },
  'snap-scroll': {
    component: SnapScrollDemo,
  },
  'tags-input': {
    component: TagsInputDemo,
  },
  'share-button-popover': {
    component: ShareButtonPopoverDemo,
  },
  'product-spotlight-card': {
    component: ProductSpotlightCardDemo,
  },
  footer: {
    component: FooterDemo,
  },
  'social-icons': {
    component: SocialIconsDemo,
  },
  'social-icons-variants': {
    component: SocialIconsVariantsDemo,
  },
};
