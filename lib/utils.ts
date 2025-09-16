import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Unisce classi Tailwind evitando conflitti */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
