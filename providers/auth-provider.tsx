import { ClerkProvider } from "@clerk/nextjs";
// import { neobrutalism } from "@clerk/themes";
import { BASE_URL } from "@/lib/constants";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        // baseTheme: neobrutalism,
        layout: {
          logoImageUrl: `${BASE_URL}/icons/icon.png`,
          logoLinkUrl: `${BASE_URL}`,
          // privacyPageUrl: `${BASE_URL}/privacy`,
          unsafe_disableDevelopmentModeWarnings: true,
        },
        variables: {
          colorPrimary: "#5294ff",
          colorText: "#000000",
          colorInputBackground: "#e5e7eb",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
