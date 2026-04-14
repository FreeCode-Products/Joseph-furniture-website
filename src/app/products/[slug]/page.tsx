import { notFound } from "next/navigation";
import ProductDetailPageClient from "@/components/pages/product-detail-page-client";
import { getProductBySlug, products } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPageClient slug={params.slug} />;
}

