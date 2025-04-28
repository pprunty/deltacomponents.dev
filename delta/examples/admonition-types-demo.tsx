import { Admonition } from '@/delta/components/admonition';

export default function AdmonitionTypesDemo() {
  return (
    <div className="space-y-4">
      <Admonition type="note">
        This is a note that helps explain important concepts or provides
        additional context.
      </Admonition>

      <Admonition type="tip">
        Here's a helpful tip that can improve your workflow or understanding.
      </Admonition>

      <Admonition type="info">
        This is an informational message providing useful details about the
        topic.
      </Admonition>

      <Admonition type="warning">
        Be careful! This warning highlights potential issues you should be aware
        of.
      </Admonition>

      <Admonition type="danger">
        Attention required! This indicates a dangerous or breaking change that
        needs immediate attention.
      </Admonition>
    </div>
  );
}
