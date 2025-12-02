export interface ThemeData {
  name: string
  value: string
  description: string
  previewImage: string
}

export const dublinTheme: ThemeData = {
  name: "Dublin",
  value: "dublin",
  description:
    "A modern design approach with soft, clay-like elements and subtle shadows.",
  previewImage: "/images/themes/claymorphism.png",
}


export const kerryTheme: ThemeData = {
  name: "Kerry",
  value: "kerry",
  description:
    "A vibrant lime green theme with neobrutalist borders and bold shadows.",
  previewImage: "/images/themes/kerry.png",
}

export const galwayTheme: ThemeData = {
  name: "Galway (Claude)",
  value: "galway",
  description:
    "A Claude-inspired theme with warm golden tones and elegant purple accents.",
  previewImage: "/images/themes/galway.png",
}

export const kilkennyTheme: ThemeData = {
  name: "Kilkenny",
  value: "kilkenny",
  description: "A clean, minimal theme with pure black and white contrast.",
  previewImage: "/images/themes/kilkenny.png",
}

export const wexfordTheme: ThemeData = {
  name: "Wexford (Gruvbox)",
  value: "wexford",
  description: "A warm, retro-inspired theme based on the popular Gruvbox color scheme.",
  previewImage: "/images/themes/wexford.png",
}

export const THEME_DATA = [dublinTheme, kerryTheme, galwayTheme, kilkennyTheme, wexfordTheme]

export function getThemeData(value: string): ThemeData | undefined {
  return THEME_DATA.find((theme) => theme.value === value)
}
