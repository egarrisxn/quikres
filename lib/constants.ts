// Internal API Requests
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://quikres.vercel.app";

// SEO & Metadata
export const SITE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : (process?.env?.NEXT_PUBLIC_SITE_URL ?? "https://quikres.vercel.app");

export const SITE_DATA: {
  title: string;
  description: string;
  url: string;
  og: string;
  alt: string;
  handle: string;
  locale: string;
} = {
  title: "QuikRes",
  description: "A simple resume builder for everyone!",
  url: SITE_URL,
  og: `${SITE_URL}/images/og.png`,
  alt: "A bright pink background with big 3D styled letters Q and D together to form the QuikRes logo.",
  handle: "@eg__xo",
  locale: "en_US",
};

export const PRIVATE_ROUTES = ["api", "pdf", "preview", "upload", "dashboard"];

export const MAX_USERNAME_LENGTH = 40;

export const BASE_COLORS = [
  {
    name: "minimal",
    label: "Minimal",
    activeColor: {
      light: "oklch(0.208 0.042 265.755)",
      dark: "oklch(0.984 0.003 247.858)",
    },
  },
  {
    name: "brutalist",
    label: "Brutalist",
    activeColor: {
      light: "oklch(67.47% 0.1726 259.49)",
      dark: "oklch(67.47% 0.1726 259.49)",
    },
  },
  {
    name: "canopy",
    label: "Canopy",
    activeColor: {
      light: "oklch(0.67 0.11 118.91)",
      dark: "oklch(0.68 0.06 132.45)",
    },
  },
  {
    name: "serene",
    label: "Serene",
    activeColor: {
      light: "oklch(0.56 0.13 43.00)",
      dark: "oklch(0.56 0.13 43.00)",
    },
  },
  {
    name: "organic",
    label: "Organic",
    activeColor: {
      light: "oklch(0.59 0.2 277.12)",
      dark: "oklch(0.68 0.16 276.93)",
    },
  },

  {
    name: "pixel",
    label: "Pixel",
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
  {
    name: "union",
    label: "Union",
    activeColor: {
      light: "oklch(0.62 0.24 27)",
      dark: "oklch(0.62 0.24 27)",
    },
  },
  {
    name: "pastel",
    label: "Pastel",
    activeColor: {
      light: "oklch(0.77 0.07 290)",
      dark: "oklch(0.77 0.07 290)",
    },
  },
  {
    name: "sol",
    label: "Sol",
    activeColor: {
      light: "oklch(0.62 0.18 38)",
      dark: "oklch(0.62 0.18 38)",
    },
  },
  {
    name: "twilight",
    label: "Twilight",
    activeColor: {
      light: "oklch(0.571 0.286 327)",
      dark: "oklch(0.571 0.286 327)",
    },
  },
  {
    name: "lofi",
    label: "Lofi",
    activeColor: {
      light: "oklch(0 0 0)",
      dark: "oklch(0.9 0.01 337.5)",
    },
  },
  {
    name: "spooky",
    label: "Spooky",
    activeColor: {
      light: "oklch(0.657 0.268 36.4)",
      dark: "oklch(0.55 0.336 36.4)",
    },
  },
] as const;

export type BaseColor = (typeof BASE_COLORS)[number];
