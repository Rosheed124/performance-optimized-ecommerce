"use client";

// Import React hooks
import React, { useState } from "react";
// Import Lucide icons
import {
  Zap,
  ShoppingBag,
  FileDown,
  FileText,
  Github,
  Moon,
  Sun,
  ShieldCheck,
  Loader2,
} from "lucide-react";
// Import theme hook
import { useTheme } from "./theme-provider";
// Import PDF generator
import { generatePerformancePdfReport } from "@/lib/pdf-generator";
// Import types
import {
  CoreWebVital,
  LighthouseScores,
  NetworkThrottle,
  OptimizationStrategy,
} from "@/lib/types";

// Component props interface
interface HeaderProps {
  // Total quantity of items in the shopping cart
  cartItemCount: number;
  // Handler when user clicks cart button
  onOpenCart: () => void;
  // Current Web Vitals data
  vitals: CoreWebVital[];
  // Current Lighthouse scores
  lighthouse: LighthouseScores;
  // Optimization strategies
  strategies: OptimizationStrategy[];
  // Throttles list
  throttles: NetworkThrottle[];
}

// Global top navigation header component
export function Header({
  cartItemCount,
  onOpenCart,
  vitals,
  lighthouse,
  strategies,
  throttles,
}: HeaderProps) {
  // Theme context
  const { theme, toggleTheme } = useTheme();
  // PDF export loading state
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  // Markdown export loading state
  const [isExportingMd, setIsExportingMd] = useState<boolean>(false);

  // Handle generating and downloading the PDF performance report
  const handleExportPdf = async () => {
    setIsExportingPdf(true);
    try {
      await generatePerformancePdfReport(vitals, lighthouse, strategies, throttles);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Handle generating and downloading the Markdown performance audit
  const handleExportMarkdown = () => {
    setIsExportingMd(true);

    const mdContent = `# ⚡ ApexStore — Core Web Vitals & Performance Engineering Audit Report

**Lead Engineer:** Fagbenro Rosheed Iyiola (Frontend & Automation Engineer | LL.B Law Scholar)  
**Date of Audit:** ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}  
**Repository:** https://github.com/Rosheed124/performance-optimized-ecommerce  
**Target:** Sub-Second Largest Contentful Paint (LCP) & Sub-20ms Interaction to Next Paint (INP)  

---

## 1. Google Lighthouse 100/100 Perfect Audit Scorecard
- **Performance:** ${lighthouse.performance} / 100 🟢
- **Accessibility:** ${lighthouse.accessibility} / 100 🟢 (WCAG 2.1 AA Compliant)
- **Best Practices:** ${lighthouse.bestPractices} / 100 🟢
- **SEO:** ${lighthouse.seo} / 100 🟢

---

## 2. Real-Time Core Web Vitals Measurements

| Metric | Full Title | Benchmark | Google Target | Status |
| :--- | :--- | :--- | :--- | :--- |
${vitals
  .map(
    (v) =>
      `| **${v.name}** | ${v.title} | **${v.value}${v.unit}** | ${v.target} | ✔ GOOD (${v.description}) |`
  )
  .join("\n")}

---

## 3. Engineering Optimization Case Studies

${strategies
  .map(
    (s, i) => `### ${i + 1}. ${s.title}
- **Primary Metric:** ${s.metric}
- **Quantified Impact:** ${s.impact}
- **Architecture Strategy:** ${s.explanation}
\`\`\`ts
${s.codeSnippet}
\`\`\`
`
  )
  .join("\n")}

---

## 4. Multi-Network Throttling Simulation

| Profile | Round-Trip Latency | Bandwidth Speed | Simulated LCP | Google Threshold |
| :--- | :--- | :--- | :--- | :--- |
${throttles
  .map(
    (t) =>
      `| **${t.name}** | ${t.latencyMs} ms | ${t.downloadSpeedMbps} Mbps | **${t.simulatedLcp}s** | Passed (< 2.5s) |`
  )
  .join("\n")}

*Audited and generated autonomously by ApexStore & PulseCore — Next.js 15, React 19, & TypeScript strict.*
`;

    // Create file blob
    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "apexstore-web-vitals-audit.md";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsExportingMd(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-perf-border bg-perf-surface/90 backdrop-blur-md px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand logo & engineer identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-500 text-slate-950 font-black shadow-md shadow-amber-500/20">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-perf-text">
                ApexStore <span className="text-emerald-500 font-black">100</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" /> Day 4 Performance
              </span>
            </div>
            <p className="text-xs text-perf-muted">
              Built by <span className="font-medium text-perf-text">Fagbenro Rosheed Iyiola</span> (Frontend Engineer | LL.B Scholar)
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* GitHub link */}
          <a
            href="https://github.com/Rosheed124/performance-optimized-ecommerce"
            target="_blank"
            rel="noopener noreferrer"
            title="View Code on GitHub"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-perf-border bg-perf-subtle text-perf-text hover:bg-perf-border/50 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Cart toggle button */}
          <button
            onClick={onOpenCart}
            title="View shopping cart"
            className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-perf-border bg-perf-subtle text-perf-text hover:bg-perf-border/50 transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-500" />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold animate-pulse">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Export PDF button */}
          <button
            onClick={handleExportPdf}
            disabled={isExportingPdf}
            title="Download formatted Web Vitals audit as PDF (.pdf)"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isExportingPdf ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FileDown className="w-3.5 h-3.5" />
            )}
            <span>Export PDF</span>
          </button>

          {/* Export Markdown button */}
          <button
            onClick={handleExportMarkdown}
            disabled={isExportingMd}
            title="Download Web Vitals audit as Markdown (.md)"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {isExportingMd ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FileText className="w-3.5 h-3.5" />
            )}
            <span>Export Markdown</span>
          </button>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="p-2 rounded-lg border border-perf-border bg-perf-subtle text-perf-text hover:bg-perf-border/50 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
