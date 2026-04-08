import type { Product } from "@/lib/products";

export const WHATSAPP_NUMBER = "919941484295";

type ProductWhatsAppPayload = Pick<
  Product,
  "slug" | "name" | "category" | "description" | "imagePath" | "dimensions" | "material"
>;

interface ProductWhatsAppOptions {
  color?: string;
  includeSpecs?: boolean;
  origin?: string;
}

function toAbsoluteUrl(path: string, origin?: string): string {
  if (/^https?:\/\//i.test(path) || !origin) return path;
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildProductWhatsAppUrl(
  product: ProductWhatsAppPayload,
  options: ProductWhatsAppOptions = {}
): string {
  const includeSpecs = options.includeSpecs ?? false;
  const imageUrl = toAbsoluteUrl(product.imagePath, options.origin);
  const productUrl = toAbsoluteUrl(`/products/${product.slug}`, options.origin);

  const lines = [
    "Hi, I'm interested in this product:",
    `Product: ${product.name}`,
    `Category: ${product.category}`,
    `Description: ${product.description}`,
    includeSpecs && product.dimensions ? `Dimensions: ${product.dimensions}` : "",
    includeSpecs && product.material ? `Material: ${product.material}` : "",
    options.color ? `Color: ${options.color}` : "",
    `Image: ${imageUrl}`,
    `Product Link: ${productUrl}`,
    "",
    "Could you please share pricing and availability?",
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
