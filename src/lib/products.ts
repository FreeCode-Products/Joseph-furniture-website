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
  { name: "Living Room", slug: "living-room", image: "/images/categories/living-room.jpg", description: "Sofas, coffee tables & lounge chairs" },
  { name: "Bedroom", slug: "bedroom", image: "/images/categories/bedroom.jpg", description: "Beds, nightstands & dressers" },
  { name: "Kitchen", slug: "kitchen", image: "/images/categories/kitchen.jpg", description: "Dining tables, chairs & storage" },
  { name: "Office", slug: "office", image: "/images/categories/office.jpg", description: "Desks, office chairs & shelving" },
  { name: "Outdoor", slug: "outdoor", image: "/images/categories/outdoor.jpg", description: "Patio furniture & garden sets" },
];

export const products: Product[] = [
  // Living Room
  {
    slug: "nordic-sofa",
    name: "Nordic Sofa",
    category: "Living Room",
    categorySlug: "living-room",
    price: 2499,
    description: "A timeless three-seater sofa with clean Scandinavian lines, upholstered in premium bouclé fabric. Deep cushions provide exceptional comfort while maintaining a sleek silhouette.",
    dimensions: "220 × 90 × 78 cm",
    material: "Oak frame, bouclé fabric",
    colors: ["Ivory", "Sage", "Charcoal"],
    imagePath: "/images/products/nordic-sofa.jpg",
    featured: true,
  },
  {
    slug: "oslo-coffee-table",
    name: "Oslo Coffee Table",
    category: "Living Room",
    categorySlug: "living-room",
    price: 899,
    description: "Minimalist coffee table crafted from solid oak with rounded edges and tapered legs. The natural wood grain adds warmth to any living space.",
    dimensions: "120 × 60 × 42 cm",
    material: "Solid oak",
    colors: ["Natural Oak", "Walnut"],
    imagePath: "/images/products/oslo-coffee-table.jpg",
    featured: true,
  },
  {
    slug: "bergen-lounge-chair",
    name: "Bergen Lounge Chair",
    category: "Living Room",
    categorySlug: "living-room",
    price: 1299,
    description: "Sculptural lounge chair with a curved backrest and wide armrests. Combines Scandinavian design heritage with modern comfort.",
    dimensions: "78 × 82 × 76 cm",
    material: "Beech wood, wool blend",
    colors: ["Cream", "Terracotta", "Forest Green"],
    imagePath: "/images/products/bergen-lounge-chair.jpg",
    featured: true,
  },
  // Bedroom
  {
    slug: "aurora-bed-frame",
    name: "Aurora Bed Frame",
    category: "Bedroom",
    categorySlug: "bedroom",
    price: 1899,
    description: "Platform bed frame with an upholstered headboard and floating base design. Creates a serene sleep environment with its understated elegance.",
    dimensions: "210 × 170 × 95 cm",
    material: "Pine frame, linen upholstery",
    colors: ["Natural Linen", "Slate Grey"],
    imagePath: "/images/products/aurora-bed-frame.jpg",
    featured: false,
  },
  {
    slug: "luna-nightstand",
    name: "Luna Nightstand",
    category: "Bedroom",
    categorySlug: "bedroom",
    price: 449,
    description: "Compact nightstand with a single drawer and open shelf. Solid wood construction with soft-close mechanism.",
    dimensions: "45 × 38 × 52 cm",
    material: "Solid ash wood",
    colors: ["White Ash", "Smoked Oak"],
    imagePath: "/images/products/luna-nightstand.jpg",
    featured: false,
  },
  {
    slug: "drift-dresser",
    name: "Drift Dresser",
    category: "Bedroom",
    categorySlug: "bedroom",
    price: 1599,
    description: "Six-drawer dresser with beveled edges and integrated handles. Each drawer features dove-tail joinery for lasting durability.",
    dimensions: "140 × 45 × 80 cm",
    material: "Solid oak, brass accents",
    colors: ["Natural Oak", "White Wash"],
    imagePath: "/images/products/drift-dresser.jpg",
    featured: true,
  },
  // Kitchen
  {
    slug: "fjord-dining-table",
    name: "Fjord Dining Table",
    category: "Kitchen",
    categorySlug: "kitchen",
    price: 1799,
    description: "Extendable dining table seating 6–8 with a beautiful slab top and angled trestle legs. Perfect for family gatherings.",
    dimensions: "180 × 90 × 75 cm (extends to 240 cm)",
    material: "Solid walnut",
    colors: ["Walnut", "Natural Oak"],
    imagePath: "/images/products/fjord-dining-table.jpg",
    featured: true,
  },
  {
    slug: "mika-dining-chair",
    name: "Mika Dining Chair",
    category: "Kitchen",
    categorySlug: "kitchen",
    price: 399,
    description: "Stackable dining chair with a molded seat and splayed wooden legs. Ergonomic curves for comfortable dining.",
    dimensions: "48 × 52 × 80 cm",
    material: "Molded plywood, beech legs",
    colors: ["White", "Black", "Sage"],
    imagePath: "/images/products/mika-dining-chair.jpg",
    featured: false,
  },
  {
    slug: "pantry-sideboard",
    name: "Pantry Sideboard",
    category: "Kitchen",
    categorySlug: "kitchen",
    price: 1299,
    description: "Versatile sideboard with sliding doors and adjustable shelving. Ideal for kitchenware storage with a refined aesthetic.",
    dimensions: "160 × 42 × 85 cm",
    material: "Oak veneer, MDF core",
    colors: ["White Oak", "Charcoal"],
    imagePath: "/images/products/pantry-sideboard.jpg",
    featured: false,
  },
  // Office
  {
    slug: "studio-desk",
    name: "Studio Desk",
    category: "Office",
    categorySlug: "office",
    price: 999,
    description: "Writing desk with an integrated cable management tray and a single pencil drawer. Clean lines keep your workspace organized.",
    dimensions: "140 × 65 × 75 cm",
    material: "Solid birch, powder-coated steel",
    colors: ["Natural/White", "Walnut/Black"],
    imagePath: "/images/products/studio-desk.jpg",
    featured: true,
  },
  {
    slug: "ergo-task-chair",
    name: "Ergo Task Chair",
    category: "Office",
    categorySlug: "office",
    price: 849,
    description: "Adjustable ergonomic chair with lumbar support and breathable mesh back. Designed for all-day comfort.",
    dimensions: "65 × 65 × 100–115 cm",
    material: "Mesh, aluminum base",
    colors: ["Light Grey", "Black"],
    imagePath: "/images/products/ergo-task-chair.jpg",
    featured: false,
  },
  {
    slug: "tower-bookshelf",
    name: "Tower Bookshelf",
    category: "Office",
    categorySlug: "office",
    price: 699,
    description: "Tall, narrow bookshelf with five open shelves and a ladder-style silhouette. Makes a striking statement in any room.",
    dimensions: "60 × 35 × 190 cm",
    material: "Solid pine, steel frame",
    colors: ["Natural/Black", "White/Brass"],
    imagePath: "/images/products/tower-bookshelf.jpg",
    featured: false,
  },
  // Outdoor
  {
    slug: "terrace-lounge-set",
    name: "Terrace Lounge Set",
    category: "Outdoor",
    categorySlug: "outdoor",
    price: 2999,
    description: "Four-piece outdoor lounge set with weather-resistant teak frames and removable cushions. Built to withstand the elements in style.",
    dimensions: "Various (sofa, 2 chairs, table)",
    material: "Teak, Sunbrella fabric",
    colors: ["Natural/White", "Natural/Grey"],
    imagePath: "/images/products/terrace-lounge-set.jpg",
    featured: true,
  },
  {
    slug: "garden-dining-set",
    name: "Garden Dining Set",
    category: "Outdoor",
    categorySlug: "outdoor",
    price: 1999,
    description: "Round dining table with four matching chairs in powder-coated aluminum. Lightweight yet sturdy for outdoor entertaining.",
    dimensions: "Ø 120 × 75 cm (table)",
    material: "Powder-coated aluminum",
    colors: ["Matte White", "Matte Black"],
    imagePath: "/images/products/garden-dining-set.jpg",
    featured: false,
  },
  {
    slug: "hammock-chair",
    name: "Hammock Chair",
    category: "Outdoor",
    categorySlug: "outdoor",
    price: 349,
    description: "Hanging egg chair with a woven rattan shell and plush cushion. The ultimate relaxation spot for your patio or garden.",
    dimensions: "95 × 95 × 120 cm",
    material: "Synthetic rattan, steel frame",
    colors: ["Natural", "Grey"],
    imagePath: "/images/products/hammock-chair.jpg",
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
