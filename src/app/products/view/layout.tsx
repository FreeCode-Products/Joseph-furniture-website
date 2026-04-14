import type { Metadata } from "next";
import { generateMetadata, generateBreadcrumbSchema, SEO_CONSTANTS } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Product Details",
  description:
    "View detailed information about our handcrafted wooden furniture products. High-quality materials and premium craftsmanship.",
  url: `${SEO_CONSTANTS.SITE_URL}/products/view`,
  type: "product",
  keywords: [
    "product details",
    "furniture specifications",
    "wooden furniture",
    "handcrafted pieces",
  ],
});

export default function ProductViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SEO_CONSTANTS.SITE_URL },
    { name: "Products", url: `${SEO_CONSTANTS.SITE_URL}/products` },
    { name: "Product Details", url: `${SEO_CONSTANTS.SITE_URL}/products/view` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {children}
    </>
  );
}
