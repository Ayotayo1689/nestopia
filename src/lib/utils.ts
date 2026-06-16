import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type ClassValue = string | undefined | null | boolean | Record<string, boolean>;

export function cn(...inputs: (ClassValue | ClassValue[])[]): string {
  return twMerge(clsx(inputs));
}
