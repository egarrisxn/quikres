"use client";

import { useState, useEffect } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { CheckIcon, MoonIcon, RepeatIcon, SunIcon } from "lucide-react";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { BASE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuListItem,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

const PUBLIC_NAV = [
  {
    title: "Sign Up",
    href: "/sign-up",
    description: "Sign up for free today!",
  },
  {
    title: "Sign In",
    href: "/sign-in",
    description: "Sign in to continue!",
  },
];

const PRIVATE_NAV = [
  {
    title: "Upload Resume",
    href: "/upload",
    description: "Upload your resume here",
  },
  {
    title: "Preview Website",
    href: "/preview",
    description: "Finalize your website here",
  },
  {
    title: "Clerk Dashboard",
    href: "/dashboard",
    description: "See your Clerk data here",
  },
];

export default function NavLinks() {
  const { activeTheme, setActiveTheme } = useThemeConfig();
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme: theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <SignedIn>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Links</NavigationMenuTrigger>
            <NavigationMenuContent className='bg-secondary text-secondary-foreground'>
              <div className='w-52 p-2 xl:w-60'>
                <ul className='grid grid-cols-1 space-y-3'>
                  {PRIVATE_NAV.map((navLink) => (
                    <NavigationMenuListItem
                      key={navLink.title}
                      title={navLink.title}
                      href={navLink.href}
                    >
                      {navLink.description}
                    </NavigationMenuListItem>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </SignedIn>

        <SignedOut>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
            <NavigationMenuContent className='bg-secondary text-secondary-foreground'>
              <div className='w-52 p-2 xl:w-60'>
                <ul className='grid grid-cols-1 space-y-3'>
                  {PUBLIC_NAV.map((navLink) => (
                    <NavigationMenuListItem
                      key={navLink.title}
                      title={navLink.title}
                      href={navLink.href}
                    >
                      {navLink.description}
                    </NavigationMenuListItem>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </SignedOut>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Theme</NavigationMenuTrigger>
          <NavigationMenuContent className='bg-secondary'>
            <div className='w-52 p-2 xl:w-60'>
              <div className='w-full'>
                <div className='flex items-start pt-4 pb-1.5 md:pt-0'>
                  <div className='space-y-1.5'>
                    <div className='leading-none font-semibold tracking-tight'>
                      Theme Library
                    </div>
                    <div className='text-secondary-foreground pr-1 text-xs md:pr-0'>
                      Choose the perfect theme and mode for your website.
                    </div>
                  </div>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='rounded-base ml-auto bg-transparent hover:bg-transparent'
                    onClick={() => setTheme("system")}
                  >
                    <RepeatIcon />
                    <span className='sr-only'>Reset</span>
                  </Button>
                </div>
                <div className='flex flex-1 flex-col gap-2 pb-1.5 md:gap-4'>
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
                    <div className='grid grid-cols-2 gap-2'>
                      {mounted ? (
                        <>
                          <Button
                            variant='outline'
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
                            variant='outline'
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
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
