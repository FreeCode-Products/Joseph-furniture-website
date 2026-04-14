import type { Metadata } from "next";
import { generateMetadata, generateBreadcrumbSchema, SEO_CONSTANTS } from "@/lib/seo";

export const metadata: Metadata = generateMetadata({
  title: "Our Products - Premium Furniture Collection",
  description:
    "Browse our complete collection of handcrafted wooden furniture including cots, sofas, dining tables, and teapoys. Find the perfect pieces for your home.",
  keywords: [
    "furniture products",
    "wooden cots",
    "sofas",
    "dining tables",
    "teapoys",
    "handcrafted furniture",
    "buy furniture online",
  ],
  url: `${SEO_CONSTANTS.SITE_URL}/products`,
  type: "website",
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SEO_CONSTANTS.SITE_URL },
    { name: "Products", url: `${SEO_CONSTANTS.SITE_URL}/products` },
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
