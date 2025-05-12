import { ClerkProvider } from "@clerk/nextjs";
import { SITE_URL } from "@/lib/constants";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: `${SITE_URL}/icons/icon.png`,
          logoLinkUrl: `${SITE_URL}`,
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
