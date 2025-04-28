'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/delta/components/accordion';

export default function AccordionBasicDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Accordion type="single" collapsible defaultOpen>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Delta Components?</AccordionTrigger>
          <AccordionContent>
            Delta Components is a collection of reusable React components built
            on top of shadcn/ui. It provides additional features and
            customization options while maintaining the same design system and
            developer experience.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I install it?</AccordionTrigger>
          <AccordionContent>
            You can install Delta Components using the CLI command:
            <code className="ml-2 px-2 py-1 bg-muted rounded text-sm">
              npx shadcn@latest add "component-name"
            </code>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes! All Delta Components are built with accessibility in mind,
            following WAI-ARIA guidelines and best practices. They support
            keyboard navigation, screen readers, and proper ARIA attributes.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
