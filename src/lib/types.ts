// This file defines all data types and structures used across our high-performance e-commerce storefront

// Product categories available in our store
export type ProductCategory = "All" | "Wearables" | "Audio" | "Smart Home" | "Computing" | "Optics";

// Represents a retail product sold in the store
export interface Product {
  // Unique identification code
  id: string;
  // Product display title
  name: string;
  // Category classification
  category: ProductCategory;
  // Retail price in US dollars
  price: number;
  // Average customer rating score (1 to 5 stars)
  rating: number;
  // Total number of customer reviews
  reviewCount: number;
  // Whether the item is currently in stock
  inStock: boolean;
  // Exact count of remaining inventory units
  stockCount: number;
  // Optimized WebP/AVIF image URL or placeholder
  image: string;
  // Promotional badge tag (such as 'Best Seller' or 'Ultra Fast')
  badge?: string;
  // Plain-English product description
  description: string;
  // Array of key technical features
  features: string[];
  // Aspect ratio preserved to guarantee zero Cumulative Layout Shift (CLS)
  aspectRatio: string;
}

// Represents an item added to the user's shopping cart
export interface CartItem {
  // The full product details
  product: Product;
  // Number of units selected
  quantity: number;
}

// Google Core Web Vitals rating category
export type VitalRating = "good" | "needs-improvement" | "poor";

// Individual Core Web Vital measurement definition
export interface CoreWebVital {
  // Key identifier code
  id: "lcp" | "inp" | "cls" | "fcp" | "ttfb";
  // Full metric acronym name
  name: string;
  // Metric title (e.g., 'Largest Contentful Paint')
  title: string;
  // Current measured benchmark value
  value: number;
  // Display unit ('s', 'ms', or unitless for CLS)
  unit: string;
  // Google threshold rating
  rating: VitalRating;
  // Recommended Google target threshold
  target: string;
  // Plain-English explanation of what this metric measures for a non-technical reader
  description: string;
  // Engineering technique used to achieve this elite score
  optimizationTip: string;
}

// Google Lighthouse audit category scores (0 to 100)
export interface LighthouseScores {
  // Overall performance score
  performance: number;
  // Accessibility compliance score (WCAG 2.1 AA)
  accessibility: number;
  // Modern web development best practices score
  bestPractices: number;
  // Search engine optimization score
  seo: number;
}

// Engineering optimization case study breakdown
export interface OptimizationStrategy {
  // Unique ID
  id: string;
  // Title of the optimization technique
  title: string;
  // Web Vital metric most impacted by this technique
  metric: string;
  // Quantifiable speed impact
  impact: string;
  // Plain-English explanation of how it works
  explanation: string;
  // Code snippet demonstrating the implementation
  codeSnippet: string;
}

// Network throttling profile for benchmarking simulations
export interface NetworkThrottle {
  // Profile ID
  id: "5g" | "4g" | "3g";
  // Friendly profile name
  name: string;
  // Network round-trip latency in milliseconds
  latencyMs: number;
  // Download transfer rate in Megabits per second
  downloadSpeedMbps: number;
  // Estimated LCP speed under these network constraints
  simulatedLcp: number;
}
