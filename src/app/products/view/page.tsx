"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductDetailPageClient from "@/components/pages/product-detail-page-client";
import { fetchProductBySlug, DbProduct } from "@/lib/products-db";

function DynamicProductView() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug") ?? "";
  const [product, setProduct] = useState<DbProduct | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) {
      setProduct(null);
      return;
    }
    let cancelled = false;
    fetchProductBySlug(slug).then((p) => {
      if (!cancelled) setProduct(p);
    });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (product === undefined) {
    return (
      <div className="min-h-screen bg-cream pt-28 flex items-center justify-center text-charcoal/60">
        Loading…
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream pt-28">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-charcoal mb-4">
            Product Not Found
          </h1>
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

  return <ProductDetailPageClient slug={slug} product={product} />;
}

export default function ProductViewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-cream pt-28" />
      }
    >
      <DynamicProductView />
    </Suspense>
  );
}
