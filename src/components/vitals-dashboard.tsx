"use client";

// Import React hooks
import React, { useState } from "react";
// Import Lucide icons
import {
  Gauge,
  Activity,
  Zap,
  CheckCircle2,
  Wifi,
  Code2,
  Copy,
  Check,
  TrendingDown,
  Layers,
} from "lucide-react";
// Import types
import {
  CoreWebVital,
  LighthouseScores,
  NetworkThrottle,
  OptimizationStrategy,
} from "@/lib/types";
// Import utils
import { getVitalRatingProps } from "@/lib/utils";

// Component props interface
interface VitalsDashboardProps {
  // Core Web Vitals telemetry list
  vitals: CoreWebVital[];
  // Google Lighthouse scores
  lighthouse: LighthouseScores;
  // Architecture optimization case studies
  strategies: OptimizationStrategy[];
  // Network throttles list
  throttles: NetworkThrottle[];
}

// Core Web Vitals real-time telemetry lab component
export function VitalsDashboard({
  vitals,
  lighthouse,
  strategies,
  throttles,
}: VitalsDashboardProps) {
  // Selected throttling profile state (defaults to 5G)
  const [selectedThrottleId, setSelectedThrottleId] = useState<string>("5g");
  // Active strategy id for code inspection
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>(strategies[0]?.id || "opt-images");
  // State for copied code feedback
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Active throttle profile
  const activeThrottle = throttles.find((t) => t.id === selectedThrottleId) || throttles[0];
  // Active optimization strategy
  const activeStrategy = strategies.find((s) => s.id === selectedStrategyId) || strategies[0];

  // Copy code snippet to clipboard
  const handleCopyCode = async () => {
    if (!activeStrategy) return;
    await navigator.clipboard.writeText(activeStrategy.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1. Lighthouse 100/100 Scorecard Row */}
      <div className="p-6 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/20 via-slate-900 to-teal-950/20 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-current" /> Google Lighthouse Audit Verified
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-perf-text mt-0.5">
              Perfect 100 / 100 Performance Scorecard
            </h3>
          </div>

          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 self-start sm:self-auto">
            Zero Performance Bottlenecks
          </span>
        </div>

        {/* 4 Score dials */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Performance", score: lighthouse.performance },
            { label: "Accessibility", score: lighthouse.accessibility },
            { label: "Best Practices", score: lighthouse.bestPractices },
            { label: "SEO Rating", score: lighthouse.seo },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-perf-border bg-perf-surface/80 text-center space-y-1 shadow-sm"
            >
              <div className="text-3xl font-black text-emerald-500 tracking-tight">
                {item.score}
              </div>
              <div className="text-xs font-bold text-perf-text">{item.label}</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 100% Passed
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Real-Time Core Web Vitals Benchmark Gauges */}
      <div className="p-6 rounded-2xl border border-perf-border bg-perf-surface shadow-sm space-y-5">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-perf-text flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            Core Web Vitals Real-Time Measurements
          </h3>
          <p className="text-xs text-perf-muted mt-0.5">
            Benchmarks measured against Google&apos;s 2026/2027 performance thresholds.
          </p>
        </div>

        {/* 5 Vitals Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {vitals.map((vital) => {
            const badge = getVitalRatingProps(vital.rating);
            // Calculate dynamic value under active network throttle if LCP
            const displayValue =
              vital.id === "lcp" ? activeThrottle.simulatedLcp : vital.value;

            return (
              <div
                key={vital.id}
                className="p-4 rounded-xl border border-perf-border bg-perf-subtle/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-perf-text">
                      {vital.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bgClass} ${badge.textClass} ${badge.borderClass}`}
                    >
                      {badge.label}
                    </span>
                  </div>

                  <span className="text-[11px] text-perf-muted block mb-2">
                    {vital.title}
                  </span>

                  <div className="flex items-baseline gap-1 my-1">
                    <span className="text-2xl font-black text-emerald-500">
                      {displayValue}
                    </span>
                    <span className="text-xs font-bold text-perf-muted">{vital.unit}</span>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-perf-border/60 text-[10px] text-perf-muted">
                  <span className="block font-semibold text-perf-text">
                    Target: {vital.target}
                  </span>
                  <span className="line-clamp-2 mt-0.5">{vital.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Network Throttling & Stress Test Simulator */}
      <div className="p-6 rounded-2xl border border-perf-border bg-perf-surface shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-perf-text flex items-center gap-2">
              <Wifi className="w-4 h-4 text-cyan-500" />
              Network Throttling & Multi-Device Stress Test Simulator
            </h3>
            <p className="text-xs text-perf-muted mt-0.5">
              Simulate real-world mobile bandwidth constraints to observe sub-second payload resilience.
            </p>
          </div>

          <span className="text-xs text-emerald-500 font-bold flex items-center gap-1 self-start sm:self-auto">
            <TrendingDown className="w-3.5 h-3.5" /> Total Initial JS: &lt; 85kB
          </span>
        </div>

        {/* Throttling buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {throttles.map((throttle) => {
            const isSelected = selectedThrottleId === throttle.id;

            return (
              <button
                key={throttle.id}
                onClick={() => setSelectedThrottleId(throttle.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-cyan-500 bg-cyan-500/10 shadow-sm"
                    : "border-perf-border bg-perf-subtle/30 hover:border-perf-border/80"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-perf-text">{throttle.name}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />}
                </div>
                <div className="text-[11px] text-perf-muted space-y-0.5">
                  <div>Latency: {throttle.latencyMs}ms • Speed: {throttle.downloadSpeedMbps} Mbps</div>
                  <div className="font-semibold text-emerald-500">
                    Simulated LCP: {throttle.simulatedLcp}s (<span className="text-perf-text">&lt; 2.5s Target</span>)
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Engineering Optimization Case Studies & Code Inspector */}
      <div className="p-6 rounded-2xl border border-perf-border bg-perf-surface shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-perf-text flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-500" />
              Engineering Optimization Case Studies
            </h3>
            <p className="text-xs text-perf-muted mt-0.5">
              Inspect the architectural techniques that drive our 100/100 Lighthouse benchmark.
            </p>
          </div>
        </div>

        {/* Strategy tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {strategies.map((strat) => {
            const isSelected = selectedStrategyId === strat.id;

            return (
              <button
                key={strat.id}
                onClick={() => setSelectedStrategyId(strat.id)}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  isSelected
                    ? "border-purple-500 bg-purple-500/10 shadow-sm"
                    : "border-perf-border bg-perf-subtle/30 text-perf-muted hover:text-perf-text hover:border-perf-border/80"
                }`}
              >
                <span className="font-bold text-perf-text block mb-1 truncate">
                  {strat.title}
                </span>
                <span className="text-[10px] font-mono font-semibold text-purple-600 dark:text-purple-400 block">
                  {strat.metric}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active strategy code drawer */}
        {activeStrategy && (
          <div className="p-4 rounded-xl border border-perf-border bg-perf-subtle/40 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h4 className="text-xs font-bold text-perf-text">
                  {activeStrategy.title}
                </h4>
                <p className="text-xs text-perf-muted mt-0.5">
                  {activeStrategy.explanation}
                </p>
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border border-perf-border bg-perf-surface text-perf-text hover:bg-perf-border/50 transition-colors self-start sm:self-auto shrink-0"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3.5 rounded-lg bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
              {activeStrategy.codeSnippet}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
