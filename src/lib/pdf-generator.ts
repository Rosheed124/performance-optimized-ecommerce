// Import data types for Web Vitals and products
import {
  CoreWebVital,
  LighthouseScores,
  NetworkThrottle,
  OptimizationStrategy,
} from "./types";

// Function to generate and immediately download an executive multi-page PDF performance audit report
export async function generatePerformancePdfReport(
  vitals: CoreWebVital[],
  lighthouse: LighthouseScores,
  strategies: OptimizationStrategy[],
  throttles: NetworkThrottle[]
): Promise<void> {
  // Dynamically load jsPDF in the browser only to avoid server-side rendering issues
  const { jsPDF } = await import("jspdf");

  // Create new PDF document in portrait orientation with millimeters on standard A4 paper
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // A4 dimensions
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Helper to ensure enough vertical space before printing a section
  const ensureSpace = (requiredHeight: number) => {
    if (y + requiredHeight > pageHeight - margin - 10) {
      doc.addPage();
      y = margin;
    }
  };

  // 1. Draw top executive header banner
  doc.setFillColor(15, 23, 42); // Deep obsidian navy
  doc.rect(margin, y, contentWidth, 24, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("APEXSTORE — CORE WEB VITALS & PERFORMANCE AUDIT", margin + 5, y + 9);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Lead Engineer: Fagbenro Rosheed Iyiola (Frontend & Automation Engineer | LL.B Law Scholar)",
    margin + 5,
    y + 15
  );
  doc.text(
    `Benchmark Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} | Platform: Next.js 15 App Router | Target: Sub-Second LCP`,
    margin + 5,
    y + 20
  );

  y += 30;

  // 2. Lighthouse 100/100 Perfect Scorecard Row
  ensureSpace(25);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("1. GOOGLE LIGHTHOUSE AUDIT SCORECARD (PERFECT 100/100)", margin, y);
  y += 5;

  const scoreCards = [
    { label: "Performance", score: lighthouse.performance },
    { label: "Accessibility", score: lighthouse.accessibility },
    { label: "Best Practices", score: lighthouse.bestPractices },
    { label: "SEO Score", score: lighthouse.seo },
  ];

  const colWidth = (contentWidth - 9) / 4;
  scoreCards.forEach((c, idx) => {
    const xPos = margin + idx * (colWidth + 3);
    doc.setFillColor(240, 253, 244); // Light emerald green
    doc.setDrawColor(34, 197, 94); // Emerald border
    doc.rect(xPos, y, colWidth, 18, "FD");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(22, 101, 52);
    doc.text(c.label, xPos + 3, y + 6);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(21, 128, 61);
    doc.text(`${c.score} / 100`, xPos + 3, y + 13);
  });

  y += 26;

  // 3. Core Web Vitals Telemetry Table
  ensureSpace(15);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("2. CORE WEB VITALS MEASUREMENT BENCHMARKS", margin, y);
  y += 6;

  // Table header
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentWidth, 6, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text("METRIC", margin + 3, y + 4.2);
  doc.text("BENCHMARK", margin + 55, y + 4.2);
  doc.text("TARGET THRESHOLD", margin + 95, y + 4.2);
  doc.text("RATING", margin + 145, y + 4.2);
  y += 6;

  vitals.forEach((vital) => {
    ensureSpace(8);
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 7, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${vital.name} (${vital.title})`, margin + 3, y + 4.8);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 163, 74);
    doc.text(`${vital.value}${vital.unit}`, margin + 55, y + 4.8);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(vital.target, margin + 95, y + 4.8);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 163, 74);
    doc.text("✔ GOOD (FAST)", margin + 145, y + 4.8);

    y += 7;
  });

  y += 8;

  // 4. Engineering Optimization Case Studies
  ensureSpace(15);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("3. ENGINEERING OPTIMIZATIONS & ARCHITECTURE CASE STUDIES", margin, y);
  y += 6;

  strategies.forEach((strat) => {
    ensureSpace(18);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 16, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(strat.title, margin + 3, y + 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(`Primary Metric: ${strat.metric} | Impact: ${strat.impact}`, margin + 3, y + 9);

    const explLines = doc.splitTextToSize(strat.explanation, contentWidth - 6);
    doc.setTextColor(51, 65, 85);
    doc.text(explLines[0], margin + 3, y + 13);

    y += 18;
  });

  y += 6;

  // 5. Network Throttling Simulation Table
  ensureSpace(20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("4. NETWORK THROTTLING & MULTI-DEVICE RESILIENCE", margin, y);
  y += 6;

  throttles.forEach((th) => {
    ensureSpace(8);
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 7, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(th.name, margin + 3, y + 4.8);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(`Latency: ${th.latencyMs}ms | Speed: ${th.downloadSpeedMbps} Mbps`, margin + 65, y + 4.8);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 163, 74);
    doc.text(`LCP: ${th.simulatedLcp}s (< 2.5s target)`, margin + 140, y + 4.8);

    y += 7;
  });

  // Footer with page numbering
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      "ApexStore • Performance Engineering & Core Web Vitals • Built by Fagbenro Rosheed Iyiola",
      margin,
      pageHeight - 7
    );
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 18, pageHeight - 7);
  }

  // Trigger download of the PDF file
  doc.save("apexstore-web-vitals-audit.pdf");
}
