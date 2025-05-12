import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SITE_URL } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUrl(username: string) {
  const domain = SITE_URL;
  return `${domain}/${username}`;
}

export function getYear(date: string) {
  const dateObject = new Date(date);
  return dateObject.getFullYear();
}

export function getMonth(date: string) {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("en-us", { month: "short" });
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
