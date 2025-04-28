import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Delta Components',
    short_name: 'Delta',
    description: 'A modern component library and registry built with shadcn/ui',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#4E90F9',
    icons: [
      {
        src: 'icons/16x16.svg',
        sizes: '16x16',
        type: 'image/svg+xml',
      },
      {
        src: 'icons/32x32.svg',
        sizes: '32x32',
        type: 'image/svg+xml',
      },
      {
        src: 'icons/72x72.svg',
        sizes: '72x72',
        type: 'image/svg+xml',
      },
      {
        src: 'icons/96x96.svg',
        sizes: '96x96',
        type: 'image/svg+xml',
      },
      {
        src: 'icons/120x120.svg',
        sizes: '120x120',
        type: 'image/svg+xml',
      },
      {
        src: 'icons/128x128.svg',
        sizes: '128x128',
        type: 'image/svg+xml',
      },
      {
        src: 'icons/144x144.svg',
        sizes: '144x144',
        type: 'image/svg+xml',
      },
      {
        src: 'icons/152x152.svg',
        sizes: '152x152',
        type: 'image/svg+xml',
      },
      {
        src: 'icons/180x180.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
      },
      {
        src: 'icons/192x192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: 'icons/384x384.svg',
        sizes: '384x384',
        type: 'image/svg+xml',
      },
      {
        src: 'icons/512x512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  };
}
