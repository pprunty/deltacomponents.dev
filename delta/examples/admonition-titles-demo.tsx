import { Admonition } from '@/delta/components/admonition';

export default function AdmonitionTitlesDemo() {
  return (
    <div className="space-y-4">
      <Admonition type="info" title="Did you know?">
        You can add titles to your admonitions to provide additional context and
        make them more informative.
      </Admonition>
      <Admonition type="tip" title="Great job!">
        Your changes have been saved successfully. The system is now up to date.
      </Admonition>
      <Admonition type="warning" title="Important Notice">
        Please review these changes carefully before proceeding with the next
        steps.
      </Admonition>
      <Admonition type="danger" title="Action Required">
        We encountered an issue processing your request. Please try again or
        contact support.
      </Admonition>
    </div>
  );
}
