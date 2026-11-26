// Import helper from Vitest to configure test runner settings
import { defineConfig } from "vitest/config";
// Import React plugin so Vitest can render and test JSX components
import react from "@vitejs/plugin-react";
// Import path helper from Node.js to resolve local folder paths
import path from "path";

// Export the configuration object for our test runner
export default defineConfig({
  // Activate React plugin
  plugins: [react()],
  // Configure test environment behavior
  test: {
    // Simulate a web browser DOM environment inside Node.js
    environment: "jsdom",
    // Make describe, it, and expect functions available globally
    globals: true,
  },
  // Set up path shortcuts matching tsconfig.json
  resolve: {
    alias: {
      // Map the '@' prefix directly to the 'src' directory
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
