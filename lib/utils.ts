import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 * 
 * @param inputs - Class values to merge
 * @returns Merged class string
 * 
 * @example
 * cn("px-2 py-1", "px-4") // Returns "py-1 px-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to a readable format
 * 
 * @param dateString - ISO date string to format
 * @param options - Formatting options
 * @param options.format - 'short' (Jan 1, 2024) or 'long' (January 1, 2024)
 * @returns Formatted date string or empty string if invalid
 * 
 * @example
 * formatDate("2024-01-15") // Returns "Jan 15, 2024"
 * formatDate("2024-01-15", { format: "long" }) // Returns "January 15, 2024"
 */
export function formatDate(
  dateString: string,
  options: { format?: "short" | "long" } = {}
): string {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const formatOptions: Intl.DateTimeFormatOptions =
      options.format === "long"
        ? {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        : {
            year: "numeric",
            month: "short",
            day: "numeric",
          };

    return date.toLocaleDateString("en-US", formatOptions);
  } catch {
    return dateString;
  }
}

