import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getEnvVar(v: string): string {
  const ret = process.env[v]
  if (ret === undefined) {
    throw new Error("process.env." + v + " is undefined!")
  }
  return ret
}