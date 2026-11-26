"use client";

// Import React hooks
import React, { useState } from "react";
// Import Lucide icons
import {
  X,
  Star,
  ShoppingBag,
  Plus,
  Minus,
  CheckCircle2,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";
// Import types
import { Product } from "@/lib/types";
// Import utils
import { formatCurrency } from "@/lib/utils";

// Component props interface
interface QuickViewModalProps {
  // Currently viewed product or null if closed
  product: Product | null;
  // Handler to close modal
  onClose: () => void;
  // Handler to add product to cart with chosen quantity
  onAddToCart: (product: Product, quantity: number) => void;
}

// Product quick-view modal dialog component
export function QuickViewModal({
  product,
  onClose,
  onAddToCart,
}: QuickViewModalProps) {
  // Local quantity counter state
  const [quantity, setQuantity] = useState<number>(1);
  // Feedback state when item added
  const [added, setAdded] = useState<boolean>(false);

  // If no product selected, do not render
  if (!product) return null;

  // Handle adding to cart
  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal dialog */}
      <div className="relative w-full max-w-2xl rounded-2xl border border-perf-border bg-perf-surface p-6 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl border border-perf-border bg-perf-subtle/50 text-perf-muted hover:text-perf-text transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Left: Product image placeholder container with strict aspect ratio to guarantee zero CLS */}
          <div className="aspect-square rounded-xl bg-perf-subtle border border-perf-border flex flex-col items-center justify-center p-6 text-center">
            <span className="text-4xl mb-2">⚡</span>
            <span className="text-xs font-mono font-bold text-perf-muted uppercase tracking-wider">
              {product.category}
            </span>
            <span className="text-[11px] text-perf-muted/60 mt-1">
              Optimized AVIF/WebP Asset
            </span>
          </div>

          {/* Right: Product information */}
          <div className="space-y-4">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-perf-subtle text-perf-muted border border-perf-border">
                  {product.category}
                </span>
                {product.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-perf-text leading-snug">
                {product.name}
              </h3>

              {/* Ratings */}
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-perf-muted">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="ml-1 font-bold text-perf-text">{product.rating}</span>
                </div>
                <span>•</span>
                <span>{product.reviewCount} verified reviews</span>
              </div>
            </div>

            {/* Price & Stock */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-emerald-500">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                In Stock ({product.stockCount} units ready to ship)
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-perf-muted leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <ul className="space-y-1.5 text-xs text-perf-text">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {/* Quantity Selector & Add Button */}
            <div className="pt-3 border-t border-perf-border flex items-center gap-3">
              <div className="flex items-center rounded-lg border border-perf-border bg-perf-subtle p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-perf-muted hover:text-perf-text"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center text-xs font-bold text-perf-text">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-perf-muted hover:text-perf-text"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {added ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {quantity} to Cart • {formatCurrency(product.price * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-perf-muted border-t border-perf-border/60">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-emerald-500" /> Express Delivery
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-emerald-500" /> 2-Yr Warranty
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3 h-3 text-emerald-500" /> 30-Day Returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
