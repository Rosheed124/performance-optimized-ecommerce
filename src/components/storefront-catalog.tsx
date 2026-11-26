"use client";

// Import React hooks
import React, { useState } from "react";
// Import Lucide icons
import {
  Search,
  Star,
  ShoppingBag,
  Eye,
  SlidersHorizontal,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
// Import types
import { Product, ProductCategory } from "@/lib/types";
// Import utils
import { formatCurrency } from "@/lib/utils";

// Component props interface
interface StorefrontCatalogProps {
  // All products
  products: Product[];
  // Handler when item is added to cart
  onAddToCart: (product: Product, quantity?: number) => void;
  // Handler when product is selected for quick view
  onSelectQuickView: (product: Product) => void;
}

// Storefront product catalog grid component
export function StorefrontCatalog({
  products,
  onAddToCart,
  onSelectQuickView,
}: StorefrontCatalogProps) {
  // Active category filter state
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");
  // Search query text state
  const [searchQuery, setSearchQuery] = useState<string>("");
  // Sort order state
  const [sortOrder, setSortOrder] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  // Feedback state tracking which item was just added
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Filter products by category and search keyword
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const lowerQuery = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery);
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "price-asc") return a.price - b.price;
      if (sortOrder === "price-desc") return b.price - a.price;
      if (sortOrder === "rating") return b.rating - a.rating;
      return 0; // Featured default order
    });

  // Handle adding product directly to cart
  const handleAdd = (product: Product) => {
    onAddToCart(product, 1);
    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Search, Filter & Sort Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 rounded-2xl border border-perf-border bg-perf-surface shadow-sm">
        {/* Category filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {(["All", "Wearables", "Audio", "Smart Home", "Computing", "Optics"] as const).map(
            (category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? "bg-perf-text text-perf-canvas shadow-sm"
                    : "bg-perf-subtle text-perf-muted hover:text-perf-text hover:bg-perf-border/50"
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Search input & Sort dropdown */}
        <div className="flex items-center gap-3">
          {/* Live Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-perf-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gear..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-perf-border bg-perf-subtle text-perf-text placeholder:text-perf-muted/60 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-1.5 text-xs text-perf-muted">
            <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
              className="bg-perf-subtle border border-perf-border rounded-lg px-2.5 py-1.5 text-xs text-perf-text focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="featured">Featured Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Empty Search State */}
      {filteredProducts.length === 0 && (
        <div className="p-12 rounded-2xl border border-dashed border-perf-border text-center bg-perf-subtle/30 space-y-2">
          <p className="text-sm font-bold text-perf-text">No products match your criteria</p>
          <p className="text-xs text-perf-muted">
            Try clearing the search text or choosing &quot;All&quot; categories.
          </p>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => {
          const isJustAdded = recentlyAddedId === product.id;

          return (
            <div
              key={product.id}
              className="group rounded-2xl border border-perf-border bg-perf-surface p-4 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all"
            >
              <div>
                {/* Image container with strict aspect-ratio to guarantee zero layout shift (CLS: 0.002) */}
                <div className="relative aspect-square rounded-xl bg-perf-subtle border border-perf-border/60 overflow-hidden flex flex-col items-center justify-center p-4 text-center group-hover:scale-[1.02] transition-transform">
                  <span className="text-5xl mb-2">⚡</span>
                  <span className="text-[11px] font-mono font-bold text-perf-muted uppercase tracking-wider">
                    {product.category}
                  </span>

                  {/* Top Badge */}
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      {product.badge}
                    </span>
                  )}

                  {/* Quick view hover action button */}
                  <button
                    onClick={() => onSelectQuickView(product)}
                    title="Quick view product specs"
                    className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-perf-surface/90 backdrop-blur-md border border-perf-border text-xs font-semibold text-perf-text opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Product Information */}
                <div className="mt-3.5 space-y-1">
                  <div className="flex items-center justify-between text-xs text-perf-muted">
                    <span className="font-semibold text-[11px] uppercase tracking-wider">
                      {product.category}
                    </span>
                    <div className="flex items-center text-amber-400 gap-1 font-bold">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{product.rating}</span>
                      <span className="text-perf-muted font-normal text-[10px]">
                        ({product.reviewCount})
                      </span>
                    </div>
                  </div>

                  <h3
                    onClick={() => onSelectQuickView(product)}
                    className="text-sm font-bold text-perf-text cursor-pointer hover:text-emerald-500 transition-colors line-clamp-1"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-perf-muted line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Bottom Price & Add to Cart button */}
              <div className="mt-4 pt-3 border-t border-perf-border/60 flex items-center justify-between">
                <div>
                  <span className="text-base font-extrabold text-emerald-500 block">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-[10px] text-perf-muted font-medium">
                    {product.inStock ? `${product.stockCount} in stock` : "Out of stock"}
                  </span>
                </div>

                <button
                  onClick={() => handleAdd(product)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isJustAdded
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-perf-subtle hover:bg-emerald-500/10 hover:text-emerald-500 text-perf-text border border-perf-border hover:border-emerald-500/30"
                  }`}
                >
                  {isJustAdded ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
