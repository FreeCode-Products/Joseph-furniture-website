"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { products, categories } from "@/lib/products";
import { Badge } from "@/components/ui/badge";

const WHATSAPP_NUMBER = "468123456789";

const cardColors = [
  "bg-gradient-to-br from-sand/30 to-bone",
  "bg-gradient-to-br from-sage/20 to-sand/10",
  "bg-gradient-to-br from-bone to-sand/20",
  "bg-gradient-to-br from-walnut/10 to-cream",
  "bg-gradient-to-br from-sage/30 to-bone",
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      return selectedCategory === "all" || p.categorySlug === selectedCategory;
    });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-cream pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-walnut/70 mb-2">
            Our Collection
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-charcoal">
            All Products
          </h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar filters */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-64 flex-shrink-0"
          >
            {/* Mobile filter toggle */}
            <div className="flex flex-wrap gap-2 lg:hidden mb-6">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-walnut text-white"
                    : "bg-sand/30 text-charcoal/60 hover:bg-sand/50"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    selectedCategory === cat.slug
                      ? "bg-walnut text-white"
                      : "bg-sand/30 text-charcoal/60 hover:bg-sand/50"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Desktop sidebar */}
            <div className="hidden lg:block space-y-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal mb-4">
                Category
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`block text-sm transition-colors ${
                    selectedCategory === "all"
                      ? "text-walnut font-medium"
                      : "text-charcoal/50 hover:text-charcoal"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`block text-sm transition-colors ${
                      selectedCategory === cat.slug
                        ? "text-walnut font-medium"
                        : "text-charcoal/50 hover:text-charcoal"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            </div>
          </motion.aside>

          {/* Product grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-charcoal/50">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            <motion.div
                key={selectedCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link
                      href={`/products/${product.slug}`}
                      className="group block"
                    >
                      <div
                        className={`${
                          cardColors[i % cardColors.length]
                        } rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]`}
                      >
                        <div className="relative h-56">
                          <Image
                            src={product.imagePath}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority={i < 3}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 to-transparent" />
                          {product.featured && (
                            <Badge className="absolute top-4 left-4 bg-walnut text-white hover:bg-walnut">
                              Featured
                            </Badge>
                          )}
                        </div>

                        {/* Info */}
                        <div className="p-5">
                          <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-1">
                            {product.category}
                          </p>
                          <h3 className="text-lg font-heading font-bold text-charcoal mb-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <a
                              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'm interested in ${product.name} (${product.category}). Could you please share the pricing details?`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
                            >
                              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                              </svg>
                              Contact Us
                            </a>
                            <span className="text-xs text-charcoal/40 group-hover:text-walnut transition-colors flex items-center gap-1">
                              View
                              <svg
                                className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-lg text-charcoal/40">
                  No products match your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                  }}
                  className="mt-4 text-walnut font-medium hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
