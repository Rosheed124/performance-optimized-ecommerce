/** @type {import('tailwindcss').Config} */
// Configure Tailwind CSS theme tokens and layout scanning for our high-performance storefront
module.exports = {
  // Allow toggling between light and dark themes using a CSS class on the <html> tag
  darkMode: "class",
  // Specify which source files Tailwind should scan for class names
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Extend default design tokens with custom performance engineering and storefront colors
  theme: {
    extend: {
      // Custom color palette tailored for lightning-fast commerce and Web Vitals telemetry
      colors: {
        perf: {
          // Base canvas background
          canvas: "var(--perf-canvas)",
          // Card panel surface
          surface: "var(--perf-surface)",
          // Inset console or code background
          subtle: "var(--perf-subtle)",
          // Border dividing lines
          border: "var(--perf-border)",
          // Primary readable text color
          text: "var(--perf-text)",
          // Muted labels and secondary descriptions
          muted: "var(--perf-muted)",
          // Electric violet / sapphire blue for storefront accent highlights
          accent: "var(--perf-accent)",
          // Emerald green for 100/100 scores and good Web Vitals (< 1.2s LCP)
          emerald: "var(--perf-emerald)",
          // Amber yellow for needs improvement metrics
          amber: "var(--perf-amber)",
          // Rose red for poor Web Vitals metrics
          rose: "var(--perf-rose)",
        },
      },
      // Custom shimmer and pulse animations
      animation: {
        // Shimmer gradient animation for zero-CLS skeleton placeholder loading
        shimmer: "shimmer 1.8s infinite linear",
        // Soft pulsing glow for 100/100 score badges
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      // Keyframe definitions
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  // No external plugins needed
  plugins: [],
};
