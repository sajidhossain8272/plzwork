import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(val: number, precision: number = 6): string {
  if (isNaN(val)) return "";
  if (val === 0) return "0";
  
  // If integer or small decimals, handle nicely
  if (Number.isInteger(val)) {
    return val.toLocaleString("en-US", { maximumFractionDigits: precision });
  }

  // Handle scientific notation for extremely large or small numbers
  const abs = Math.abs(val);
  if (abs < 0.000001 || abs > 1e12) {
    return val.toExponential(4);
  }

  // Trim floating precision noise (e.g. 0.30000000000000004 -> 0.3)
  const fixed = Number(val.toFixed(precision));
  return fixed.toLocaleString("en-US", { maximumFractionDigits: precision });
}
