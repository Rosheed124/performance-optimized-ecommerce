"use client";

// Import React hooks
import React, { useState } from "react";
// Import Lucide icons
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";
// Import types
import { CartItem } from "@/lib/types";
// Import utils
import { formatCurrency } from "@/lib/utils";

// Component props interface
interface CartDrawerProps {
  // Whether drawer is currently open
  isOpen: boolean;
  // Handler to close drawer
  onClose: () => void;
  // Array of items in the cart
  cartItems: CartItem[];
  // Handler to update quantity of an item
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  // Handler to remove item from cart
  onRemoveItem: (productId: string) => void;
  // Handler to clear entire cart
  onClearCart: () => void;
  // Handler for successful checkout
  onCheckoutSuccess: () => void;
}

// Shopping cart slide-over drawer component
export function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess,
}: CartDrawerProps) {
  // State for promo coupon code input
  const [promoCode, setPromoCode] = useState<string>("");
  // State for applied discount percentage (e.g. 0.15 for 15% off)
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  // State for discount message
  const [promoFeedback, setPromoFeedback] = useState<{ message: string; success: boolean } | null>(null);
  // State for simulated checkout progress
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);

  // If drawer is closed, do not render into DOM
  if (!isOpen) return null;

  // Calculate cart subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Free shipping threshold ($250 USD)
  const freeShippingThreshold = 250;
  // Shipping cost (Free if subtotal >= 250, otherwise $12)
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 12;
  // Discount amount in dollars
  const discountAmount = subtotal * discountPercent;
  // Final order total
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  // Free shipping progress percentage (0 - 100)
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  // Handle applying a discount promo code
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();

    if (cleanCode === "PERF100") {
      setDiscountPercent(0.15); // 15% off
      setPromoFeedback({ message: "Code 'PERF100' applied: 15% discount!", success: true });
    } else if (cleanCode === "DOMINATE2027") {
      setDiscountPercent(0.20); // 20% off
      setPromoFeedback({ message: "Code 'DOMINATE2027' applied: 20% discount!", success: true });
    } else {
      setPromoFeedback({ message: "Invalid code. Try 'PERF100' or 'DOMINATE2027'.", success: false });
    }
  };

  // Handle simulated checkout
  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate payment authorization
    setTimeout(() => {
      setIsCheckingOut(false);
      onCheckoutSuccess();
      onClearCart();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-perf-surface border-l border-perf-border shadow-2xl flex flex-col justify-between">
          {/* Drawer Top Header */}
          <div className="p-5 border-b border-perf-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-500" />
              <h3 className="font-bold text-base text-perf-text">Shopping Cart</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-perf-subtle font-semibold text-perf-muted">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-perf-border hover:bg-perf-subtle text-perf-muted hover:text-perf-text transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3 bg-perf-subtle/50 border-b border-perf-border text-xs">
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span>
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-500 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> You unlocked Free Express Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong>{formatCurrency(freeShippingThreshold - subtotal)}</strong> more for Free Shipping
                  </span>
                )}
              </span>
              <span className="text-perf-muted font-bold">{shippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-perf-border overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-perf-subtle flex items-center justify-center text-perf-muted">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h4 className="font-bold text-sm text-perf-text">Your cart is empty</h4>
                <p className="text-xs text-perf-muted max-w-xs">
                  Browse our sub-second optimized storefront and add high-performance gear to your bag.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3 rounded-xl border border-perf-border bg-perf-subtle/30"
                >
                  {/* Product thumbnail with fixed aspect ratio */}
                  <div className="w-16 h-16 rounded-lg bg-perf-subtle border border-perf-border shrink-0 flex items-center justify-center font-bold text-xs text-perf-muted overflow-hidden">
                    <span className="uppercase">{item.product.category.substring(0, 3)}</span>
                  </div>

                  {/* Product details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-perf-text line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          title="Remove item"
                          className="text-perf-muted hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-emerald-500 block mt-0.5">
                        {formatCurrency(item.product.price)}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md border border-perf-border bg-perf-surface flex items-center justify-center text-perf-muted hover:text-perf-text transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-perf-text px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md border border-perf-border bg-perf-surface flex items-center justify-center text-perf-muted hover:text-perf-text transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Bottom Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-perf-border bg-perf-surface space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-perf-muted" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Coupon: PERF100 or DOMINATE2027"
                      className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-perf-border bg-perf-subtle text-perf-text placeholder:text-perf-muted/60 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg border border-perf-border bg-perf-subtle hover:bg-perf-border/50 text-xs font-semibold text-perf-text transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoFeedback && (
                  <p
                    className={`text-[11px] font-medium ${
                      promoFeedback.success ? "text-emerald-500" : "text-rose-500"
                    }`}
                  >
                    {promoFeedback.message}
                  </p>
                )}
              </form>

              {/* Order financial summary */}
              <div className="space-y-1.5 text-xs text-perf-muted pt-2 border-t border-perf-border/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-perf-text">{formatCurrency(subtotal)}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-500 font-medium">
                    <span>Discount ({(discountPercent * 100).toFixed(0)}%)</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-perf-text">
                    {shippingCost === 0 ? "FREE" : formatCurrency(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-perf-border/60 text-sm font-bold text-perf-text">
                  <span>Total</span>
                  <span className="text-emerald-500">{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout action button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Instant Order...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to 1-Click Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] text-perf-muted pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 256-bit Encrypted Checkout
                </span>
                <button
                  onClick={onClearCart}
                  className="hover:text-rose-500 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
