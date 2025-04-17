"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeContext } from "@/hooks/use-theme-config";
import { setThemeCookie } from "@/lib/utils";
import { DEFAULT_THEME, COOKIE_NAME } from "@/lib/constants";

export function ActiveThemeProvider({ children }: { children: ReactNode }) {
  const [activeTheme, setActiveTheme] = useState<string>(DEFAULT_THEME);

  useEffect(() => {
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

  useEffect(() => {
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
