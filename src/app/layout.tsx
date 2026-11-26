// Import Metadata type from Next.js for page titles and SEO
import type { Metadata } from "next";
// Import global stylesheet
import "./globals.css";
// Import theme provider for dark and light mode support
import { ThemeProvider } from "@/components/theme-provider";

// Define website metadata
export const metadata: Metadata = {
  // Title shown in browser tab
  title: "ApexStore — Hyper-Optimized Next.js 15 E-Commerce & Core Web Vitals Hub",
  // Description for search engines
  description: "Production-grade e-commerce storefront engineered for sub-second LCP, zero layout shifts (CLS < 0.01), sub-20ms INP, and a verified 100/100 Lighthouse performance benchmark. Built by Fagbenro Rosheed Iyiola.",
  // Author information
  authors: [{ name: "Fagbenro Rosheed Iyiola" }],
};

// Root layout component wrapping all pages
export default function RootLayout({
  children,
}: {
  // Child page components to render
  children: React.ReactNode;
}) {
  return (
    // Set English language and suppress hydration warning for dynamic theme class
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-perf-canvas text-perf-text antialiased selection:bg-emerald-500/20 selection:text-emerald-500">
        {/* Wrap application in ThemeProvider */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
