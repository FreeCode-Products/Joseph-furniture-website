import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { generateOrganizationSchema, SEO_CONSTANTS } from "@/lib/seo";

const inter = localFont({
  src: "./fonts/Inter.woff2",
  variable: "--font-sans",
  display: "swap",
});

const playfair = localFont({
  src: "./fonts/PlayfairDisplay.woff2",
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elshaddai Furnitures - Premium Handcrafted Wooden Furniture",
  description:
    "Manufacturers in premium teak and country wood wooden cots, sofas, dining tables, teapoys, and custom handcrafted furniture. Quality craftsmanship since excellence.",
  keywords: [
    "wooden furniture",
    "teak furniture",
    "handcrafted furniture",
    "wooden cots",
    "sofas",
    "dining tables",
    "teapoys",
    "furniture manufacturer",
    "premium furniture",
    "sustainable furniture",
  ],
  authors: [
    {
      name: "Elshaddai Furnitures",
      url: SEO_CONSTANTS.SITE_URL,
    },
  ],
  creator: "Elshaddai Furnitures",
  publisher: "Elshaddai Furnitures",
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
  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png?v=2",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SEO_CONSTANTS.SITE_URL,
    siteName: SEO_CONSTANTS.SITE_NAME,
    title: "Elshaddai Furnitures - Premium Handcrafted Wooden Furniture",
    description:
      "Manufacturers in premium teak and country wood wooden cots, sofas, dining tables, teapoys, and custom handcrafted furniture.",
    images: [
      {
        url: `${SEO_CONSTANTS.SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Elshaddai Furnitures",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@elshaddaifurnitures",
    creator: "@elshaddaifurnitures",
    title: "Elshaddai Furnitures - Premium Handcrafted Wooden Furniture",
    description:
      "Manufacturers in premium teak and country wood wooden furniture.",
    images: [
      {
        url: `${SEO_CONSTANTS.SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Elshaddai Furnitures",
      },
    ],
  },
  alternates: {
    canonical: SEO_CONSTANTS.SITE_URL,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en" className={cn(inter.variable, playfair.variable)} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f5e6d3" />
        <link rel="canonical" href={SEO_CONSTANTS.SITE_URL} />
        <link rel="alternate" hrefLang="en-IN" href={SEO_CONSTANTS.SITE_URL} />
        <link rel="manifest" href="/site.webmanifest" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="antialiased bg-cream text-charcoal font-sans" suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
