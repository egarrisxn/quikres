"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { CheckIcon } from "lucide-react";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { BASE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { SunIcon, MoonIcon } from "@/components/icons";

export default function ThemeDropdown() {
  const { activeTheme, setActiveTheme } = useThemeConfig();
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme: theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='px-0'>Theme</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className='w-48 p-2'>
              <div className='w-full'>
                <div className='flex flex-1 flex-col gap-2 md:gap-4'>
                  <div className='space-y-1.5'>
                    <Label className='text-xs'>Color</Label>
                    <div className='flex flex-col gap-1.5'>
                      {BASE_COLORS.map((color) =>
                        mounted ? (
                          <Button
                            variant='outline'
                            size='sm'
                            key={color.name}
                            onClick={() => setActiveTheme(color.name)}
                            className={cn(
                              "justify-start",
                              activeTheme === color.name &&
                                "border-primary dark:border-primary border-2"
                            )}
                            style={
                              {
                                "--theme-primary": `${
                                  color?.activeColor[
                                    theme === "dark" ? "dark" : "light"
                                  ]
                                }`,
                              } as React.CSSProperties
                            }
                          >
                            <span
                              className={cn(
                                "mr-0.5 flex size-4.5 shrink-0 -translate-x-1 items-center justify-center rounded-full bg-[var(--theme-primary)]"
                              )}
                            >
                              {activeTheme === color.name && (
                                <CheckIcon className='size-4 text-white' />
                              )}
                            </span>
                            {color.label}
                          </Button>
                        ) : (
                          <Skeleton className='h-8 w-full' key={color.name} />
                        )
                      )}
                    </div>
                  </div>
                  <div className='space-y-1.5'>
                    <Label className='text-xs'>Mode</Label>
                    <div className='grid w-full'>
                      {mounted ? (
                        <>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={() =>
                              setTheme(theme === "dark" ? "light" : "dark")
                            }
                          >
                            <SunIcon /> Light
                            <span className='px-1.5'>|</span>
                            <MoonIcon /> Dark
                          </Button>
                        </>
                      ) : (
                        <>
                          <Skeleton className='h-8 w-full' />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
