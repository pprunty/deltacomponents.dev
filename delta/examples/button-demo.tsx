'use client';

import { Button } from '@/delta/components/button';

export default function ButtonDemo() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-center gap-4">
        <Button title="Primary" variant="primary" onClick={() => alert('Primary button clicked!')} />
        <Button title="Secondary" variant="secondary" onClick={() => alert('Secondary button clicked!')} />
        <Button title="Destructive" variant="destructive" onClick={() => alert('Destructive button clicked!')} />
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button title="Action" variant="action" onClick={() => alert('Action button clicked!')} />
        <Button title="Neobrutalism" variant="neobrutalism" onClick={() => alert('Neobrutalism button clicked!')} />
      </div>
    </div>
  )
}
