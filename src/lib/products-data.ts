// Import product and web vitals data types
import {
  CoreWebVital,
  LighthouseScores,
  NetworkThrottle,
  OptimizationStrategy,
  Product,
} from "./types";

// High-performance hardware products list
export const PRODUCTS: Product[] = [
  {
    id: "prod-apex-watch",
    name: "Apex Pulse Ultra Smartwatch",
    category: "Wearables",
    price: 349.0,
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
    stockCount: 18,
    image: "/products/watch.webp",
    badge: "Best Seller",
    description: "Titanium sapphire biometric tracker with dual-frequency GPS and 14-day battery life.",
    features: [
      "Aerospace-grade titanium chassis",
      "Always-on AMOLED 2,000 nit display",
      "ECG and blood oxygen telemetry",
      "50m water resistance rating",
    ],
    aspectRatio: "1/1",
  },
  {
    id: "prod-sonic-anc",
    name: "SonicPro Wireless ANC Headphones",
    category: "Audio",
    price: 299.0,
    rating: 4.8,
    reviewCount: 524,
    inStock: true,
    stockCount: 24,
    image: "/products/headphones.webp",
    badge: "Editor's Choice",
    description: "Lossless spatial audio with adaptive hybrid active noise cancellation and 40-hour playback.",
    features: [
      "Custom 45mm biocellulose drivers",
      "Spatial audio with dynamic head tracking",
      "Ultra-low latency Bluetooth 5.4 LE",
      "Memory foam ear cushions",
    ],
    aspectRatio: "1/1",
  },
  {
    id: "prod-quantum-hub",
    name: "Quantum Smart Home Gateway",
    category: "Smart Home",
    price: 189.0,
    rating: 4.7,
    reviewCount: 198,
    inStock: true,
    stockCount: 12,
    image: "/products/hub.webp",
    badge: "Energy Saver",
    description: "Unified Matter and Thread controller automating home climate, security, and smart lighting.",
    features: [
      "Zero-cloud local execution privacy",
      "Dual-band Wi-Fi 7 + Thread radio",
      "Automated mesh network healing",
      "Sub-5ms local automation triggers",
    ],
    aspectRatio: "1/1",
  },
  {
    id: "prod-blade-keyboard",
    name: "Blade65 Low-Profile Mechanical Keyboard",
    category: "Computing",
    price: 159.0,
    rating: 4.9,
    reviewCount: 440,
    inStock: true,
    stockCount: 9,
    image: "/products/keyboard.webp",
    badge: "Low Latency",
    description: "CNC aluminum wireless mechanical keyboard featuring hot-swappable switches and 1,000Hz polling.",
    features: [
      "Gateron Low Profile optical switches",
      "1,000Hz wired & 2.4GHz wireless polling",
      "Sound-dampening silicone gasket mount",
      "RGB per-key illumination",
    ],
    aspectRatio: "1/1",
  },
  {
    id: "prod-optic-lens",
    name: "OpticView 4K Ultra-Wide Conference Cam",
    category: "Optics",
    price: 229.0,
    rating: 4.8,
    reviewCount: 165,
    inStock: true,
    stockCount: 15,
    image: "/products/camera.webp",
    badge: "AI Powered",
    description: "Studio-quality 4K HDR camera with AI autoframing and beamforming noise-cancelling microphones.",
    features: [
      "Sony 1/1.8 inch STARVIS 2 sensor",
      "Hardware autofocus with TOF distance sensor",
      "Integrated physical privacy shutter",
      "Dual beamforming microphone array",
    ],
    aspectRatio: "1/1",
  },
  {
    id: "prod-nexus-trackpad",
    name: "Nexus Precision Glass Trackpad",
    category: "Computing",
    price: 129.0,
    rating: 4.6,
    reviewCount: 118,
    inStock: true,
    stockCount: 30,
    image: "/products/trackpad.webp",
    badge: "Ergonomic",
    description: "Etched matte glass surface with haptic force feedback and full macOS/Windows multi-touch gestures.",
    features: [
      "Custom linear resonant haptic actuator",
      "Zero mechanical moving parts",
      "Rechargeable battery lasting 3 months",
      "Precision gesture customization app",
    ],
    aspectRatio: "1/1",
  },
  {
    id: "prod-aero-buds",
    name: "AeroSport Earbuds with Heart-Rate Sensor",
    category: "Audio",
    price: 179.0,
    rating: 4.7,
    reviewCount: 280,
    inStock: true,
    stockCount: 22,
    image: "/products/earbuds.webp",
    badge: "IPX8 Waterproof",
    description: "Sweatproof true wireless earbuds with in-ear optical heart rate telemetry and secure wingtips.",
    features: [
      "Real-time heart rate and cadence tracking",
      "IPX8 waterproof submersion protection",
      "Fast charge: 10 mins gives 2 hours",
      "HearThrough transparency mode",
    ],
    aspectRatio: "1/1",
  },
  {
    id: "prod-lumina-light",
    name: "Lumina Studio Monitor Light Bar",
    category: "Smart Home",
    price: 119.0,
    rating: 4.8,
    reviewCount: 395,
    inStock: true,
    stockCount: 40,
    image: "/products/lightbar.webp",
    badge: "Anti-Glare",
    description: "Asymmetric optical monitor lamp eliminating screen glare while illuminating desktop workspace.",
    features: [
      "Asymmetric optical design prevents glare",
      "Wireless desktop dial remote control",
      "Auto-dimming ambient light sensor",
      "Ra95 high color rendering index",
    ],
    aspectRatio: "1/1",
  },
];

// Google Core Web Vitals telemetry benchmarks
export const CORE_WEB_VITALS: CoreWebVital[] = [
  {
    id: "lcp",
    name: "LCP",
    title: "Largest Contentful Paint",
    value: 0.82,
    unit: "s",
    rating: "good",
    target: "< 2.5s",
    description: "Measures perceived loading speed by recording when the main visual banner or product image finishes rendering.",
    optimizationTip: "Preloaded hero AVIF image with fetchpriority='high' and responsive srcset sizing.",
  },
  {
    id: "inp",
    name: "INP",
    title: "Interaction to Next Paint",
    value: 18,
    unit: "ms",
    rating: "good",
    target: "< 200ms",
    description: "Measures page responsiveness to user inputs (clicking buttons, opening cart, filtering items).",
    optimizationTip: "Offloaded heavy computations from the browser main thread and minimized JavaScript execution time.",
  },
  {
    id: "cls",
    name: "CLS",
    title: "Cumulative Layout Shift",
    value: 0.002,
    unit: "",
    rating: "good",
    target: "< 0.10",
    description: "Measures visual stability by checking if buttons or images move unexpectedly while the page loads.",
    optimizationTip: "Reserved explicit aspect-ratio CSS dimensions and used exact skeleton shimmer placeholders.",
  },
  {
    id: "fcp",
    name: "FCP",
    title: "First Contentful Paint",
    value: 0.65,
    unit: "s",
    rating: "good",
    target: "< 1.8s",
    description: "Measures how quickly the user sees the first piece of text or graphics on the screen.",
    optimizationTip: "Eliminated render-blocking CSS and pre-rendered static HTML at the edge.",
  },
  {
    id: "ttfb",
    name: "TTFB",
    title: "Time to First Byte",
    value: 85,
    unit: "ms",
    rating: "good",
    target: "< 800ms",
    description: "Measures how fast the web server or CDN sends the initial response packet.",
    optimizationTip: "Global CloudFront Edge caching and Next.js 15 Incremental Static Regeneration (ISR).",
  },
];

// Lighthouse 100/100 audit scores
export const LIGHTHOUSE_SCORES: LighthouseScores = {
  performance: 100,
  accessibility: 100,
  bestPractices: 100,
  seo: 100,
};

// Engineering optimization case studies
export const OPTIMIZATION_STRATEGIES: OptimizationStrategy[] = [
  {
    id: "opt-images",
    title: "Next-Gen Image Pipeline (AVIF / WebP + Priority Preload)",
    metric: "LCP (-65% Load Time)",
    impact: "0.82s LCP on desktop, 1.1s on mobile",
    explanation: "Images account for over 70% of e-commerce payloads. By delivering modern AVIF format with fallback to WebP, file sizes are reduced by 40% compared to JPEG while preserving retina crispness.",
    codeSnippet: `<Image
  src="/products/watch.webp"
  alt="Apex Pulse Ultra Smartwatch"
  width={600}
  height={600}
  priority={true}
  sizes="(max-width: 768px) 100vw, 50vw"
  className="aspect-square object-cover"
/>`,
  },
  {
    id: "opt-cls",
    title: "Zero-CLS Layout Containers & Aspect Ratio Skeletons",
    metric: "CLS (0.002 Total Shift)",
    impact: "Virtually zero visual movement during hydration",
    explanation: "Layout shifts frustrate shoppers and cause misclicks. By enforcing strict CSS aspect-ratio containers and matching skeleton dimensions, the browser allocates layout space before the image bytes arrive.",
    codeSnippet: `/* Enforce intrinsic aspect ratio on product cards */
.product-image-container {
  aspect-ratio: 1 / 1;
  width: 100%;
  overflow: hidden;
  background-color: var(--perf-subtle);
}`,
  },
  {
    id: "opt-inp",
    title: "Main Thread Scheduling & Sub-20ms INP",
    metric: "INP (18ms Response Time)",
    impact: "Instant button feedback without frame drops",
    explanation: "Replacing First Input Delay (FID), INP evaluates responsiveness throughout the entire session. By breaking state updates into micro-tasks and utilizing startTransition for non-urgent re-renders, the main thread stays free for 60fps interactions.",
    codeSnippet: `// Use startTransition for filtering so UI typing remains lag-free
const handleFilterChange = (category: string) => {
  React.startTransition(() => {
    setActiveCategory(category);
  });
};`,
  },
  {
    id: "opt-isr",
    title: "Incremental Static Regeneration (ISR) with Edge CDN",
    metric: "TTFB (85ms Global Response)",
    impact: "Static HTML speed with dynamic live stock freshness",
    explanation: "Product catalog pages are statically generated and cached on global CDN edge nodes. Background revalidation ensures stock numbers and prices refresh every 60 seconds without imposing server rendering latency on visitors.",
    codeSnippet: `// Next.js 15 ISR revalidation config
export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}`,
  },
];

// Throttling simulation profiles
export const NETWORK_THROTTLES: NetworkThrottle[] = [
  {
    id: "5g",
    name: "Fast 5G / Broadband",
    latencyMs: 15,
    downloadSpeedMbps: 120,
    simulatedLcp: 0.82,
  },
  {
    id: "4g",
    name: "Standard 4G Mobile",
    latencyMs: 65,
    downloadSpeedMbps: 25,
    simulatedLcp: 1.14,
  },
  {
    id: "3g",
    name: "Slow 3G Connection",
    latencyMs: 180,
    downloadSpeedMbps: 4.5,
    simulatedLcp: 1.85,
  },
];
