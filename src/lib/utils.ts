// Import ClassValue type from clsx for conditional class names
import { ClassValue, clsx } from "clsx";
// Import twMerge to intelligently resolve Tailwind class conflicts
import { twMerge } from "tailwind-merge";
// Import vital rating type
import { VitalRating } from "./types";

// Helper function to combine conditional CSS class names safely
export function cn(...inputs: ClassValue[]): string {
  // Merge clsx classes and twMerge utilities
  return twMerge(clsx(inputs));
}

// Format numbers as standard USD currency
export function formatCurrency(amount: number): string {
  // Return formatted dollar string
  return `$${amount.toFixed(2)}`;
}

// Return styling classes for a Core Web Vital rating
export function getVitalRatingProps(rating: VitalRating): {
  label: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
} {
  // Good rating (meets Google's elite speed target)
  if (rating === "good") {
    return {
      label: "Good (Fast)",
      bgClass: "bg-emerald-500/10",
      textClass: "text-emerald-500",
      borderClass: "border-emerald-500/30",
    };
  }
  // Needs improvement
  if (rating === "needs-improvement") {
    return {
      label: "Needs Work",
      bgClass: "bg-amber-500/10",
      textClass: "text-amber-500",
      borderClass: "border-amber-500/30",
    };
  }
  // Poor rating
  return {
    label: "Poor",
    bgClass: "bg-rose-500/10",
    textClass: "text-rose-500",
    borderClass: "border-rose-500/30",
  };
}
