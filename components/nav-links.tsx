"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { CheckIcon, MoonIcon, RepeatIcon, SunIcon } from "lucide-react";
import { BASE_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuListItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const PUBLIC_NAV = [
  {
    title: "Login",
    href: "/sign-in",
    description: "Sign in to create your site!",
  },
  {
    title: "Sign Up",
    href: "/sign-up",
    description: "Sign up for free to begin!",
  },
];

const PRIVATE_NAV = [
  {
    title: "Clerk Dashboard",
    href: "/dashboard",
    description: "Where user details live",
  },
  {
    title: "Edit/Preview Resume",
    href: "/preview",
    description: "Finalize your website here",
  },
];

export function NavLinks() {
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
          {PRIVATE_NAV.length > 0 && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>Helpful Links</NavigationMenuTrigger>
              <NavigationMenuContent className='x'>
                <div className='w-64 p-2'>
                  <ul className='grid gap-y-3'>
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
          )}
        </SignedIn>
        <SignedOut>
          {PUBLIC_NAV.length > 0 && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
              <NavigationMenuContent className='x'>
                <div className='w-64 p-2'>
                  <ul className='grid gap-y-3'>
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
          )}
          <NavigationMenuItem asChild>
            <Link href='/help' passHref>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                Help
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </SignedOut>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Theme</NavigationMenuTrigger>
          <NavigationMenuContent className='x'>
            <div className='w-64 p-2'>
              <div className='w-full'>
                <div className='flex items-start pt-4 md:pt-0'>
                  <div className='space-y-1.5'>
                    <div className='leading-none font-semibold tracking-tight'>
                      Theme Library
                    </div>
                    <div className='text-muted-foreground text-xs'>
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
                      {BASE_COLORS.map((color) =>
                        mounted ? (
                          <Button
                            variant={"outline"}
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
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
