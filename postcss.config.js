// Configure PostCSS plugins for processing Tailwind CSS
module.exports = {
  // Plugins to execute on stylesheets
  plugins: {
    // Process Tailwind CSS utility classes into actual CSS rules
    tailwindcss: {},
    // Automatically add browser vendor prefixes for cross-browser styling
    autoprefixer: {},
  },
};
