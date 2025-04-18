import { ClerkProvider } from "@clerk/nextjs";
import { BASE_URL } from "@/lib/constants";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: `${BASE_URL}/icons/icon.png`,
          logoLinkUrl: `${BASE_URL}`,
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
