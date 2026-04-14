import { useEffect } from "react";
import { generateProductSchema, SEO_CONSTANTS } from "@/lib/seo";

interface Product {
  name: string;
  description: string;
  imagePath: string;
  price: number;
  category: string;
  material?: string;
  dimensions?: string;
  slug: string;
}

/**
 * Hook to dynamically inject JSON-LD structured data for a product
 * Call this in a client component to add product schema to the page
 */
export function useProductSchema(product: Product | null | undefined) {
  useEffect(() => {
    if (!product) return;

    const schema = generateProductSchema({
      name: product.name,
      description: product.description,
      image: `${SEO_CONSTANTS.SITE_URL}${product.imagePath}`,
      price: product.price,
      category: product.category,
      url: `${SEO_CONSTANTS.SITE_URL}/products/view?slug=${product.slug}`,
      material: product.material,
      dimensions: product.dimensions,
    });

    // Create and inject script tag
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, [product]);
}

/**
 * Hook to dynamically update page title and meta tags
 * Useful for client-side rendered pages where metadata can't be set statically
 */
export function usePageMeta(title: string, description: string, ogImage?: string) {
  useEffect(() => {
    // Update title
    document.title = title.includes("Elshaddai Furnitures")
      ? title
      : `${title} | Elshaddai Furnitures`;

    // Update meta description
    const descriptionMeta = document.querySelector("meta[name='description']");
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", description);
    }

    // Update OG tags
    if (ogImage) {
      const ogImage1 = document.querySelector("meta[property='og:image']");
      if (ogImage1) {
        ogImage1.setAttribute("content", ogImage);
      }

      const twitterImage = document.querySelector("meta[name='twitter:image']");
      if (twitterImage) {
        twitterImage.setAttribute("content", ogImage);
      }
    }

    // Update canonical URL
    const canonicalLink = document.querySelector("link[rel='canonical']");
    if (canonicalLink) {
      canonicalLink.setAttribute("href", window.location.href);
    }
  }, [title, description, ogImage]);
}
