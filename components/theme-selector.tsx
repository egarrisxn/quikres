"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  CheckIcon,
  MoonIcon,
  Palette,
  RepeatIcon,
  SunIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BASE_COLORS } from "@/lib/constants";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig();
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme: theme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='bigIcon'
          className='text-background/70 hover:text-background bg-foreground/70 hover:bg-foreground size-7 rounded-full'
        >
          <Palette className='size-6' />
          <span className='sr-only'>Customize Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='bg-background z-20 w-64 p-0'>
        <div className='p-4'>
          <div className='w-full'>
            <div className='flex items-start pt-4 md:pt-0'>
              <div className='space-y-1.5'>
                <div className='leading-none font-semibold tracking-tight'>
                  Theme Library
                </div>
                <div className='text-muted-foreground max-w-44 text-xs'>
                  Choose the perfect theme and mode for your website.
                </div>
              </div>
              <Button
                variant='ghost'
                size='icon'
                className='rounded-base ml-auto'
                onClick={() => setTheme("system")}
              >
                <RepeatIcon />
                <span className='sr-only'>Reset</span>
              </Button>
            </div>
            <div className='flex flex-1 flex-col gap-2 md:gap-4'>
              <div className='space-y-1.5'>
                <Label className='text-xs'>Color</Label>
                <div className='flex flex-col gap-1.5'>
                  {BASE_COLORS.map((color) => {
                    const isActive = activeTheme === color.name;

                    return mounted ? (
                      <Button
                        variant={"outline"}
                        size='sm'
                        key={color.name}
                        onClick={() => {
                          setActiveTheme(color.name);
                        }}
                        className={cn(
                          "justify-start",
                          isActive &&
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
                          {isActive && (
                            <CheckIcon className='size-4 text-white' />
                          )}
                        </span>
                        {color.label}
                      </Button>
                    ) : (
                      <Skeleton className='h-8 w-full' key={color.name} />
                    );
                  })}
                </div>
              </div>
              <div className='space-y-1.5'>
                <Label className='text-xs'>Mode</Label>
                <div className='grid grid-cols-2 gap-2'>
                  {mounted ? (
                    <>
                      <Button
                        variant={"outline"}
                        size='sm'
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                        className={cn(
                          theme !== "dark" &&
                            "border-primary dark:border-primary border-2"
                        )}
                      >
                        <SunIcon className='mr-0.5 size-4.5 -translate-x-1' />
                        Light
                      </Button>
                      <Button
                        variant={"outline"}
                        size='sm'
                        onClick={() =>
                          setTheme(theme === "light" ? "dark" : "light")
                        }
                        className={cn(
                          theme === "dark" &&
                            "border-primary dark:border-primary border-2"
                        )}
                      >
                        <MoonIcon className='mr-0.5 size-4.5 -translate-x-1' />
                        Dark
                      </Button>
                    </>
                  ) : (
                    <>
                      <Skeleton className='h-8 w-full' />
                      <Skeleton className='h-8 w-full' />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
