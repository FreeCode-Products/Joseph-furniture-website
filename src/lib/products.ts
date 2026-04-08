export interface Product {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  description: string;
  dimensions: string;
  material: string;
  colors: string[];
  imagePath: string;
  featured: boolean;
}

export const categories = [
  {
    name: "Wooden Cots",
    slug: "wooden-cots",
    image: "/images/categories/bedroom.jpg",
    description: "Premium teak and country wood cots",
  },
  {
    name: "Sofas",
    slug: "sofas",
    image: "/images/categories/living-room.jpg",
    description: "Comfortable and durable sofas",
  },
  {
    name: "Dining Tables",
    slug: "dining-tables",
    image: "/images/categories/kitchen.jpg",
    description: "Elegant dining sets",
  },
  {
    name: "Teapoys",
    slug: "teapoys",
    image: "/images/categories/office.jpg",
    description: "Classic wooden teapoys",
  },
  {
    name: "Other Furniture Crafted by Us",
    slug: "other-furniture",
    image: "/images/categories/outdoor.jpg",
    description: "Custom-crafted furniture made by our team",
  },
];

export const products: Product[] = [
  {
    slug: "aurora-bed-frame",
    name: "Aurora Bed Frame",
    category: "Wooden Cots",
    categorySlug: "wooden-cots",
    price: 64999,
    description:
      "A premium solid-wood bed frame with clean lines and a durable headboard for modern bedrooms.",
    dimensions: '78" L x 62" W x 42" H',
    material: "Solid teak wood",
    colors: ["Natural Teak", "Walnut Brown", "Dark Oak"],
    imagePath: "/images/products/aurora-bed-frame.jpg",
    featured: true,
  },
  {
    slug: "nordic-sofa",
    name: "Nordic Sofa",
    category: "Sofas",
    categorySlug: "sofas",
    price: 45999,
    description:
      "A minimalist 3-seater sofa with deep cushioning and supportive comfort for daily family use.",
    dimensions: '84" L x 35" W x 32" H',
    material: "Kiln-dried wood frame, fabric upholstery",
    colors: ["Sand Beige", "Slate Grey", "Olive"],
    imagePath: "/images/products/nordic-sofa.jpg",
    featured: true,
  },
  {
    slug: "bergen-lounge-chair",
    name: "Two-Seater Wooden Sofa",
    category: "Sofas",
    categorySlug: "sofas",
    price: 19999,
    description:
      "A handcrafted two-seater wooden sofa with supportive seating and durable upholstery.",
    dimensions: '30" L x 31" W x 34" H',
    material: "Beech wood and premium fabric",
    colors: ["Ivory", "Charcoal", "Caramel"],
    imagePath: "/images/products/two-seater-wooden-sofa.jpg",
    featured: false,
  },
  {
    slug: "fjord-dining-table",
    name: "Fjord Dining Table",
    category: "Dining Tables",
    categorySlug: "dining-tables",
    price: 38999,
    description:
      "A six-seater solid-wood dining table with a timeless profile for everyday meals and gatherings.",
    dimensions: '72" L x 36" W x 30" H',
    material: "Engineered hardwood and veneer",
    colors: ["Honey Oak", "Dark Walnut"],
    imagePath: "/images/products/fjord-dining-table.jpg",
    featured: true,
  },
  {
    slug: "mika-dining-chair",
    name: "Cushioned Wooden Sofa",
    category: "Sofas",
    categorySlug: "sofas",
    price: 7999,
    description:
      "A compact wooden sofa with soft cushions, built for everyday comfort and long-term use.",
    dimensions: '18" L x 20" W x 34" H',
    material: "Rubber wood and fabric",
    colors: ["Taupe", "Forest Green", "Ash Grey"],
    imagePath: "/images/products/cushioned-wooden-sofa.jpg",
    featured: false,
  },
  {
    slug: "garden-dining-set",
    name: "Teak Wooden Cot",
    category: "Wooden Cots",
    categorySlug: "wooden-cots",
    price: 52999,
    description:
      "A sturdy teak wooden cot with clean construction and a spacious sleeping area.",
    dimensions: 'Table 60" x 35", Chairs 18" x 22"',
    material: "Powder-coated steel and treated wood",
    colors: ["Natural", "Graphite"],
    imagePath: "/images/products/teak-wooden-cot.jpg",
    featured: false,
  },
  {
    slug: "oslo-coffee-table",
    name: "Wooden Mirror Cabinet",
    category: "Other Furniture Crafted by Us",
    categorySlug: "other-furniture",
    price: 12999,
    description:
      "A polished wooden mirror cabinet crafted for utility and classic home interiors.",
    dimensions: '42" L x 22" W x 17" H',
    material: "Engineered wood",
    colors: ["Walnut", "Natural Oak"],
    imagePath: "/images/products/wooden-mirror-cabinet.jpg",
    featured: true,
  },
  {
    slug: "studio-desk",
    name: "Square Wooden Teapoy",
    category: "Teapoys",
    categorySlug: "teapoys",
    price: 14999,
    description:
      "A minimalist square wooden teapoy with a sturdy top and clean handcrafted finish.",
    dimensions: '48" L x 24" W x 30" H',
    material: "Engineered wood and metal",
    colors: ["Oak", "Walnut", "Matte Black"],
    imagePath: "/images/products/square-wooden-teapoy.jpg",
    featured: false,
  },
  {
    slug: "tower-bookshelf",
    name: "Carved Wooden Cot Frame",
    category: "Wooden Cots",
    categorySlug: "wooden-cots",
    price: 16999,
    description:
      "A detailed carved wooden cot frame showcasing traditional craftsmanship and durability.",
    dimensions: '30" L x 12" W x 72" H',
    material: "Engineered wood",
    colors: ["Natural", "Espresso"],
    imagePath: "/images/products/carved-wooden-cot-frame.jpg",
    featured: false,
  },
  {
    slug: "pantry-sideboard",
    name: "Single Wooden Cot",
    category: "Wooden Cots",
    categorySlug: "wooden-cots",
    price: 23999,
    description:
      "A single-size wooden cot with a neat profile, designed for compact and elegant bedrooms.",
    dimensions: '58" L x 18" W x 34" H',
    material: "Solid wood frame and veneer",
    colors: ["Walnut Brown", "Natural Teak"],
    imagePath: "/images/products/single-wooden-cot.jpg",
    featured: false,
  },
  {
    slug: "ergo-task-chair",
    name: "Compact Wooden Sofa",
    category: "Sofas",
    categorySlug: "sofas",
    price: 9999,
    description:
      "A compact wooden sofa with plush seating, suitable for living rooms and lounge corners.",
    dimensions: '26" L x 26" W x 43" H',
    material: "Mesh, foam, and metal base",
    colors: ["Black", "Grey"],
    imagePath: "/images/products/compact-wooden-sofa.jpg",
    featured: false,
  },
  {
    slug: "terrace-lounge-set",
    name: "Wooden Bench Sofa",
    category: "Sofas",
    categorySlug: "sofas",
    price: 47999,
    description:
      "A handcrafted wooden bench sofa with broad seating and a robust frame for daily use.",
    dimensions: 'Sofa 72" L, Chairs 30" L each',
    material: "Weatherproof wicker and metal",
    colors: ["Beige", "Graphite", "Olive"],
    imagePath: "/images/products/wooden-bench-sofa.jpg",
    featured: false,
  },
  {
    slug: "hammock-chair",
    name: "Wooden Daybed Sofa",
    category: "Other Furniture Crafted by Us",
    categorySlug: "other-furniture",
    price: 8999,
    description:
      "A versatile wooden daybed sofa with comfortable cushion seating and premium finish.",
    dimensions: '38" L x 34" W x 48" H',
    material: "Cotton rope and metal frame",
    colors: ["Ivory", "Beige", "Terracotta"],
    imagePath: "/images/products/wooden-daybed-sofa.jpg",
    featured: false,
  },
  {
    slug: "luna-nightstand",
    name: "Classic Teak Wooden Cot",
    category: "Other Furniture Crafted by Us",
    categorySlug: "other-furniture",
    price: 6999,
    description:
      "A classic teak wooden cot with a timeless frame designed for comfort and durability.",
    dimensions: '18" L x 16" W x 22" H',
    material: "Engineered wood",
    colors: ["Natural", "Walnut", "White Ash"],
    imagePath: "/images/products/classic-teak-wooden-cot.jpg",
    featured: false,
  },
  {
    slug: "drift-dresser",
    name: "Premium Panel Wooden Cot",
    category: "Other Furniture Crafted by Us",
    categorySlug: "other-furniture",
    price: 21999,
    description:
      "A premium wooden cot with paneled headboard and footboard for a refined bedroom look.",
    dimensions: '48" L x 18" W x 34" H',
    material: "Engineered wood with veneer",
    colors: ["Oak", "Walnut"],
    imagePath: "/images/products/premium-panel-wooden-cot.jpg",
    featured: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
