import { Metadata } from "next";

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  keywords?: string[];
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

const SITE_NAME = "Elshaddai Furnitures";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elshaddaifurnitures.com";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const DEFAULT_KEYWORDS = [
  "furniture",
  "wooden furniture",
  "teak wood",
  "sofas",
  "dining tables",
  "wooden cots",
  "handcrafted furniture",
  "premium furniture",
  "home decor",
];

export function generateMetadata(props: SEOProps): Metadata {
  const {
    title,
    description,
    image = DEFAULT_IMAGE,
    url = SITE_URL,
    type = "website",
    keywords = DEFAULT_KEYWORDS,
  } = props;

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: "Elshaddai Furnitures" }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@elshaddaifurnitures",
    },
    canonical: url,
    alternates: {
      canonical: url,
    },
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  url: string;
  material?: string;
  dimensions?: string;
}) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    category: product.category,
    url: product.url,
    offers: {
      "@type": "Offer",
      url: product.url,
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    additionalProperty: [
      ...(product.material
        ? [
            {
              "@type": "PropertyValue",
              name: "Material",
              value: product.material,
            },
          ]
        : []),
      ...(product.dimensions
        ? [
            {
              "@type": "PropertyValue",
              name: "Dimensions",
              value: product.dimensions,
            },
          ]
        : []),
    ],
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "Manufacturers in premium teak/country wood wooden cots, sofas, dining tables, teapoy, and other handcrafted furniture.",
    sameAs: [
      "https://www.facebook.com/elshaddaifurnitures",
      "https://www.instagram.com/elshaddaifurnitures",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguageID: "en-IN",
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const SEO_CONSTANTS = {
  SITE_NAME,
  SITE_URL,
  DEFAULT_IMAGE,
  DEFAULT_KEYWORDS,
};
