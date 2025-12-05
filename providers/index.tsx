"use client";

import * as React from "react";
import { ThemeProvider, ActiveThemeProvider } from "./theme-provider";
import { AuthProvider } from "./auth-provider";
import { ClientProvider } from "./client-provider";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClientProvider>
      <AuthProvider>
        <ThemeProvider>
          <ActiveThemeProvider>
            {children} <Toaster richColors position='bottom-center' />
          </ActiveThemeProvider>
        </ThemeProvider>
      </AuthProvider>
    </ClientProvider>
  );
}
