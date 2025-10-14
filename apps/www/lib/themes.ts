export const THEMES = [
  {
    name: "Default",
    value: "default",
  },
  {
    name: "Neutral",
    value: "neutral",
  },
  {
    name: "Stone",
    value: "stone",
  },
  {
    name: "Zinc",
    value: "zinc",
  },
  {
    name: "Gray",
    value: "gray",
  },
  {
    name: "Slate",
    value: "slate",
  },
  {
    name: "Scaled",
    value: "scaled",
  },
  {
    name: "Claymorphism",
    value: "claymorphism",
  },
  {
    name: "Solarized",
    value: "solarized",
  },
]
export type Theme = (typeof THEMES)[number]
