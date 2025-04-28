'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/delta/components/neobrutalism-card';

const colors = [
  'blue',
  'pink',
  'green',
  'yellow',
  'purple',
  'gray',
  'orange',
  'red',
  'mint',
  'cream',
] as const;

export default function NeobrutalismCardColorVariantsDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full justify-items-center">
      {colors.map((color) => (
        <Card
          key={color}
          color={color}
          hover={true}
          className="max-w-64 mx-auto"
        >
          <CardHeader>
            <CardTitle className="capitalize">{color} Card</CardTitle>
            <CardDescription>
              Neobrutalism style with {color} background
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              This card demonstrates the {color} color variant with hover
              effects.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
