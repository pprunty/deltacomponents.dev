'use client';

import { Button } from '@/delta/components/button';

export default function ButtonNeobrutalismDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Default Blue
        </h3>
        <Button title="Neobrutalism" variant="neobrutalism" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-muted-foreground">Pink</h3>
        <Button
          title="Pink Style"
          variant="neobrutalism"
          neobrutalismColor="bg-pink-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-muted-foreground">Green</h3>
        <Button
          title="Green Style"
          variant="neobrutalism"
          neobrutalismColor="bg-green-300"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-muted-foreground">Black</h3>
        <Button
          title="Black Style"
          variant="neobrutalism"
          neobrutalismColor="bg-black"
          className="text-white"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-muted-foreground">Disabled</h3>
        <Button title="Disabled" variant="neobrutalism" disabled />
      </div>
    </div>
  );
}
