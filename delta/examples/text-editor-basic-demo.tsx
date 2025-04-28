'use client';

import { useState } from 'react';
import { TextEditor } from '@/delta/components/text-editor';

export default function TextEditorBasicDemo() {
  const [content, setContent] = useState<string>(`
    <h1><strong>Welcome to Delta Components</strong></h1>
    
    <p>Here is an example of some text created using delta's text editor:</p>

    <ul>
      <li>This text is in <em>italics</em></li>
      <li>This text is in <strong>bold</strong></li>
      <li>This text is <strong><em>bold and italic</em></strong></li>
    </ul>
  `);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <TextEditor initialContent={content} onChange={setContent} />
    </div>
  );
}
