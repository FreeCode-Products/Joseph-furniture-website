import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

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
  title: "Nörd — Scandinavian Furniture Showroom",
  description:
    "Curated Scandinavian furniture for modern living. Timeless designs crafted with sustainable materials and artisan quality.",
  keywords: ["furniture", "scandinavian", "design", "modern", "sustainable"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, playfair.variable)} suppressHydrationWarning>
      <body className="antialiased bg-cream text-charcoal font-sans" suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
