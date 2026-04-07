"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { getProductBySlug, products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const WHATSAPP_NUMBER = "468123456789";
const ModelViewer = dynamic(() => import("@/components/model-viewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-bone rounded-2xl">
      <div className="w-12 h-12 rounded-full border-2 border-sand border-t-walnut animate-spin" />
    </div>
  ),
});

const modelTypeMap: Record<string, string> = {
  "nordic-sofa": "sofa",
  "oslo-coffee-table": "table",
  "bergen-lounge-chair": "chair",
  "fjord-dining-table": "table",
  "mika-dining-chair": "chair",
  "studio-desk": "table",
  "ergo-task-chair": "chair",
  "tower-bookshelf": "table",
  "aurora-bed-frame": "sofa",
  "luna-nightstand": "table",
  "drift-dresser": "table",
  "pantry-sideboard": "table",
  "terrace-lounge-set": "sofa",
  "garden-dining-set": "table",
  "hammock-chair": "chair",
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const [selectedColor, setSelectedColor] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream pt-28">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-charcoal mb-4">
            Product Not Found
          </h1>
          <p className="text-charcoal/50 mb-8">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-charcoal text-white px-6 py-3 rounded-full hover:bg-walnut transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, 3);

  const modelType = modelTypeMap[slug] || "chair";

  return (
    <div className="min-h-screen bg-cream pt-24 sm:pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-charcoal/50 mb-8"
        >
          <Link href="/" className="hover:text-walnut transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-walnut transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-charcoal">{product.name}</span>
        </motion.nav>

        {/* Product layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 3D Viewer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky top-28"
          >
            <div className="h-[300px] sm:h-[400px] lg:h-[550px] rounded-2xl overflow-hidden bg-bone">
              <ModelViewer
                modelType={modelType}
                autoRotate={false}
                enableControls
                environmentPreset="apartment"
                className="w-full h-full"
              />
            </div>
            <p className="text-xs text-charcoal/40 text-center mt-3">
              Click and drag to rotate • Scroll to zoom
            </p>
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-charcoal mb-2">
                {product.name}
              </h1>
            </div>

            <p className="text-lg text-charcoal/60 leading-relaxed">
              {product.description}
            </p>

            <Separator className="bg-sand/50" />

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-charcoal/40 mb-1">
                  Dimensions
                </p>
                <p className="text-sm font-medium text-charcoal">
                  {product.dimensions}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-charcoal/40 mb-1">
                  Material
                </p>
                <p className="text-sm font-medium text-charcoal">
                  {product.material}
                </p>
              </div>
            </div>

            {/* Color selection */}
            <div>
              <p className="text-xs uppercase tracking-wider text-charcoal/40 mb-3">
                Color — {product.colors[selectedColor]}
              </p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(i)}
                    className={`px-4 py-2 rounded-full text-sm border transition-all ${
                      selectedColor === i
                        ? "border-walnut bg-walnut/10 text-walnut font-medium"
                        : "border-sand/50 text-charcoal/50 hover:border-walnut/50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <Separator className="bg-sand/50" />

            {/* Contact Us on WhatsApp */}
            <div className="flex gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name} (${product.category}).\n\nDetails:\n- Dimensions: ${product.dimensions}\n- Material: ${product.material}\n- Color: ${product.colors[selectedColor]}\n\nCould you please share the pricing and availability?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  size="lg"
                  className="w-full h-14 rounded-full font-medium text-base bg-green-600 text-white hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Contact Us on WhatsApp
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                className="h-14 w-14 rounded-full border-sand/50 hover:bg-sand/20"
                aria-label="Add to wishlist"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { icon: "M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12", label: "Free Delivery" },
                { icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z", label: "10-Year Warranty" },
                { icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182", label: "Easy Returns" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-bone"
                >
                  <svg
                    className="w-5 h-5 text-walnut"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={badge.icon}
                    />
                  </svg>
                  <span className="text-xs text-charcoal/60">{badge.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-heading font-bold text-charcoal mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rp, i) => (
                <motion.div
                  key={rp.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link href={`/products/${rp.slug}`} className="group block">
                    <div className="bg-gradient-to-br from-sand/30 to-bone rounded-2xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                      <div className="relative h-48">
                        <Image
                          src={rp.imagePath}
                          alt={rp.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/15 to-transparent" />
                      </div>
                      <div className="p-5">
                        <p className="text-xs text-charcoal/40 uppercase tracking-wider mb-1">
                          {rp.category}
                        </p>
                        <h3 className="text-lg font-heading font-bold text-charcoal mb-1">
                          {rp.name}
                        </h3>
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I'm interested in ${rp.name} (${rp.category}). Could you please share the pricing details?`)}`}
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
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
