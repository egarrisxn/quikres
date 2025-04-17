"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SunIcon } from "@/components/icons";
import { MoonIcon } from "@/components/icons";

export default function ThemeToggle() {
  const { theme: activeTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      size='icon'
      variant='neutral'
      aria-label='Toggle Theme'
      onClick={() => setTheme(activeTheme === "light" ? "dark" : "light")}
      className='size-8'
    >
      {mounted ? (
        activeTheme === "light" ? (
          <SunIcon className='size-4' />
        ) : (
          <MoonIcon className='size-4' />
        )
      ) : (
        <span style={{ opacity: 0 }} aria-hidden></span>
      )}
    </Button>
  );
}
