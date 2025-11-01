export interface ThemeData {
  name: string
  value: string
  description: string
  previewImage: string
  css: string
}

export const dublinTheme: ThemeData = {
  name: "Dublin",
  value: "dublin",
  description:
    "A modern design approach with soft, clay-like elements and subtle shadows.",
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
}`,
}

export const clareTheme: ThemeData = {
  name: "Clare (Solarized)",
  value: "clare",
  description:
    "A precision color scheme with careful balance of warm and cool colors.",
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
}`,
}

export const kerryTheme: ThemeData = {
  name: "Kerry",
  value: "kerry",
  description:
    "A vibrant lime green theme with neobrutalist borders and bold shadows.",
  previewImage: "/images/themes/kerry.png",
  css: `html[data-theme="kerry"] {
  --background: oklch(0.9851 0 0);
  --foreground: oklch(0.2731 0.0716 132.2683);
  --card: oklch(0.9896 0.0110 123.4516);
  --card-foreground: oklch(0.2731 0.0716 132.2683);
  --popover: oklch(0.9896 0.0110 123.4516);
  --popover-foreground: oklch(0.2731 0.0716 132.2683);
  --primary: oklch(0.7917 0.2197 131.9784);
  --primary-foreground: oklch(0.2731 0.0716 132.2683);
  --secondary: oklch(0.9667 0.0671 122.0750);
  --secondary-foreground: oklch(0.2731 0.0716 132.2683);
  --muted: oklch(0.8500 0.0150 118.0405);
  --muted-foreground: oklch(0.2731 0.0716 132.2683);
  --accent: oklch(0.9500 0.0300 121.3554);
  --accent-foreground: oklch(0.2731 0.0716 132.2683);
  --destructive: oklch(0.5830 0.2387 28.4765);
  --destructive-foreground: oklch(1.0000 0 0);
  --border: oklch(0.2731 0.0716 132.2683);
  --input: oklch(0.2731 0.0716 132.2683);
  --ring: oklch(0.7917 0.2197 131.9784);
  --chart-1: oklch(0.7917 0.2197 131.9784);
  --chart-2: oklch(0.8980 0.1965 126.7145);
  --chart-3: oklch(0.9369 0.1264 124.2619);
  --chart-4: oklch(0.7709 0.2156 132.4509);
  --chart-5: oklch(0.6493 0.1841 133.2796);
  --sidebar: oklch(0.9851 0 0);
  --sidebar-foreground: oklch(0.1448 0 0);
  --sidebar-primary: oklch(0.2046 0 0);
  --sidebar-primary-foreground: oklch(0.9851 0 0);
  --sidebar-accent: oklch(0.9702 0 0);
  --sidebar-accent-foreground: oklch(0.2046 0 0);
  --sidebar-border: oklch(0.9219 0 0);
  --sidebar-ring: oklch(0.7090 0 0);
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0px;
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

html[data-theme="kerry"] body,
html[data-theme="kerry"] .font-sans {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
}

.dark {
  --background: oklch(0.1200 0.0300 132.0000);
  --foreground: oklch(0.9600 0.0200 130.0000);
  --card: oklch(0.1600 0.0400 132.0000);
  --card-foreground: oklch(0.9600 0.0200 130.0000);
  --popover: oklch(0.1600 0.0400 132.0000);
  --popover-foreground: oklch(0.9600 0.0200 130.0000);
  --primary: oklch(0.6500 0.1800 132.0000);
  --primary-foreground: oklch(0.1200 0.0300 132.0000);
  --secondary: oklch(0.2200 0.0500 132.0000);
  --secondary-foreground: oklch(0.9600 0.0200 130.0000);
  --muted: oklch(0.2200 0.0500 132.0000);
  --muted-foreground: oklch(0.7500 0.0300 130.0000);
  --accent: oklch(0.3000 0.0600 125.0000);
  --accent-foreground: oklch(0.9600 0.0200 130.0000);
  --destructive: oklch(0.6200 0.2000 25.0000);
  --destructive-foreground: oklch(0.9600 0.0200 130.0000);
  --border: oklch(0.2800 0.0600 132.0000);
  --input: oklch(0.2000 0.0500 132.0000);
  --ring: oklch(0.6500 0.1800 132.0000);
  --chart-1: oklch(0.6500 0.1800 132.0000);
  --chart-2: oklch(0.7200 0.1600 128.0000);
  --chart-3: oklch(0.8000 0.1200 125.0000);
  --chart-4: oklch(0.5800 0.1900 135.0000);
  --chart-5: oklch(0.5200 0.1700 138.0000);
  --sidebar: oklch(0.1600 0.0400 132.0000);
  --sidebar-foreground: oklch(0.9600 0.0200 130.0000);
  --sidebar-primary: oklch(0.6500 0.1800 132.0000);
  --sidebar-primary-foreground: oklch(0.1200 0.0300 132.0000);
  --sidebar-accent: oklch(0.2200 0.0500 132.0000);
  --sidebar-accent-foreground: oklch(0.9600 0.0200 130.0000);
  --sidebar-border: oklch(0.2800 0.0600 132.0000);
  --sidebar-ring: oklch(0.6500 0.1800 132.0000);
  --font-sans: Host Grotesk;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: Space Mono, monospace;
  --radius: 0px;
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
}`,
}

export const galwayTheme: ThemeData = {
  name: "Galway (Claude)",
  value: "galway",
  description:
    "A Claude-inspired theme with warm golden tones and elegant purple accents.",
  previewImage: "/images/themes/galway.png",
  css: `html[data-theme="galway"] {
  --background: oklch(0.9800 0.0050 45.0000);
  --foreground: oklch(0.2500 0.0800 280.0000);
  --card: oklch(0.9850 0.0030 50.0000);
  --card-foreground: oklch(0.2500 0.0800 280.0000);
  --popover: oklch(0.9850 0.0030 50.0000);
  --popover-foreground: oklch(0.2500 0.0800 280.0000);
  --primary: oklch(0.6500 0.2000 35.0000);
  --primary-foreground: oklch(0.9800 0.0050 45.0000);
  --secondary: oklch(0.9200 0.0200 40.0000);
  --secondary-foreground: oklch(0.2500 0.0800 280.0000);
  --muted: oklch(0.9000 0.0150 42.0000);
  --muted-foreground: oklch(0.5500 0.0500 285.0000);
  --accent: oklch(0.7000 0.1500 30.0000);
  --accent-foreground: oklch(0.2500 0.0800 280.0000);
  --destructive: oklch(0.6200 0.2200 25.0000);
  --destructive-foreground: oklch(0.9800 0.0050 45.0000);
  --border: oklch(0.8500 0.0300 38.0000);
  --input: oklch(0.9850 0.0030 50.0000);
  --ring: oklch(0.6500 0.2000 35.0000);
  --chart-1: oklch(0.6500 0.2000 35.0000);
  --chart-2: oklch(0.7200 0.1800 32.0000);
  --chart-3: oklch(0.7800 0.1600 28.0000);
  --chart-4: oklch(0.6800 0.1400 38.0000);
  --chart-5: oklch(0.6000 0.1200 42.0000);
  --sidebar: oklch(0.9800 0.0050 45.0000);
  --sidebar-foreground: oklch(0.2500 0.0800 280.0000);
  --sidebar-primary: oklch(0.6500 0.2000 35.0000);
  --sidebar-primary-foreground: oklch(0.9800 0.0050 45.0000);
  --sidebar-accent: oklch(0.9200 0.0200 40.0000);
  --sidebar-accent-foreground: oklch(0.2500 0.0800 280.0000);
  --sidebar-border: oklch(0.8500 0.0300 38.0000);
  --sidebar-ring: oklch(0.6500 0.2000 35.0000);
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.5rem;
  --shadow-2xs: 0 1px 2px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.08), 0 1px 2px -1px hsl(0 0% 0% / 0.08);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.08), 0 1px 2px -1px hsl(0 0% 0% / 0.08);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.08), 0 2px 4px -1px hsl(0 0% 0% / 0.08);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.08), 0 4px 6px -1px hsl(0 0% 0% / 0.08);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.08), 0 8px 10px -1px hsl(0 0% 0% / 0.08);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.15);
  --tracking-normal: 0em;
  --spacing: 0.25rem;
}

html[data-theme="galway"] body,
html[data-theme="galway"] .font-sans {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
}

html[data-theme="galway"].dark {
  --background: oklch(0.1100 0.0200 280.0000);
  --foreground: oklch(0.9300 0.0300 45.0000);
  --card: oklch(0.1500 0.0250 285.0000);
  --card-foreground: oklch(0.9300 0.0300 45.0000);
  --popover: oklch(0.1500 0.0250 285.0000);
  --popover-foreground: oklch(0.9300 0.0300 45.0000);
  --primary: oklch(0.7500 0.1800 40.0000);
  --primary-foreground: oklch(0.1100 0.0200 280.0000);
  --secondary: oklch(0.2200 0.0400 285.0000);
  --secondary-foreground: oklch(0.9300 0.0300 45.0000);
  --muted: oklch(0.2200 0.0400 285.0000);
  --muted-foreground: oklch(0.7000 0.0400 50.0000);
  --accent: oklch(0.6800 0.1600 35.0000);
  --accent-foreground: oklch(0.1100 0.0200 280.0000);
  --destructive: oklch(0.6800 0.2000 25.0000);
  --destructive-foreground: oklch(0.9300 0.0300 45.0000);
  --border: oklch(0.3000 0.0500 285.0000);
  --input: oklch(0.2500 0.0450 285.0000);
  --ring: oklch(0.7500 0.1800 40.0000);
  --chart-1: oklch(0.7500 0.1800 40.0000);
  --chart-2: oklch(0.7200 0.1600 38.0000);
  --chart-3: oklch(0.6900 0.1400 35.0000);
  --chart-4: oklch(0.6600 0.1200 32.0000);
  --chart-5: oklch(0.6300 0.1000 30.0000);
  --sidebar: oklch(0.1500 0.0250 285.0000);
  --sidebar-foreground: oklch(0.9300 0.0300 45.0000);
  --sidebar-primary: oklch(0.7500 0.1800 40.0000);
  --sidebar-primary-foreground: oklch(0.1100 0.0200 280.0000);
  --sidebar-accent: oklch(0.2200 0.0400 285.0000);
  --sidebar-accent-foreground: oklch(0.9300 0.0300 45.0000);
  --sidebar-border: oklch(0.3000 0.0500 285.0000);
  --sidebar-ring: oklch(0.7500 0.1800 40.0000);
  --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --radius: 0.5rem;
  --shadow-2xs: 0 1px 2px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.08), 0 1px 2px -1px hsl(0 0% 0% / 0.08);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.08), 0 1px 2px -1px hsl(0 0% 0% / 0.08);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.08), 0 2px 4px -1px hsl(0 0% 0% / 0.08);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.08), 0 4px 6px -1px hsl(0 0% 0% / 0.08);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.08), 0 8px 10px -1px hsl(0 0% 0% / 0.08);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.15);
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
}`,
}

export const THEME_DATA = [dublinTheme, clareTheme, kerryTheme, galwayTheme]

export function getThemeData(value: string): ThemeData | undefined {
  return THEME_DATA.find((theme) => theme.value === value)
}
