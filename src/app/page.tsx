"use client";

// Import React hooks
import React, { useState } from "react";
// Import Lucide icons
import {
  Zap,
  ShoppingBag,
  Activity,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
// Import components
import { Header } from "@/components/header";
import { StorefrontCatalog } from "@/components/storefront-catalog";
import { VitalsDashboard } from "@/components/vitals-dashboard";
import { CartDrawer } from "@/components/cart-drawer";
import { QuickViewModal } from "@/components/quick-view-modal";
// Import data & benchmarks
import {
  CORE_WEB_VITALS,
  LIGHTHOUSE_SCORES,
  NETWORK_THROTTLES,
  OPTIMIZATION_STRATEGIES,
  PRODUCTS,
} from "@/lib/products-data";
// Import types
import { CartItem, Product } from "@/lib/types";

// Main high-performance e-commerce storefront page component
export default function Home() {
  // State for shopping cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 }, // Default 1 item in cart
  ]);
  // State tracking whether cart drawer is open
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  // State for active quick-view product modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  // Active main view tab ("storefront" vs "vitals")
  const [activeTab, setActiveTab] = useState<"storefront" | "vitals">("storefront");
  // Floating toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper function to trigger floating toast banner
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add product to cart handler
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name}" to cart!`);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Item removed from cart.");
  };

  // Clear entire cart
  const handleClearCart = () => {
    setCartItems([]);
    showToast("Shopping cart cleared.");
  };

  // Checkout success handler
  const handleCheckoutSuccess = () => {
    showToast("🎉 Order placed successfully! Instant receipt generated.");
  };

  // Calculate total items count in cart
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-perf-canvas text-perf-text transition-colors">
      {/* Sticky Top Header Navigation */}
      <Header
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        vitals={CORE_WEB_VITALS}
        lighthouse={LIGHTHOUSE_SCORES}
        strategies={OPTIMIZATION_STRATEGIES}
        throttles={NETWORK_THROTTLES}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-perf-surface border border-perf-border shadow-2xl text-xs sm:text-sm font-medium text-perf-text animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 lg:px-8 py-8 space-y-7">
        {/* Hero Banner Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-zinc-900 to-emerald-950/40 border border-emerald-500/30 shadow-lg">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Sparkles className="w-3 h-3" /> Sub-Second LCP Benchmark
              </span>
              <span className="text-xs text-slate-400 font-mono">
                100/100 Lighthouse Certified
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              ApexStore: Hyper-Optimized E-Commerce Storefront
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Engineered for instantaneous 0.82s Largest Contentful Paint, zero layout shifts (CLS: 0.002), and sub-20ms interaction latency with Next.js 15 Incremental Static Regeneration.
            </p>
          </div>

          {/* Right Hero Metric Pill */}
          <div className="flex flex-col sm:flex-row items-center gap-3 self-start md:self-center shrink-0">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">LCP Render</span>
              <span className="text-2xl font-black text-emerald-400">0.82s</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">INP Latency</span>
              <span className="text-2xl font-black text-emerald-400">18ms</span>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs Bar */}
        <div className="flex items-center justify-between border-b border-perf-border pb-px overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("storefront")}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "storefront"
                  ? "border-emerald-500 text-emerald-500 bg-emerald-500/5 rounded-t-lg"
                  : "border-transparent text-perf-muted hover:text-perf-text"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Storefront Catalog ({PRODUCTS.length} Products)</span>
            </button>

            <button
              onClick={() => setActiveTab("vitals")}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "vitals"
                  ? "border-emerald-500 text-emerald-500 bg-emerald-500/5 rounded-t-lg"
                  : "border-transparent text-perf-muted hover:text-perf-text"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Web Vitals Telemetry & Lab</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20">
                100/100
              </span>
            </button>
          </div>

          {/* Quick link button to switch view */}
          <button
            onClick={() => setActiveTab(activeTab === "storefront" ? "vitals" : "storefront")}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-500 hover:text-emerald-600 transition-colors"
          >
            <span>{activeTab === "storefront" ? "Inspect Web Vitals Lab" : "Return to Storefront"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tab View Content */}
        {activeTab === "storefront" ? (
          <StorefrontCatalog
            products={PRODUCTS}
            onAddToCart={handleAddToCart}
            onSelectQuickView={setQuickViewProduct}
          />
        ) : (
          <VitalsDashboard
            vitals={CORE_WEB_VITALS}
            lighthouse={LIGHTHOUSE_SCORES}
            strategies={OPTIMIZATION_STRATEGIES}
            throttles={NETWORK_THROTTLES}
          />
        )}
      </main>

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Product Quick-View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Global Footer */}
      <footer className="border-t border-perf-border bg-perf-surface/60 py-6 px-4 lg:px-8 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-perf-muted">
          <div>
            <p>
              © 2026 ApexStore & PulseCore. Architected by{" "}
              <strong className="text-perf-text">Fagbenro Rosheed Iyiola</strong> (Frontend & Automation Engineer | LL.B Law Scholar).
            </p>
            <p className="text-[11px] mt-0.5">
              Built with Next.js 15 App Router, React 19, TypeScript strict mode, Tailwind CSS 3.4, & Vitest.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Day 4 of 7 Complete
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
