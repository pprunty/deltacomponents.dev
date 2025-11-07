# Tailwind Breakpoint Indicator Integration

## Component Code

```tsx
// components/tailwind-indicator.tsx
const SHOW = true

export function TailwindIndicator() {
  if (process.env.NODE_ENV === "production" || !SHOW) {
    return null
  }

  return (
    <div className="fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  )
}
```

## Integration

Add to your main layout or app component:

```tsx
import { TailwindIndicator } from "@/components/tailwind-indicator"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <TailwindIndicator />
      </body>
    </html>
  )
}
```

## Features

- **Development only**: Automatically hidden in production
- **Manual toggle**: Set `SHOW = false` to disable
- **All breakpoints**: Shows xs, sm, md, lg, xl, 2xl
- **Non-intrusive**: Small circular indicator in bottom-left corner