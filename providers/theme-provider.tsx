"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeContext } from "@/hooks/use-theme-config";

const COOKIE_NAME = "active_theme";
const DEFAULT_THEME = "default";

const setThemeCookie = (theme: string) => {
  if (typeof window === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${
    window.location.protocol === "https:" ? "Secure;" : ""
  }`;
};

export function ActiveThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTheme, setActiveTheme] = React.useState<string>(DEFAULT_THEME);
  React.useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    if (cookie) {
      const cookieTheme = cookie.split("=")[1];
      if (cookieTheme && cookieTheme !== activeTheme) {
        setActiveTheme(cookieTheme);
      }
    }
    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    setThemeCookie(activeTheme);
    Array.from(document.body.classList)
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => {
        document.body.classList.remove(className);
      });
    document.body.classList.add(`theme-${activeTheme}`);
    if (activeTheme.endsWith("-scaled")) {
      document.body.classList.add("theme-scaled");
    }
  }, [activeTheme]);
  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function() {
            try {
              const themeCookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('active_theme='));
              if (themeCookie) {
                const theme = themeCookie.split('=')[1];
                document.body.classList.add('theme-' + theme);
              }
            } catch (e) {}
          })();
        `,
        }}
      />
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider attribute='class' disableTransitionOnChange {...props}>
      {children}
    </NextThemesProvider>
  );
}
