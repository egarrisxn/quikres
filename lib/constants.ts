export const PRIVATE_ROUTES = ["api", "pdf", "preview", "upload", "dashboard"];

export const MAX_USERNAME_LENGTH = 40;

export const DEFAULT_THEME = "default";

export const COOKIE_NAME = "active_theme";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://quikres.vercel.app";

export const SITE_DATA: {
  title: string;
  description: string;
  url: string;
  og: string;
  alt: string;
  handle: string;
  locale: string;
} = {
  title: "Quik|Res",
  description: "A simple resume builder for everyone!",
  url: BASE_URL,
  og: `${BASE_URL}/images/og.png`,
  alt: "A bright pink background with big 3D styled letters Q and D together to form the Quik|Res logo.",
  handle: "@eg__xo",
  locale: "en_US",
};

export const PUBLIC_NAV = [
  {
    title: "Login",
    href: "/sign-in",
    description: "Sign in to create your site!",
  },
  {
    title: "Sign Up",
    href: "/sign-up",
    description: "Sign up for free to begin!",
  },
];

export const PRIVATE_NAV = [
  {
    title: "Clerk Dashboard",
    href: "/dashboard",
    description: "Where user details live",
  },
  {
    title: "Edit/Preview Resume",
    href: "/preview",
    description: "Finalize your website here",
  },
];

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
