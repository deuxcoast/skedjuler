import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function firstLetterUppercase(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
