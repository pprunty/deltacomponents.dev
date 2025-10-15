export interface ThemeData {
  name: string
  value: string
  description: string
  previewImage: string
  css: string
}

export const claymorphismTheme: ThemeData = {
  name: "Claymorphism",
  value: "claymorphism",
  description: "A modern design approach with soft, clay-like elements and subtle shadows.",
  previewImage: "/images/themes/claymorphism.png",
  css: `:root {
  --background: oklch(0.9735 0.0261 90.0953);
  --foreground: oklch(0.5682 0.0285 221.8988);
  --card: oklch(0.9735 0.0261 90.0953);
  --card-foreground: oklch(0.5682 0.0285 221.8988);
  --popover: oklch(0.9735 0.0261 90.0953);
  --popover-foreground: oklch(0.5682 0.0285 221.8988);
  --primary: oklch(0.5808 0.1734 39.6486);
  --primary-foreground: oklch(0.9735 0.0261 90.0953);
  --secondary: oklch(0.9306 0.0260 92.4020);
  --secondary-foreground: oklch(0.5230 0.0283 219.1365);
  --muted: oklch(0.9306 0.0260 92.4020);
  --muted-foreground: oklch(0.6200 0.1800 271.8903);
  --accent: oklch(0.9297 0.0345 67.3823);
  --accent-foreground: oklch(0.5682 0.0285 221.8988);
  --destructive: oklch(0.5863 0.2064 27.1172);
  --destructive-foreground: oklch(0.9735 0.0261 90.0953);
  --border: oklch(0.5808 0.1734 39.6486);
  --input: oklch(0.9306 0.0260 92.4020);
  --ring: oklch(0.6149 0.1394 244.9273);
  --chart-1: oklch(0.6149 0.1394 244.9273);
  --chart-2: oklch(0.6444 0.1508 118.5967);
  --chart-3: oklch(0.6545 0.1340 85.7186);
  --chart-4: oklch(0.5808 0.1732 39.5003);
  --chart-5: oklch(0.5863 0.2064 27.1172);
  --sidebar: oklch(0.9306 0.0260 92.4020);
  --sidebar-foreground: oklch(0.5682 0.0285 221.8988);
  --sidebar-primary: oklch(0.6149 0.1394 244.9273);
  --sidebar-primary-foreground: oklch(0.9735 0.0261 90.0953);
  --sidebar-accent: oklch(0.9248 0.0248 91.6220);
  --sidebar-accent-foreground: oklch(0.5682 0.0285 221.8988);
  --sidebar-border: oklch(0.6979 0.0159 196.7940);
  --sidebar-ring: oklch(0.6149 0.1394 244.9273);
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.625rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: oklch(0 0 0);
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

.dark {
  --background: oklch(0.1450 0 0);
  --foreground: oklch(0.9850 0 0);
  --card: oklch(0.2050 0 0);
  --card-foreground: oklch(0.9850 0 0);
  --popover: oklch(0.2690 0 0);
  --popover-foreground: oklch(0.9850 0 0);
  --primary: oklch(0.9220 0 0);
  --primary-foreground: oklch(0.2050 0 0);
  --secondary: oklch(0.2690 0 0);
  --secondary-foreground: oklch(0.9850 0 0);
  --muted: oklch(0.2690 0 0);
  --muted-foreground: oklch(0.7080 0 0);
  --accent: oklch(0.3710 0 0);
  --accent-foreground: oklch(0.9850 0 0);
  --destructive: oklch(0.7040 0.1910 22.2160);
  --destructive-foreground: oklch(0.9850 0 0);
  --border: oklch(0.2750 0 0);
  --input: oklch(0.3250 0 0);
  --ring: oklch(0.5560 0 0);
  --chart-1: oklch(0.8100 0.1000 252);
  --chart-2: oklch(0.6200 0.1900 260);
  --chart-3: oklch(0.5500 0.2200 263);
  --chart-4: oklch(0.4900 0.2200 264);
  --chart-5: oklch(0.4200 0.1800 266);
  --sidebar: oklch(0.2050 0 0);
  --sidebar-foreground: oklch(0.9850 0 0);
  --sidebar-primary: oklch(0.4880 0.2430 264.3760);
  --sidebar-primary-foreground: oklch(0.9850 0 0);
  --sidebar-accent: oklch(0.2690 0 0);
  --sidebar-accent-foreground: oklch(0.9850 0 0);
  --sidebar-border: oklch(0.2750 0 0);
  --sidebar-ring: oklch(0.4390 0 0);
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.625rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: oklch(0 0 0);
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}`
}

export const solarizedTheme: ThemeData = {
  name: "Solarized",
  value: "solarized", 
  description: "A precision color scheme with careful balance of warm and cool colors.",
  previewImage: "/images/themes/solarized.png",
  css: `:root {
  --background: oklch(0.9735 0.0261 90.0953);
  --foreground: oklch(0.5682 0.0285 221.8988);
  --card: oklch(0.9735 0.0261 90.0953);
  --card-foreground: oklch(0.5682 0.0285 221.8988);
  --popover: oklch(0.9735 0.0261 90.0953);
  --popover-foreground: oklch(0.5682 0.0285 221.8988);
  --primary: oklch(0.5808 0.1734 39.6486);
  --primary-foreground: oklch(0.9735 0.0261 90.0953);
  --secondary: oklch(0.9306 0.0260 92.4020);
  --secondary-foreground: oklch(0.5230 0.0283 219.1365);
  --muted: oklch(0.9306 0.0260 92.4020);
  --muted-foreground: oklch(0.5230 0.0283 219.1365);
  --accent: oklch(0.9297 0.0345 67.3823);
  --accent-foreground: oklch(0.5682 0.0285 221.8988);
  --destructive: oklch(0.5863 0.2064 27.1172);
  --destructive-foreground: oklch(0.9735 0.0261 90.0953);
  --border: oklch(0.5808 0.1734 39.6486);
  --input: oklch(0.9306 0.0260 92.4020);
  --ring: oklch(0.6149 0.1394 244.9273);
  --chart-1: oklch(0.6149 0.1394 244.9273);
  --chart-2: oklch(0.6444 0.1508 118.5967);
  --chart-3: oklch(0.6545 0.1340 85.7186);
  --chart-4: oklch(0.5808 0.1732 39.5003);
  --chart-5: oklch(0.5863 0.2064 27.1172);
  --sidebar: oklch(0.9306 0.0260 92.4020);
  --sidebar-foreground: oklch(0.5682 0.0285 221.8988);
  --sidebar-primary: oklch(0.5808 0.1734 39.6486);
  --sidebar-primary-foreground: oklch(0.9735 0.0261 90.0953);
  --sidebar-accent: oklch(0.9248 0.0248 91.6220);
  --sidebar-accent-foreground: oklch(0.5682 0.0285 221.8988);
  --sidebar-border: oklch(0.6979 0.0159 196.7940);
  --sidebar-ring: oklch(0.6149 0.1394 244.9273);
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.625rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: oklch(0 0 0);
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

.dark {
  --background: oklch(0.1450 0 0);
  --foreground: oklch(0.9850 0 0);
  --card: oklch(0.2050 0 0);
  --card-foreground: oklch(0.9850 0 0);
  --popover: oklch(0.2690 0 0);
  --popover-foreground: oklch(0.9850 0 0);
  --primary: oklch(0.9220 0 0);
  --primary-foreground: oklch(0.2050 0 0);
  --secondary: oklch(0.2690 0 0);
  --secondary-foreground: oklch(0.9850 0 0);
  --muted: oklch(0.2690 0 0);
  --muted-foreground: oklch(0.7080 0 0);
  --accent: oklch(0.3710 0 0);
  --accent-foreground: oklch(0.9850 0 0);
  --destructive: oklch(0.7040 0.1910 22.2160);
  --destructive-foreground: oklch(0.9850 0 0);
  --border: oklch(0.2750 0 0);
  --input: oklch(0.3250 0 0);
  --ring: oklch(0.5560 0 0);
  --chart-1: oklch(0.8100 0.1000 252);
  --chart-2: oklch(0.6200 0.1900 260);
  --chart-3: oklch(0.5500 0.2200 263);
  --chart-4: oklch(0.4900 0.2200 264);
  --chart-5: oklch(0.4200 0.1800 266);
  --sidebar: oklch(0.2050 0 0);
  --sidebar-foreground: oklch(0.9850 0 0);
  --sidebar-primary: oklch(0.4880 0.2430 264.3760);
  --sidebar-primary-foreground: oklch(0.9850 0 0);
  --sidebar-accent: oklch(0.2690 0 0);
  --sidebar-accent-foreground: oklch(0.9850 0 0);
  --sidebar-border: oklch(0.2750 0 0);
  --sidebar-ring: oklch(0.4390 0 0);
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.625rem;
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: oklch(0 0 0);
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}`
}

export const neobrutalismTheme: ThemeData = {
  name: "Neobrutalism",
  value: "neobrutalism",
  description: "Bold, high-contrast design with thick borders and vibrant colors inspired by brutalist architecture.",
  previewImage: "/images/themes/neobrutalism.png",
  css: `:root {
  --background: #ffffff;
  --foreground: #000000;
  --card: #ffffff;
  --card-foreground: #000000;
  --popover: #ffffff;
  --popover-foreground: #000000;
  --primary: #4285F4;
  --primary-foreground: #ffffff;
  --secondary: #f5f5f5;
  --secondary-foreground: #000000;
  --muted: #f5f5f5;
  --muted-foreground: #666666;
  --accent: #ffff00;
  --accent-foreground: #000000;
  --destructive: #ff0000;
  --destructive-foreground: #ffffff;
  --border: #000000;
  --input: #ffffff;
  --ring: #4285F4;
  --chart-1: #4285F4;
  --chart-2: #ffff00;
  --chart-3: #ff0000;
  --chart-4: #00ff00;
  --chart-5: #ff00ff;
  --sidebar: #ffffff;
  --sidebar-foreground: #000000;
  --sidebar-primary: #4285F4;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f5f5f5;
  --sidebar-accent-foreground: #000000;
  --sidebar-border: #000000;
  --sidebar-ring: #4285F4;
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0rem;
  --shadow-2xs: 2px 2px 0px #000000;
  --shadow-xs: 2px 2px 0px #000000;
  --shadow-sm: 3px 3px 0px #000000;
  --shadow: 3px 3px 0px #000000;
  --shadow-md: 4px 4px 0px #000000;
  --shadow-lg: 6px 6px 0px #000000;
  --shadow-xl: 8px 8px 0px #000000;
  --shadow-2xl: 12px 12px 0px #000000;
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

.dark {
  --background: #000000;
  --foreground: #ffffff;
  --card: #1a1a1a;
  --card-foreground: #ffffff;
  --popover: #1a1a1a;
  --popover-foreground: #ffffff;
  --primary: #4285F4;
  --primary-foreground: #ffffff;
  --secondary: #333333;
  --secondary-foreground: #ffffff;
  --muted: #333333;
  --muted-foreground: #cccccc;
  --accent: #ffff00;
  --accent-foreground: #000000;
  --destructive: #ff0000;
  --destructive-foreground: #ffffff;
  --border: #ffffff;
  --input: #1a1a1a;
  --ring: #4285F4;
  --chart-1: #4285F4;
  --chart-2: #ffff00;
  --chart-3: #ff0000;
  --chart-4: #00ff00;
  --chart-5: #ff00ff;
  --sidebar: #1a1a1a;
  --sidebar-foreground: #ffffff;
  --sidebar-primary: #4285F4;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #333333;
  --sidebar-accent-foreground: #ffffff;
  --sidebar-border: #ffffff;
  --sidebar-ring: #4285F4;
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0rem;
  --shadow-2xs: 2px 2px 0px #ffffff;
  --shadow-xs: 2px 2px 0px #ffffff;
  --shadow-sm: 3px 3px 0px #ffffff;
  --shadow: 3px 3px 0px #ffffff;
  --shadow-md: 4px 4px 0px #ffffff;
  --shadow-lg: 6px 6px 0px #ffffff;
  --shadow-xl: 8px 8px 0px #ffffff;
  --shadow-2xl: 12px 12px 0px #ffffff;
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}`
}

export const THEME_DATA = [claymorphismTheme, solarizedTheme, neobrutalismTheme]

export function getThemeData(value: string): ThemeData | undefined {
  return THEME_DATA.find(theme => theme.value === value)
}