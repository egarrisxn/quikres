import { ClerkProvider } from "@clerk/nextjs";
import { SITE_URL } from "@/lib/constants";

export function AuthProvider({ children }: { children: React.ReactNode }) {
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
      signInUrl='/sign-in'
      signUpUrl='/sign-up'
    >
      {children}
    </ClerkProvider>
  );
}
