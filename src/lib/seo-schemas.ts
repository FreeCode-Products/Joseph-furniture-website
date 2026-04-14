/**
 * Additional JSON-LD Schema Generators for comprehensive SEO
 */

import { SEO_CONSTANTS } from "./seo";

export function generateCollectionSchema(
  collectionName: string,
  collectionDescription: string,
  collectionUrl: string,
  items: Array<{ name: string; image: string; price: number }>
) {
  return {
    "@context": "https://schema.org/",
    "@type": "CollectionPage",
    name: collectionName,
    description: collectionDescription,
    url: collectionUrl,
    mainEntity: {
      "@type": "ItemList",
      name: collectionName,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: item.name,
          image: item.image,
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: item.price,
          },
        },
      })),
    },
  };
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SEO_CONSTANTS.SITE_NAME,
    image: `${SEO_CONSTANTS.SITE_URL}/logo.png`,
    description:
      "Manufacturers of premium handcrafted wooden furniture with high-quality teak and country wood pieces.",
    url: SEO_CONSTANTS.SITE_URL,
    telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || "+91-XXXXXXXXXX",
    email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "contact@elshaddaifurnitures.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: process.env.NEXT_PUBLIC_BUSINESS_CITY || "India",
      addressRegion: process.env.NEXT_PUBLIC_BUSINESS_STATE || "India",
      postalCode: process.env.NEXT_PUBLIC_BUSINESS_ZIP || "",
      streetAddress: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "",
    },
    sameAs: [
      "https://www.facebook.com/elshaddaifurnitures",
      "https://www.instagram.com/elshaddaifurnitures",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };
}

export function generateArticleSchema(article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      "@type": "Organization",
      name: article.author || SEO_CONSTANTS.SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SEO_CONSTANTS.SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SEO_CONSTANTS.SITE_URL}/logo.png`,
      },
    },
    url: article.url,
  };
}

export const COMMON_FAQS = [
  {
    question: "What materials do you use for your furniture?",
    answer:
      "We use premium teak wood and country wood for our furniture pieces. All materials are carefully selected for durability and aesthetic appeal.",
  },
  {
    question: "Do you provide custom furniture design?",
    answer:
      "Yes, we offer custom-crafted furniture tailored to your specific requirements and preferences. Contact us for custom design inquiries.",
  },
  {
    question: "What is the delivery timeline?",
    answer:
      "Delivery timelines depend on the product and your location. Please contact us via WhatsApp for specific delivery information.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Please contact us to inquire about international shipping options for your desired products.",
  },
  {
    question: "How do I care for my wooden furniture?",
    answer:
      "Regular dusting with a soft cloth and occasional polish maintenance will keep your furniture looking beautiful. Avoid prolonged exposure to direct sunlight and moisture.",
  },
];
