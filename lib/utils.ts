import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { COOKIE_NAME } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUrl(username: string) {
  const domain =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://quikres.vercel.app";
  return `${domain}/${username}`;
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateWithNumbers(date: Date): string {
  return date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

export function getYear(date: string) {
  const dateObject = new Date(date);
  return dateObject.getFullYear();
}

export function getMonth(date: string) {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("en-us", { month: "short" });
}

export function setThemeCookie(theme: string) {
  if (typeof window === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${
    window.location.protocol === "https:" ? "Secure;" : ""
  }`;
}
