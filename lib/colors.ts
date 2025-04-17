export const baseColors = [
  {
    name: "base",
    label: "Base",
    activeColor: {
      light: "oklch(0.208 0.042 265.755)",
      dark: "oklch(0.984 0.003 247.858)",
    },
  },
  {
    name: "brutal",
    label: "Brutal",
    activeColor: {
      light: "oklch(67.47% 0.1726 259.49)",
      dark: "oklch(67.47% 0.1726 259.49)",
    },
  },
  {
    name: "claude",
    label: "Claude",
    activeColor: {
      light: "oklch(0.56 0.13 43.00)",
      dark: "oklch(0.56 0.13 43.00)",
    },
  },
  {
    name: "clay",
    label: "Clay",
    activeColor: {
      light: "oklch(0.59 0.2 277.12)",
      dark: "oklch(0.68 0.16 276.93)",
    },
  },
  {
    name: "grove",
    label: "Grove",
    activeColor: {
      light: "oklch(0.67 0.11 118.91)",
      dark: "oklch(0.68 0.06 132.45)",
    },
  },
  {
    name: "retro",
    label: "Retro",
    activeColor: {
      light: "oklch(0.59 0.2 355.89)",
      dark: "oklch(0.59 0.2 355.89)",
    },
  },
  {
    name: "vintage",
    label: "Vintange",
    activeColor: {
      light: "oklch(0.62 0.08 65.54)",
      dark: "oklch(0.73 0.06 66.7)",
    },
  },
] as const;

export type BaseColor = (typeof baseColors)[number];
