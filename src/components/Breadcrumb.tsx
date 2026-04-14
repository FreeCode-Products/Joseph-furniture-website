"use client";

import Link from "next/link";
import { useEffect } from "react";
import { SeoSchema } from "@/components/SeoSchema";
import { generateBreadcrumbSchema } from "@/lib/seo";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  const breadcrumbSchema = generateBreadcrumbSchema(items);

  return (
    <>
      <SeoSchema schema={breadcrumbSchema} />
      <nav
        aria-label="Breadcrumb"
        className={`flex flex-wrap items-center gap-2 text-sm text-charcoal/50 ${className}`}
      >
        {items.map((item, index) => (
          <div key={item.url} className="flex items-center gap-2">
            {index > 0 && <span className="text-charcoal/30">/</span>}
            {index === items.length - 1 ? (
              <span className="text-charcoal font-medium truncate">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.url}
                className="hover:text-walnut transition-colors truncate"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
