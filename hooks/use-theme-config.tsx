import { createContext, useContext } from "react";

export const ThemeContext = createContext<
  { activeTheme: string; setActiveTheme: (theme: string) => void } | undefined
>(undefined);

export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeConfig must be used within an ActiveThemeProvider"
    );
  }
  return context;
}
